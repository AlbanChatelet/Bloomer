<script setup lang="ts">
const config = useRuntimeConfig();
const api = config.public.apiBase;

type ShowEpisode = {
  id: string;
  show: string;
  title: string;
  season?: number | null;
  episode?: number | null;
  communityRank?: number | null;
  linkUrl?: string | null;
  note?: string | null;
};

const { data: episodes, error, pending } = await useFetch<ShowEpisode[]>(
  `${api}/episodes`
);

// Group by show
const grouped = computed(() => {
  const list = episodes.value ?? [];
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
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-zinc-900">
    <!-- Top bar -->
    <nav class="sticky top-0 z-50 border-b border-black/5 bg-amber-50/70 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <NuxtLink to="/" class="text-sm font-extrabold tracking-wide text-zinc-900">
          BLOOMER
        </NuxtLink>

        <NuxtLink
          to="/bloomer"
          class="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-800 hover:bg-white"
        >
          Retour Bloomer
        </NuxtLink>
      </div>
    </nav>

    <header class="mx-auto max-w-6xl px-6 pt-12 pb-8">
      <p class="text-sm tracking-wide text-zinc-600">SÉRIES “SANS HISTOIRE”</p>
      <h1 class="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
        Épisodes cultes <span class="text-amber-700">par la communauté</span>
      </h1>
      <p class="mt-4 max-w-2xl text-zinc-700">
        Simpsons, South Park, Malcolm — des épisodes que tu peux lancer au hasard et kiffer direct.
      </p>
    </header>

    <main class="mx-auto max-w-6xl px-6 pb-16">
      <div v-if="pending" class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5">
        Chargement des épisodes…
      </div>

      <div v-else-if="error" class="rounded-2xl bg-red-50 p-5 text-red-800 ring-1 ring-red-200">
        Erreur API : {{ error.message }}
      </div>

      <div v-else>
        <section
          v-for="(eps, showName) in grouped"
          :key="showName"
          class="mb-10"
        >
          <div class="flex items-end justify-between gap-6">
            <div>
              <h2 class="text-2xl font-bold">📺 {{ showName }}</h2>
              <p class="mt-2 text-zinc-700">
                Top épisodes (ordre communauté).
              </p>
            </div>
          </div>

          <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="e in eps"
              :key="e.id"
              class="rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5 hover:bg-white"
            >
              <div class="flex items-center justify-between gap-4">
                <p v-if="e.communityRank" class="text-xs font-semibold text-zinc-700">
                  #{{ e.communityRank }}
                </p>
                <p v-if="e.season && e.episode" class="text-xs text-zinc-600">
                  S{{ e.season }} · E{{ e.episode }}
                </p>
              </div>

              <h3 class="mt-2 text-base font-bold leading-snug">
                {{ e.title }}
              </h3>

              <p v-if="e.note" class="mt-2 text-sm text-zinc-700">
                {{ e.note }}
              </p>

              <a
                v-if="e.linkUrl"
                :href="e.linkUrl"
                target="_blank"
                class="mt-4 inline-block text-sm font-semibold text-amber-800 hover:underline"
              >
                Voir la source →
              </a>
            </article>
          </div>
        </section>

        <div v-if="Object.keys(grouped).length === 0" class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5">
          Aucun épisode en base. Relance le seed.
        </div>
      </div>
    </main>
  </div>
</template>
