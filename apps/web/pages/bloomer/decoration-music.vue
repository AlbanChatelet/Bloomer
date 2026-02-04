<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
import BloomerHeader from "~/components/BloomerHeader.vue";
import BloomerFooter from "~/components/BloomerFooter.vue"
const config = useRuntimeConfig();
const api = config.public.apiBase;

type MusicAesthetic = {
  id: string;
  title: string;
  imageUrl?: string | null;
  sourceUrl?: string | null;
  vibe?: string | null;
  tags?: string | null;
};

const { data: posts, pending, error } = await useFetch<MusicAesthetic[]>(
  `${api}/music-aesthetic`
);

// Helpers
const splitTags = (tags?: string | null) =>
  (tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 6);

const prettyVibe = (v?: string | null) => {
  if (!v) return null;
  return v
    .split(",")
    .map((w) => w.trim())
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" · ");
};

// CLICK ZOOM
const selected = ref<MusicAesthetic | null>(null);
const open = (item: MusicAesthetic) => (selected.value = item);
const close = () => (selected.value = null);

const hasPosts = computed(() => (posts.value || []).length > 0);

const onKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") close();
};

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <div class="min-h-screen bg-[#E9DCC6] text-zinc-900">
    <BloomerHeader />

    <div class="pt-20 sm:pt-24">
      <!-- INTRO SPLIT -->
      <section class="mx-auto max-w-6xl px-6 pt-12 pb-14">
        <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
          <!-- TEXTE -->
          <div>
            <p class="text-xs font-semibold tracking-[0.22em] text-zinc-600">
              BLOOMER • DÉCORATION & MUSIQUE
            </p>

            <h1 class="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Espaces musicaux
              <span class="text-amber-700">à habiter</span>
            </h1>

            <div class="mt-6 space-y-5 text-lg leading-relaxed text-zinc-800">
              <p>
                La musique dépasse largement l’écoute.
                Elle s’inscrit dans des <strong>lieux</strong>,
                des <strong>objets</strong> et des <strong>ambiances</strong>.
              </p>

              <p>
                Platines, vinyles, lumières, matières :
                ces éléments transforment un espace en
                <strong>territoire sensible</strong>, propice au calme
                et à l’attention.
              </p>

              <p>
                Ces inspirations montrent comment
                <strong>donner une place physique à la musique</strong>,
                ralentir, et créer un décor qui prolonge l’expérience sonore.
              </p>
            </div>
          </div>

          <!-- IMAGE -->
          <div class="overflow-hidden rounded-3xl shadow-xl">
            <img
              src="/images/MusicAesthetics/decor.jpg"
              alt="Décoration musicale"
              class="h-[420px] w-full object-cover sm:h-[520px] lg:h-[560px]"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <!-- CONTENT -->
      <main class="mx-auto max-w-6xl px-6 pb-16">
        <div
          v-if="pending"
          class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5"
        >
          Chargement des inspirations…
        </div>

        <div
          v-else-if="error"
          class="rounded-2xl bg-red-50 p-5 text-red-800 ring-1 ring-red-200"
        >
          Erreur API : {{ error.message }}
        </div>

        <div v-else>
          <div class="mb-6 flex items-end justify-between gap-6">
            <p class="text-sm text-zinc-600">
              {{ (posts || []).length }} inspirations
            </p>

            <a
              href="https://fr.pinterest.com/"
              target="_blank"
              class="rounded-full bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
            >
              Explorer Pinterest →
            </a>
          </div>

          <!-- MASONRY -->
          <div class="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            <article
              v-for="p in posts || []"
              :key="p.id"
              class="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                @click="open(p)"
                class="pin-card relative w-full overflow-hidden rounded-3xl bg-white/60 ring-1 ring-black/5"
              >
                <img
                  v-if="p.imageUrl"
                  :src="p.imageUrl"
                  :alt="p.title"
                  class="pin-img w-full object-contain"
                />

                <div class="pin-overlay absolute inset-0 opacity-0">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div class="absolute inset-x-0 bottom-0 p-4 text-left">
                    <p class="text-sm font-extrabold text-white">
                      {{ p.title }}
                    </p>
                    <p
                      v-if="p.vibe"
                      class="mt-1 text-xs font-semibold text-amber-200"
                    >
                      {{ prettyVibe(p.vibe) }}
                    </p>
                    <p class="mt-3 text-[11px] text-white/70">
                      Cliquer pour zoom
                    </p>
                  </div>
                </div>
              </button>
            </article>
          </div>
        </div>
      </main>
    </div>

    <!-- CLICK MODAL -->
    <Teleport to="body">
      <div v-if="selected" class="click-modal" @click.self="close">
        <div class="click-modal__backdrop"></div>

        <div class="click-modal__panel">
          <button class="click-modal__close" @click="close">✕</button>

          <div class="click-modal__top">
            <div>
              <p class="text-sm font-extrabold text-white">
                {{ selected.title }}
              </p>
              <p v-if="selected.vibe" class="text-xs text-white/60">
                {{ prettyVibe(selected.vibe) }}
              </p>
            </div>

            <a
              v-if="selected.sourceUrl"
              :href="selected.sourceUrl"
              target="_blank"
              class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20"
            >
              Source →
            </a>
          </div>

          <div class="click-modal__card">
            <img
              v-if="selected.imageUrl"
              :src="selected.imageUrl"
              class="mx-auto max-h-[75vh] max-w-[80vw] rounded-2xl object-contain"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
  <BloomerFooter />
</template>

<style scoped>
.pin-card {
  transition: transform 250ms ease, box-shadow 250ms ease;
}
.pin-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
}
.pin-img {
  transition: transform 700ms ease;
}
.pin-card:hover .pin-img {
  transform: scale(1.1);
}
.pin-overlay {
  transition: opacity 200ms ease;
}
.pin-card:hover .pin-overlay {
  opacity: 1;
}

/* MODAL */
.click-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
}
.click-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
}
.click-modal__panel {
  position: relative;
  z-index: 10000;
}
.click-modal__close {
  position: absolute;
  top: -14px;
  right: -14px;
  height: 40px;
  width: 40px;
  border-radius: 999px;
  background: black;
  color: white;
}
.click-modal__top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.click-modal__card {
  background: rgba(0, 0, 0, 0.85);
  padding: 16px;
  border-radius: 24px;
}
</style>
