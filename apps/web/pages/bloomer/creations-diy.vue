<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed, watch, nextTick } from "vue";
import BloomerHeader from "~/components/BloomerHeader.vue";

const config = useRuntimeConfig();
const api = config.public.apiBase;

type DiyCreation = {
  id: string;
  title: string;
  coverUrl?: string | null;
  images?: any; // string JSON ou array
  sourceUrl?: string | null;
  creator?: string | null;
  craft?: string | null;
  tags?: string | null;
  note?: string | null;
};

const { data: creations, pending, error } = await useFetch<DiyCreation[]>(
  `${api}/diy-creations`
);

// Helpers
const splitTags = (tags?: string | null) =>
  (tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 8);

const prettyCraft = (c?: string | null) => {
  if (!c) return null;
  const map: Record<string, string> = {
    "custom pokemon": "Custom Pokémon",
    embroidery: "Broderie",
    painting: "Peinture",
    sculpture: "Sculpture",
    upcycling: "Upcycling",
  };
  return map[c] ?? c;
};

// Click zoom (foreground)
const selected = ref<DiyCreation | null>(null);
const open = (item: DiyCreation) => (selected.value = item);
const close = () => (selected.value = null);

const hasCreations = computed(() => (creations.value || []).length > 0);

// ✅ Normalisation des images (array OU string JSON)
const normalizeImages = (raw: any): string[] => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter(Boolean);
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch {
      return [];
    }
  }
  return [];
};

const selectedImages = computed<string[]>(() => normalizeImages(selected.value?.images));

// ✅ fallback extension (jpg <-> png) si 404
const swapExt = (url: string) => {
  if (url.endsWith(".jpg")) return url.replace(/\.jpg$/i, ".png");
  if (url.endsWith(".jpeg")) return url.replace(/\.jpeg$/i, ".png");
  if (url.endsWith(".png")) return url.replace(/\.png$/i, ".jpg");
  return url;
};

const onImgError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  if (!img || !img.src) return;

  if (img.dataset.fallbackTried === "1") return;
  img.dataset.fallbackTried = "1";

  const current = new URL(img.src).pathname;
  img.src = swapExt(current);
};

// ✅ Slider index
const stepIndex = ref(0);

watch(
  () => selected.value?.id,
  () => {
    stepIndex.value = 0;
  }
);

const hasSteps = computed(() => selectedImages.value.length > 0);
const stepCount = computed(() => selectedImages.value.length);

const currentStepSrc = computed(() => {
  const imgs = selectedImages.value;
  if (!imgs.length) return "";
  const i = Math.min(Math.max(stepIndex.value, 0), imgs.length - 1);
  return imgs[i];
});

const prevStepSrc = computed(() => {
  const imgs = selectedImages.value;
  if (!imgs.length) return "";
  return stepIndex.value > 0 ? imgs[stepIndex.value - 1] : imgs[0];
});

const nextStepSrc = computed(() => {
  const imgs = selectedImages.value;
  if (!imgs.length) return "";
  return stepIndex.value < imgs.length - 1 ? imgs[stepIndex.value + 1] : imgs[imgs.length - 1];
});

const canPrev = computed(() => stepIndex.value > 0);
const canNext = computed(() => stepIndex.value < stepCount.value - 1);

const prevStep = () => {
  if (!canPrev.value) return;
  stepIndex.value -= 1;
};

const nextStep = () => {
  if (!canNext.value) return;
  stepIndex.value += 1;
};

const onKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") close();
  if (!selected.value) return;

  if (e.key === "ArrowLeft") prevStep();
  if (e.key === "ArrowRight") nextStep();
};

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));

/* -----------------------------
   CAROUSEL LOOP (infinite)
-------------------------------- */
const railRef = ref<HTMLElement | null>(null);
const isAdjusting = ref(false);

const baseCreations = computed(() => creations.value || []);

/**
 * On duplique 3x pour simuler un loop:
 * [A B C D E] [A B C D E] [A B C D E]
 * On positionne le scroll au milieu (2e bloc).
 */
const loopCreations = computed(() => {
  const arr = baseCreations.value;
  if (!arr.length) return [];
  return [...arr, ...arr, ...arr];
});

const centerRail = async () => {
  const el = railRef.value;
  if (!el) return;
  await nextTick();

  // On se met au début du "bloc du milieu"
  const segment = el.scrollWidth / 3;
  el.scrollLeft = segment;
};

