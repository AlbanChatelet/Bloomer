<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from "vue";

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

// Click zoom (foreground)
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
  <div
    class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-zinc-900"
  >
    <!-- NAV -->
    <nav
      class="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/60 backdrop-blur"
    >
      <div
        class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3"
      >
        <NuxtLink to="/" class="text-sm font-extrabold tracking-wide text-white">
          BLOOMER
        </NuxtLink>

        <NuxtLink
          to="/bloomer"
          class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/15"
        >
          Retour Bloomer
        </NuxtLink>
      </div>
    </nav>

    <!-- HEADER -->
    <header class="mx-auto max-w-6xl px-6 pt-12 pb-8">
      <p class="text-xs tracking-[0.22em] text-white/60">DÉCORATION · MUSIQUE</p>
      <h1 class="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
        Galerie <span class="text-amber-300">aesthetic</span>
      </h1>
      
    </header>

    <!-- CONTENT -->
    <main class="mx-auto max-w-6xl px-6 pb-16">
      <div
        v-if="pending"
        class="rounded-2xl bg-white/5 p-5 text-white/70 ring-1 ring-white/10"
      >
        Chargement des inspirations…
      </div>

      <div
        v-else-if="error"
        class="rounded-2xl bg-red-500/10 p-5 text-red-200 ring-1 ring-red-500/30"
      >
        Erreur API : {{ error.message }}
      </div>

      <div v-else>
        <div class="mb-6 flex items-end justify-between gap-6">
          <p class="text-sm text-white/60">
            {{ (posts || []).length }} inspirations
          </p>

          <a
            href="https://fr.pinterest.com/"
            target="_blank"
            class="rounded-full bg-amber-300/90 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-300"
          >
            Explorer Pinterest →
          </a>
        </div>

        <!-- MASONRY -->
        <div class="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          <template v-for="p in posts || []" :key="p.id">
            <article class="mb-4 break-inside-avoid">
              <!-- CARD -->
              <button
                type="button"
                @click="open(p)"
                class="pin-card relative w-full overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10"
              >
                <!-- Hover zoom (dans la carte) -->
                <div class="pin-media">
                  <img
                    v-if="p.imageUrl"
                    :src="p.imageUrl"
                    :alt="p.title"
                    loading="lazy"
                    class="pin-img h-auto w-full select-none object-contain"
                  />
                </div>

                <!-- Overlay hover -->
                <div class="pin-overlay pointer-events-none absolute inset-0 opacity-0">
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent"
                  ></div>

                  <div class="absolute left-0 right-0 bottom-0 p-4 text-left">
                    <p
                      class="text-sm font-extrabold leading-snug text-white drop-shadow"
                    >
                      {{ p.title }}
                    </p>

                    <p
                      v-if="p.vibe"
                      class="mt-1 text-xs font-semibold text-amber-200/90"
                    >
                      {{ prettyVibe(p.vibe) }}
                    </p>

                    <div v-if="p.tags" class="mt-3 flex flex-wrap gap-2">
                      <span
                        v-for="t in splitTags(p.tags)"
                        :key="t"
                        class="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90 ring-1 ring-white/10"
                      >
                        #{{ t }}
                      </span>
                    </div>

                    <p class="mt-3 text-[11px] text-white/60">
                      Cliquer pour zoom
                    </p>
                  </div>
                </div>

                <div
                  class="pin-badge absolute right-3 top-3 rounded-full bg-zinc-950/50 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/10 opacity-0 backdrop-blur"
                >
                  Zoom
                </div>
              </button>

              
            </article>
          </template>

          <div
            v-if="!hasPosts"
            class="rounded-2xl bg-white/5 p-5 text-white/70 ring-1 ring-white/10"
          >
            Aucune inspiration en base. Relance le seed MusicAesthetic.
          </div>
        </div>
      </div>
    </main>

    <!-- CLICK ZOOM FOREGROUND (toujours au-dessus) -->
    <Teleport to="body">
      <div v-if="selected" class="click-modal" @click.self="close">
        <div class="click-modal__backdrop"></div>

        <div class="click-modal__panel">
          <!-- ✅ bouton retour/fermer visible -->
          <button
            type="button"
            @click="close"
            class="click-modal__close"
            aria-label="Fermer"
          >
            ✕
          </button>

          <div class="click-modal__top">
            <div class="min-w-0">
              <p class="truncate text-sm font-extrabold text-white">
                {{ selected.title }}
              </p>
              <p v-if="selected.vibe" class="mt-1 text-xs text-white/60">
                {{ prettyVibe(selected.vibe) }}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <a
                v-if="selected.sourceUrl"
                :href="selected.sourceUrl"
                target="_blank"
                class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/15"
              >
                Source →
              </a>

              <button
                type="button"
                @click="close"
                class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/15"
              >
                Fermer (Esc)
              </button>
            </div>
          </div>

          <div class="click-modal__card">
            <div class="max-h-[82vh] overflow-auto p-4">
              <!-- ✅ image plus petite + respirante -->
              <img
                v-if="selected.imageUrl"
                :src="selected.imageUrl"
                :alt="selected.title"
                class="mx-auto max-h-[70vh] max-w-[70vw] rounded-2xl object-contain"
              />

              <div v-if="selected.tags" class="mt-4 flex flex-wrap gap-2">
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
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* ---- HOVER (dans la carte) : zoom + overlay ---- */
.pin-card {
  transform: translateZ(0);
  transition: transform 250ms ease, box-shadow 250ms ease, background-color 250ms ease;
}
.pin-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
}

.pin-media {
  overflow: hidden;
}

.pin-img {
  display: block;
  transform: scale(1);
  transition: transform 700ms ease-out;
  will-change: transform;
}
.pin-card:hover .pin-img {
  transform: scale(1.12);
}

.pin-overlay {
  transition: opacity 220ms ease;
}
.pin-card:hover .pin-overlay {
  opacity: 1;
}
.pin-card:hover .pin-badge {
  opacity: 1;
  transition: opacity 220ms ease;
}

/* ✅ OVERLAY CLICK : z-index GARANTI AU-DESSUS DE TOUT */
.click-modal {
  position: fixed;
  inset: 0;
  z-index: 9999; /* <- le vrai fix */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.click-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(6px);
}

.click-modal__panel {
  position: relative;
  z-index: 10000; /* panel au-dessus du backdrop */
  width: 100%;
  max-width: 25rem; /* ~ max-w-6xl */
  animation: popIn 220ms ease-out both;
}

/* ✅ bouton close flottant */
.click-modal__close {
  position: absolute;
  top: -14px;
  right: -14px;
  z-index: 10001;
  height: 42px;
  width: 42px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: transform 150ms ease, background-color 150ms ease;
}
.click-modal__close:hover {
  transform: scale(1.05);
  background: rgba(0, 0, 0, 1);
}

.click-modal__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  padding: 0 4px;
}

.click-modal__card {
  overflow: hidden;
  border-radius: 24px;
  background: rgba(9, 9, 11, 0.8); /* zinc */
  box-shadow: 0 30px 120px rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.10);
}

/* ✅ anim "glisse vers l'utilisateur" (ta version) */
@keyframes popIn {
  0% {
    opacity: 0;
    transform: translateY(24px) scale(0.92);
    filter: blur(4px);
  }
  60% {
    opacity: 1;
    transform: translateY(-2px) scale(1.02);
    filter: blur(0);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}
</style>