<script setup lang="ts">
const config = useRuntimeConfig();
const api = config.public.apiBase;
import { B } from "vue-router/dist/router-CWoNjPRp.mjs";
import BloomerFooter from "~/components/BloomerFooter.vue"
type ShowEpisode = {
  id: string;
  show: string;
  title: string;
  season?: number | null;
  episode?: number | null;
  communityRank?: number | null;
  linkUrl?: string | null;
  note?: string | null;
  cover?: string | null;
};

const { data: episodes, error, pending } = await useFetch<ShowEpisode[]>(
  `${api}/episodes`
);

/** UI state */
const selectedShow = ref<string>("all");
const query = ref<string>("");

/** Data */
const allEpisodes = computed(() => episodes.value ?? []);

/** Icons (put your files in /public/images/icons/...) */
const iconByShow = (show: string) => {
  // ✅ adapte les noms de fichiers ici
  if (show === "Simpsons") return "/images/icons/simpsons.svg";
  if (show === "South Park") return "/images/icons/south-park.svg";
  if (show === "Malcolm") return "/images/icons/malcolm.svg";
  return "/images/icons/tv.svg";
};

const shows = computed(() => {
  const set = new Set<string>();
  for (const e of allEpisodes.value) set.add(e.show || "Autres");

  const order = ["Simpsons", "South Park", "Malcolm"];
  const rest = [...set]
    .filter((s) => !order.includes(s))
    .sort((a, b) => a.localeCompare(b));

  return [...order.filter((s) => set.has(s)), ...rest];
});