const onRailScroll = () => {
  const el = railRef.value;
  if (!el || isAdjusting.value) return;

  const segment = el.scrollWidth / 3;
  const left = el.scrollLeft;

  // Si on sort trop du bloc du milieu, on recentre sans que ça se voie
  // Zone "safe" ~ entre 0.5*segment et 1.5*segment
  if (left < segment * 0.5) {
    isAdjusting.value = true;
    el.scrollLeft = left + segment;
    requestAnimationFrame(() => (isAdjusting.value = false));
  } else if (left > segment * 1.5) {
    isAdjusting.value = true;
    el.scrollLeft = left - segment;
    requestAnimationFrame(() => (isAdjusting.value = false));
  }
};

const scrollByCards = (dir: 1 | -1) => {
  const el = railRef.value;
  if (!el) return;

  const first = el.querySelector<HTMLElement>("[data-card]");
  const cardW = first?.offsetWidth ?? 320;
  const gap = 20; // gap-5
  el.scrollBy({ left: dir * (cardW + gap), behavior: "smooth" });
};

const scrollPrev = () => scrollByCards(-1);
const scrollNext = () => scrollByCards(1);

// quand les créations arrivent (fetch), on centre le rail
watch(
  () => baseCreations.value.length,
  async (n) => {
    if (!n) return;
    await centerRail();
  },
  { immediate: true }
);

