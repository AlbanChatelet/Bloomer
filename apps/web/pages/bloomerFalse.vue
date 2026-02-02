<script setup lang="ts">
const config = useRuntimeConfig();
const api = config.public.apiBase;

type Vinyl = {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string | null;
  year?: number | null;
  tags?: string | null;
};

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

type AestheticPost = {
  id: string;
  title?: string | null;
  imageUrl: string;
  vibe?: string | null;
  tags?: string | null;
};

type Creation = {
  id: string;
  title: string;
  type: string;
  imageUrl?: string | null;
  description?: string | null;
  author?: string | null;
  tags?: string | null;
};

type MusicAlbum = {
  id: string;
  title: string;
  artist: string;
  year?: number | null;
  genre: string;
  region?: string | null;
  coverUrl?: string | null; // lien wiki
  coverImageUrl?: string | null; // image locale
};

type MusicAesthetic = {
  id: string;
  title?: string | null;
  imageUrl: string;
  sourceUrl: string;
  vibe?: string | null;
  tags?: string | null;
};

const { data: albums, error: albumsError, pending: albumsPending } =
  await useFetch<MusicAlbum[]>(`${api}/albums`);

const { data: musicAesthetic } = await useFetch<MusicAesthetic[]>(
  `${api}/music-aesthetic`
);

const { data: vinyls } = await useFetch<Vinyl[]>(`${api}/vinyls`);
const { data: episodes } = await useFetch<ShowEpisode[]>(`${api}/episodes`);
const { data: aesthetics } = await useFetch<AestheticPost[]>(
  `${api}/aesthetics`
);
const { data: creations } = await useFetch<Creation[]>(`${api}/creations`);

// (optionnel) mapping joli pour les genres
const genreLabel: Record<string, string> = {
  rock: "Rock",
  jazz: "Jazz",
  hiphop: "Hip-hop",
  electro: "Électro",
  pop_us: "Pop US",
  fr: "Variété FR",
  asia: "Asie",
  africa: "Afrique",
};
</script>

<template>
  <nav class="sticky top-0 z-50 border-b border-black/5 bg-amber-50/70 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
      <NuxtLink to="/" class="text-sm font-extrabold tracking-wide text-zinc-900">
        BLOOMER
      </NuxtLink>

      <div class="flex flex-wrap gap-2">
        <a href="#vinyls" class="rounded-full px-3 py-1 text-xs font-semibold text-zinc-800 hover:bg-white/70">Vinyles</a>
        <a href="#albums" class="rounded-full px-3 py-1 text-xs font-semibold text-zinc-800 hover:bg-white/70">Albums</a>
        <a href="#episodes" class="rounded-full px-3 py-1 text-xs font-semibold text-zinc-800 hover:bg-white/70">Épisodes</a>
        <a href="#aesthetic" class="rounded-full px-3 py-1 text-xs font-semibold text-zinc-800 hover:bg-white/70">Aesthetic</a>
        <a href="#creations" class="rounded-full px-3 py-1 text-xs font-semibold text-zinc-800 hover:bg-white/70">Créations</a>
      </div>
    </div>
  </nav>

  <div class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-zinc-900">
    <!-- HERO -->
    <header class="mx-auto max-w-6xl px-6 pt-14 pb-10">
      <p class="text-sm tracking-wide text-zinc-600">BLOOMER</p>
      <h1 class="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
        Retrouver le monde <span class="text-amber-700">chaud</span>, créatif et vivant.
      </h1>
      <p class="mt-5 max-w-2xl text-base leading-relaxed text-zinc-700">
        Ici on garde ce qui marque : des albums qu’on écoute vraiment, des épisodes cultes, des images qui font respirer,
        des créations faites par des gens — pas par un algorithme.
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <a href="#vinyls" class="rounded-full bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800">
          Vinyles
        </a>
        <a href="#albums" class="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-white">
          Albums cultes
        </a>
        <a href="#episodes" class="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-white">
          Épisodes cultes
        </a>
        <a href="#aesthetic" class="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-white">
          Aesthetic
        </a>
        <a href="#creations" class="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-white">
          Créations
        </a>
      </div>
    </header>

   >

    

    <!-- (OPTION) MUSIC AESTHETIC -->
    <section v-if="musicAesthetic" id="music-aesthetic" class="mx-auto max-w-6xl px-6 py-10">
      <h2 class="text-2xl font-bold">💿 Aesthetic musique</h2>
      <p class="mt-2 max-w-2xl text-zinc-700">
        Murs de vinyles, collections, vibes analogiques.
      </p>

      <div class="mt-7 columns-1 gap-4 sm:columns-2 lg:columns-3">
        <figure
          v-for="m in (musicAesthetic || [])"
          :key="m.id"
          class="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5"
        >
          <a :href="m.sourceUrl" target="_blank" rel="noopener noreferrer" class="block">
            <div class="w-full bg-amber-100">
              <img :src="m.imageUrl" :alt="m.title || 'Music aesthetic'" class="w-full object-cover" loading="lazy" />
            </div>
          </a>
          <figcaption class="p-4">
            <p v-if="m.title" class="text-sm font-semibold">{{ m.title }}</p>
            <p v-if="m.vibe" class="text-sm text-zinc-600">{{ m.vibe }}</p>
            <p v-if="m.tags" class="mt-2 text-xs text-zinc-500"># {{ m.tags }}</p>
          </figcaption>
        </figure>

        <div v-if="!musicAesthetic || musicAesthetic.length === 0" class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5">
          Ajoute des liens Pinterest via Prisma Studio pour remplir cette section.
        </div>
      </div>
    </section>

    <!-- SECTION: EPISODES -->
    <section id="episodes" class="mx-auto max-w-6xl px-6 py-10">
      <h2 class="text-2xl font-bold">📺 Épisodes incontournables</h2>
      <p class="mt-2 max-w-2xl text-zinc-700">
        Les épisodes qui restent en tête. Pas “le plus populaire”, mais “le plus marquant”.
      </p>

      <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="e in (episodes || [])"
          :key="e.id"
          class="rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5 hover:bg-white"
        >
          <div class="flex items-center justify-between gap-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-amber-800">
              {{ e.show }}
            </p>
            <p v-if="e.communityRank" class="text-xs text-zinc-600">#{{ e.communityRank }}</p>
          </div>

          <h3 class="mt-2 text-base font-bold leading-snug">
            {{ e.title }}
          </h3>

          <p class="mt-2 text-sm text-zinc-700" v-if="e.note">
            {{ e.note }}
          </p>

          <p class="mt-3 text-xs text-zinc-600" v-if="e.season && e.episode">
            Saison {{ e.season }}, épisode {{ e.episode }}
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

        <div v-if="!episodes || episodes.length === 0" class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5">
          Ajoute des épisodes (Simpsons/South Park/Malcolm) via Prisma Studio.
        </div>
      </div>
    </section>

    

  
    
  </div>
</template>