const showCounts = computed(() => {
  const counts: Record<string, number> = {};
  for (const e of allEpisodes.value) {
    const key = e.show || "Autres";
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
});

/** Filtered episodes (by show + search on show/title) */
const filteredEpisodes = computed(() => {
  const q = query.value.trim().toLowerCase();

  return allEpisodes.value.filter((e) => {
    const showName = (e.show || "Autres").toLowerCase();
    const title = (e.title || "").toLowerCase();

    const matchesShow =
      selectedShow.value === "all"
        ? true
        : (e.show || "Autres") === selectedShow.value;

    const matchesQuery =
      q.length === 0 ? true : showName.includes(q) || title.includes(q);

    return matchesShow && matchesQuery;
  });
});

// Group by show (from filtered list)
const grouped = computed(() => {
  const list = filteredEpisodes.value;
  const map: Record<string, ShowEpisode[]> = {};

  for (const ep of list) {
    const key = ep.show || "Autres";
    if (!map[key]) map[key] = [];
    map[key].push(ep);
  }

  // sort in each group by rank
  for (const key of Object.keys(map)) {
    map[key].sort((a, b) => (a.communityRank ?? 999) - (b.communityRank ?? 999));
  }

  // custom order
  const order = ["Simpsons", "South Park", "Malcolm"];
  const ordered: Record<string, ShowEpisode[]> = {};

  for (const k of order) if (map[k]) ordered[k] = map[k];
  for (const k of Object.keys(map)) if (!ordered[k]) ordered[k] = map[k];

  return ordered;
});

const safeCover = (e: ShowEpisode) => e.cover || "/images/shows/cover.jpg";

const clearFilters = () => {
  selectedShow.value = "all";
  query.value = "";
};

const hasActiveFilters = computed(
  () => selectedShow.value !== "all" || query.value.trim().length > 0
);
</script>

<template>
  <div class="min-h-screen bg-[#E9DCC6] text-zinc-900">
    <BloomerHeader />

    <div class="pt-20 sm:pt-24">
      <!-- Hero -->
      <header class="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <p class="text-xs font-semibold tracking-[0.22em] text-zinc-600">
          BLOOMER • SÉRIES
        </p>

        <h1 class="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
          Épisodes cultes
          <span class="text-amber-700">qui vont réenchanter ta vie</span>
        </h1>

        <p class="mt-4 max-w-2xl text-zinc-700">
          Une sélection d’épisodes “sans contexte” : tu lances au hasard, et tu passes un bon moment.
        </p>
      </header>

      <main class="mx-auto max-w-6xl px-6 pb-16">
        <!-- States -->
        <div v-if="pending" class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5">
          Chargement des épisodes…
        </div>

        <div v-else-if="error" class="rounded-2xl bg-red-50 p-5 text-red-800 ring-1 ring-red-200">
          Impossible de récupérer la liste pour le moment.
          <span class="block text-sm text-red-700/90 mt-1">Détail : {{ error.message }}</span>
        </div>

        <div v-else>
          <!-- Modern Filter Bar -->
          <section class="mb-10">
            <div class="relative overflow-hidden rounded-3xl bg-white/60 ring-1 ring-black/5 shadow-sm backdrop-blur">
              <!-- soft gradient accent -->
              <div class="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-300/25 blur-3xl" />
              <div class="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-300/20 blur-3xl" />

              <div class="relative p-4 sm:p-5">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 class="text-sm font-extrabold tracking-wide text-zinc-900">Recherche & filtres</h2>
                    <p class="mt-1 text-xs text-zinc-600">
                      Recherche par <span class="font-semibold text-zinc-800">série</span> ou par
                      <span class="font-semibold text-zinc-800">titre d’épisode</span>.
                    </p>
                  </div>

                  <button
                    v-if="hasActiveFilters"
                    type="button"
                    @click="clearFilters"
                    class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-800
                           ring-1 ring-black/10 hover:bg-amber-50 transition
                           focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  >
                    <span class="opacity-80">↺</span>
                    Réinitialiser
                  </button>
                </div>

                <!-- Search input + stats -->
                <div class="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                  <!-- Search -->
                  <div class="relative">
                    <div class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" aria-hidden="true">
                      <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <input
                      v-model="query"
                      type="text"
                      placeholder="Cherche une série ou un épisode… (ex : Casa Bonita, Monorail, Malcolm)"
                      class="w-full rounded-2xl bg-white/80 px-11 py-3.5 text-sm text-zinc-900
                             ring-1 ring-black/10 shadow-sm placeholder:text-zinc-400
                             focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    />

                    <button
                      v-if="query.trim().length"
                      type="button"
                      @click="query = ''"
                      class="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-xl
                             bg-white ring-1 ring-black/10 hover:bg-zinc-50 transition
                             focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                      aria-label="Effacer la recherche"
                    >
                      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </div>

                  <!-- Results chip -->
                  <div class="flex items-center justify-between gap-2 md:justify-end">
                    <div class="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs text-zinc-700 ring-1 ring-black/10 shadow-sm">
                      <span class="font-semibold text-zinc-900">{{ filteredEpisodes.length }}</span>
                      <span>résultat<span v-if="filteredEpisodes.length > 1">s</span></span>
                    </div>

                    <div class="hidden md:block text-xs text-zinc-500">
                      Tri : <span class="font-semibold text-zinc-700">rang communauté</span>
                    </div>
                  </div>
                </div>

                <!-- Show chips (icons only, bigger) -->
                <div class="mt-4">
                  <div class="flex items-center justify-between">
                    <p class="text-xs font-semibold text-zinc-700">Séries</p>
                    <p class="text-xs text-zinc-500">Clique pour filtrer</p>
                  </div>

                  <div class="mt-2 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
                    <!-- All -->
                    <button
                      type="button"
                      @click="selectedShow = 'all'"
                      class="shrink-0 inline-flex items-center justify-center gap-3 rounded-2xl px-4 py-3 text-xs font-semibold transition
                             ring-1 ring-black/10
                             focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                      :class="selectedShow === 'all'
                        ? 'bg-zinc-900 text-white shadow-sm'
                        : 'bg-white/80 text-zinc-800 hover:bg-white'"
                      aria-label="Tout"
                      title="Tout"
                    >
                      <span class="font-extrabold">ALL</span>
                      <span
                        class="rounded-full px-2 py-0.5 text-[10px] font-extrabold"
                        :class="selectedShow === 'all' ? 'bg-white/20 text-white' : 'bg-black/10 text-zinc-700'"
                      >
                        {{ allEpisodes.length }}
                      </span>
                    </button>

                    <!-- Icons -->
                    <button
                      v-for="s in shows"
                      :key="s"
                      type="button"
                      @click="selectedShow = s"
                      class="shrink-0 inline-flex items-center justify-center gap-3 rounded-2xl px-4 py-3 transition
                             ring-1 ring-black/10
                             focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                      :class="selectedShow === s
                        ? 'bg-amber-500/90 text-zinc-900 shadow-sm'
                        : 'bg-white/80 text-zinc-800 hover:bg-white'"
                      :aria-label="s"
                      :title="s"
                    >
                      <img
                        :src="iconByShow(s)"
                        :alt="`${s} icon`"
                        class="h-12 w-12 opacity-95"
                        loading="lazy"
                      />
                      <span
                        class="rounded-full px-2 py-0.5 text-[10px] font-extrabold"
                        :class="selectedShow === s ? 'bg-black/10 text-zinc-900' : 'bg-black/10 text-zinc-700'"
                      >
                        {{ showCounts[s] ?? 0 }}
                      </span>
                    </button>
                  </div>

                  <!-- Active filter pills -->
                  <div v-if="hasActiveFilters" class="mt-3 flex flex-wrap gap-2">
                    <span
                      v-if="selectedShow !== 'all'"
                      class="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs text-zinc-700 ring-1 ring-black/10"
                      :title="selectedShow"
                    >
                      <img
                        :src="iconByShow(selectedShow)"
                        :alt="`${selectedShow} icon`"
                        class="h-6 w-6"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        @click="selectedShow = 'all'"
                        class="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-zinc-100
                               focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                        aria-label="Retirer le filtre série"
                      >
                        ✕
                      </button>
                    </span>

                    <span
                      v-if="query.trim().length"
                      class="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs text-zinc-700 ring-1 ring-black/10"
                    >
                      <span class="font-semibold text-zinc-900">Recherche :</span> “{{ query.trim() }}”
                      <button
                        type="button"
                        @click="query = ''"
                        class="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-zinc-100
                               focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                        aria-label="Retirer la recherche"
                      >
                        ✕
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Empty results -->
          <div v-if="Object.keys(grouped).length === 0" class="rounded-2xl bg-white/60 p-6 ring-1 ring-black/5">
            <p class="text-zinc-800 font-semibold">Aucun résultat.</p>
            <p class="mt-1 text-sm text-zinc-600">Essaie un autre mot-clé ou repasse sur “Tout”.</p>
          </div>

          <!-- Results -->
          <section v-for="(eps, showName) in grouped" :key="showName" class="mb-12">
            <div class="flex items-center justify-between">
              <!-- BIG logo above list -->
              <img
                :src="iconByShow(String(showName))"
                :alt="`${showName} icon`"
                class="h-20 w-20 sm:h-28 sm:w-28 opacity-95"
                loading="lazy"
              />

              <div class="hidden sm:block text-xs text-zinc-600">
                Tri : <span class="font-semibold text-zinc-800">rang communauté</span>
              </div>
            </div>

            <!-- Cards -->
            <div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <component
                v-for="e in eps"
                :key="e.id"
                :is="e.linkUrl ? 'a' : 'div'"
                :href="e.linkUrl || undefined"
                target="_blank"
                rel="noopener noreferrer"
                class="group block focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              >
                <article
                  class="relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5
                         transition-transform duration-300 ease-out
                         hover:scale-[1.03] hover:shadow-xl"
                >
                  <!-- Cover full card -->
                  <div class="relative aspect-[16/11] w-full">
                    <img
                      :src="safeCover(e)"
                      :alt="e.title"
                      class="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />

                    <!-- Gradient overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <!-- Top chips + link arrow (top-right now) -->
                    <div class="absolute left-4 top-4 right-4 flex items-start justify-between gap-2">
                      <div class="flex flex-wrap gap-2">
                        <!-- show chip icon only (bigger + centered) -->
                        <span
                          class="inline-flex items-center justify-center rounded-full bg-white/90 h-10 w-10 ring-1 ring-black/10"
                          :title="e.show"
                          aria-label="Série"
                        >
                          <img
                            :src="iconByShow(e.show)"
                            :alt="`${e.show} icon`"
                            class="h-6 w-6 opacity-95"
                            loading="lazy"
                          />
                        </span>

                        

                        <!-- season/episode centered -->
                        <span
                          v-if="e.season && e.episode"
                          class="inline-flex items-center justify-center rounded-full bg-white/80 px-3 h-10 text-[11px] font-semibold text-zinc-900 ring-1 ring-black/10"
                        >
                          S{{ e.season }} · E{{ e.episode }}
                        </span>
                      </div>

                      <!-- Arrow to source (top-right) -->
                      <div v-if="e.linkUrl" class="shrink-0">
                        <div
                          class="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur
                                 transition-all duration-300 ease-out
                                 group-hover:-translate-y-1 group-hover:scale-110"
                          aria-hidden="true"
                          title="Ouvrir la source"
                        >
                          <span class="text-lg text-white">↗</span>
                        </div>
                      </div>
                    </div>

                    <!-- Bottom title block -->
                    <div class="absolute inset-x-0 bottom-0 p-4">
                      <h3 class="text-base font-extrabold leading-snug text-white drop-shadow">
                        {{ e.title }}
                      </h3>

                      <p v-if="e.note" class="mt-1 line-clamp-2 text-sm text-white/85">
                        {{ e.note }}
                      </p>
                      <p v-else class="mt-1 text-sm text-white/70">
                        Un classique à revoir — sélectionné par la communauté.
                      </p>
                    </div>
                  </div>

                  <!-- Hover border -->
                  <div
                    class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5 transition group-hover:ring-amber-300/60"
                  />
                </article>
              </component>
            </div>
          </section>

          <!-- No data -->
          <div v-if="allEpisodes.length === 0" class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5">
            Aucun épisode pour l’instant.
            <span class="block text-sm text-zinc-600 mt-1">
              Ajoute des entrées côté base (ou relance ton seed) puis recharge la page.
            </span>
          </div>
        </div>
      </main>

      <footer class="mx-auto max-w-6xl px-6 pb-10 text-xs text-zinc-600">
        <div class="rounded-2xl bg-white/50 p-4 ring-1 ring-black/5">
          <span class="font-semibold text-zinc-800">Note :</span>
          Le classement est calculé à partir des votes / rangs stockés en base (champ
          <span class="font-mono">communityRank</span>).
        </div>
      </footer>
    </div>
  </div>
  <BloomerFooter />
</template>