onMounted(async () => {
  await centerRail();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-amber-50 via-zinc-50 to-white text-zinc-900">
    <BloomerHeader />

    <!-- spacer header fixed -->
    <div class="h-[92px] sm:h-[104px]"></div>

    <!-- HEADER -->
    <header class="mx-auto max-w-6xl px-6 pt-10 pb-8">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div class="max-w-2xl">
          <p class="text-xs font-semibold tracking-[0.22em] text-zinc-500">CRÉATIONS · DIY</p>
          <h1 class="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
            DIY <span class="text-amber-600">creations</span>
          </h1>
          <p class="mt-4 text-zinc-700/80">
            Sélection de créations. Clique pour ouvrir la galerie (étapes).
          </p>
        </div>

        <div class="flex items-center gap-2">
          <NuxtLink
            to="/bloomer"
            class="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-white"
          >
            Retour Bloomer →
          </NuxtLink>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            class="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
          >
            Instagram →
          </a>
        </div>
      </div>
    </header>

    <!-- CONTENT -->
    <main class="mx-auto max-w-6xl px-6 pb-16">
      <div v-if="pending" class="rounded-2xl bg-white/70 p-5 text-zinc-700 ring-1 ring-black/5">
        Chargement des créations DIY…
      </div>

      <div v-else-if="error" class="rounded-2xl bg-red-500/10 p-5 text-red-800 ring-1 ring-red-500/20">
        Erreur API : {{ error.message }}
      </div>

      <div v-else>
        <div class="mb-5 flex items-center justify-between gap-4">
          <p class="text-sm text-zinc-700/70">
            {{ (baseCreations || []).length }} créations
          </p>

          <!-- petites flèches desktop en plus (optionnel) -->
          <div class="hidden sm:flex items-center gap-2">
            <button
              type="button"
              @click="scrollPrev"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-zinc-900 hover:bg-white"
              aria-label="Précédent"
            >
              ‹
            </button>
            <button
              type="button"
              @click="scrollNext"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-zinc-900 hover:bg-white"
              aria-label="Suivant"
            >
              ›
            </button>
          </div>
        </div>

        <!-- CAROUSEL -->
        <div class="relative">
          <!-- ✅ GROSSES FLÈCHES AU MILIEU (plus visibles) -->
          <button
            type="button"
            @click="scrollPrev"
            aria-label="Précédent"
            class="
              absolute left-2 top-1/2 z-20 -translate-y-1/2
              grid h-14 w-14 place-items-center rounded-full
              border border-black/10 bg-white/70 text-zinc-900
              shadow-[0_18px_45px_-25px_rgba(0,0,0,0.35)]
              backdrop-blur
              transition duration-200
              hover:bg-white hover:scale-110 hover:shadow-[0_28px_70px_-35px_rgba(0,0,0,0.45)]
              active:scale-100
            "
          >
            <span class="text-3xl leading-none">‹</span>
          </button>

          <button
            type="button"
            @click="scrollNext"
            aria-label="Suivant"
            class="
              absolute right-2 top-1/2 z-20 -translate-y-1/2
              grid h-14 w-14 place-items-center rounded-full
              border border-black/10 bg-white/70 text-zinc-900
              shadow-[0_18px_45px_-25px_rgba(0,0,0,0.35)]
              backdrop-blur
              transition duration-200
              hover:bg-white hover:scale-110 hover:shadow-[0_28px_70px_-35px_rgba(0,0,0,0.45)]
              active:scale-100
            "
          >
            <span class="text-3xl leading-none">›</span>
          </button>

          <!-- rail -->
          <div
            ref="railRef"
            @scroll="onRailScroll"
            class="
              hide-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-3
              snap-x snap-mandatory
              px-16
            "
          >
            <button
              v-for="(c, idx) in loopCreations"
              :key="`${c.id}-${idx}`"
              type="button"
              @click="open(c)"
              data-card
              class="
  group relative snap-start overflow-hidden rounded-3xl bg-white
  shadow-[0_22px_40px_-28px_rgba(0,0,0,0.28)] ring-1 ring-black/5
  transition duration-300 hover:-translate-y-1 hover:scale-[1.03]
  focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50
  flex-none

  w-[86vw] min-w-[260px]
  sm:w-[48vw] sm:min-w-[320px]
  md:w-[36vw] md:min-w-[340px]
  lg:w-[24%] lg:min-w-[260px]
"

            >
              <div class="relative h-[420px] w-full sm:h-[460px] lg:h-[420px]">
                <img
                  v-if="c.coverUrl"
                  :src="c.coverUrl"
                  :alt="c.title"
                  class="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                  @error="onImgError"
                />
                <div v-else class="absolute inset-0 bg-black/5"></div>

                <!-- overlay clean (pas de tags, pas de counts) -->
                <div class="absolute inset-0 bg-black/10"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

                <!-- bottom text (minimal) -->
                <div class="absolute left-0 right-0 bottom-0 p-5 text-left">
                  <p class="text-base font-extrabold leading-snug text-white drop-shadow">
                    {{ c.title }}
                  </p>
                  <p class="mt-1 text-xs font-semibold text-white/75">
                    <span v-if="c.creator">{{ c.creator }}</span>
                    <span v-if="c.creator && c.craft" class="opacity-50"> · </span>
                    <span v-if="c.craft">{{ prettyCraft(c.craft) }}</span>
                  </p>
                </div>

                <!-- arrow -->
                <div
                  class="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition duration-300 group-hover:scale-105 group-hover:bg-white/15"
                  aria-hidden="true"
                >
                  →
                </div>

                <!-- subtle glow -->
                <div class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                  <div class="absolute -inset-24 bg-[radial-gradient(circle,rgba(251,191,36,0.18),transparent_60%)]"></div>
                </div>
              </div>
            </button>

            <div
              v-if="!hasCreations"
              class="rounded-2xl bg-white/70 p-5 text-zinc-700 ring-1 ring-black/5"
            >
              Aucune création en base.
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- MODAL -->
    <Teleport to="body">
      <div v-if="selected" class="click-modal" @click.self="close">
        <div class="click-modal__backdrop"></div>

        <div class="click-modal__panel">
          <button type="button" @click="close" class="click-modal__close" aria-label="Fermer">
            ✕
          </button>

          <div class="click-modal__top">
            <div class="min-w-0">
              <p class="truncate text-sm font-extrabold text-white">
                {{ selected.title }}
              </p>

              <div class="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/65">
                <span v-if="selected.creator" class="truncate">{{ selected.creator }}</span>
                <span v-if="selected.creator && selected.craft" class="opacity-40">·</span>
                <span v-if="selected.craft">{{ prettyCraft(selected.craft) }}</span>
              </div>

              <p v-if="selected.note" class="mt-2 text-xs text-white/60">
                {{ selected.note }}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <a
                v-if="selected.sourceUrl"
                :href="selected.sourceUrl"
                target="_blank"
                class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/15"
              >
                Ouvrir la source →
              </a>

              <button
                type="button"
                @click="close"
                class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/15"
              >
                Retour
              </button>
            </div>
          </div>

          <div class="click-modal__card">
            <div v-if="hasSteps" class="slider">
              <button
                type="button"
                class="slider__peek slider__peek--left"
                @click="prevStep"
                :disabled="!canPrev"
                aria-label="Étape précédente"
              >
                <img :src="prevStepSrc" alt="" class="slider__peekImg" loading="lazy" @error="onImgError" />
                <span class="slider__chev slider__chev--left">‹</span>
              </button>

              <div class="slider__stage">
                <img
                  :src="currentStepSrc"
                  :alt="`${selected.title} — étape ${stepIndex + 1}`"
                  class="slider__img"
                  loading="lazy"
                  @error="onImgError"
                />

                <div class="slider__meta">
                  Étape <span class="font-semibold">{{ stepIndex + 1 }}</span>
                  <span class="opacity-50">/</span>
                  <span class="font-semibold">{{ stepCount }}</span>
                </div>
              </div>

              <button
                type="button"
                class="slider__peek slider__peek--right"
                @click="nextStep"
                :disabled="!canNext"
                aria-label="Étape suivante"
              >
                <img :src="nextStepSrc" alt="" class="slider__peekImg" loading="lazy" @error="onImgError" />
                <span class="slider__chev slider__chev--right">›</span>
              </button>
            </div>

            <div v-else class="p-6 text-sm text-white/70">
              Pas d’images d’étapes pour cette création.
            </div>

            <!-- tags dans la modal uniquement -->
            <div v-if="selected.tags" class="px-5 pb-5">
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="t in splitTags(selected.tags)"
                  :key="t"
                  class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/10"
                >
                  #{{ t }}
                </span>
              </div>
            </div>
          </div>

          <p class="mt-3 px-1 text-[11px] text-white/50">
            Astuce : <span class="font-semibold text-white/70">Esc</span> pour fermer,
            <span class="font-semibold text-white/70">← →</span> pour naviguer.
          </p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* hide scrollbar */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ---- MODAL ---- */
.click-modal {
  position: fixed; inset: 0; z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}
.click-modal__backdrop {
  position: absolute; inset: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(6px);
}
.click-modal__panel {
  position: relative; z-index: 10000;
  width: 100%; max-width: 72rem;
  animation: popIn 220ms ease-out both;
}
.click-modal__close {
  position: absolute; top: -14px; right: -14px; z-index: 10001;
  height: 42px; width: 42px; border-radius: 999px;
  background: rgba(0, 0, 0, 0.85);
  color: white; border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
  cursor: pointer; display: grid; place-items: center;
  transition: transform 150ms ease, background-color 150ms ease;
}
.click-modal__close:hover { transform: scale(1.05); background: rgba(0, 0, 0, 1); }
.click-modal__top {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; margin-bottom: 12px; padding: 0 4px;
}
.click-modal__card {
  overflow: hidden; border-radius: 24px;
  background: rgba(9, 9, 11, 0.86);
  box-shadow: 0 30px 120px rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.10);
}

/* ---- SLIDER ---- */
.slider {
  position: relative;
  display: grid;
  grid-template-columns: minmax(90px, 180px) 1fr minmax(90px, 180px);
  gap: 14px;
  align-items: center;
  padding: 18px;
}

.slider__stage {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  max-width: 420px;
  margin-inline: auto;
}
.slider__img {
  width: auto;
  height: 62vh;
  max-height: 68vh;
  max-width: 100%;
  object-fit: contain;
  border-radius: 14px;
}
@media (min-width: 1024px) {
  .slider__stage { max-width: 380px; }
}

.slider__meta {
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  backdrop-filter: blur(8px);
}

.slider__peek {
  position: relative;
  height: min(52vh, 360px);
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
  display: block;
  padding: 0;
  transition: transform 160ms ease, opacity 160ms ease, filter 160ms ease;
}
.slider__peek:hover { transform: scale(1.02); }
.slider__peek:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }

.slider__peekImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.08);
  filter: blur(1.5px) saturate(0.9);
  opacity: 0.85;
}

.slider__peek::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.55),
    rgba(0,0,0,0.10),
    rgba(0,0,0,0.55)
  );
}

.slider__chev {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 44px;
  width: 44px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.95);
  display: grid;
  place-items: center;
  font-size: 28px;
  line-height: 1;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
}
.slider__chev--left { left: 10px; }
.slider__chev--right { right: 10px; }

@media (max-width: 640px) {
  .slider {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .slider__peek {
    display: none;
  }
}
</style>
