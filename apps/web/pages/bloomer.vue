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
  year?: number;
  genre: string;
  region?: string;
  coverUrl?: string;
};

const { data: albums, error: albumsError, pending: albumsPending } =
  await useFetch<MusicAlbum[]>(`${api}/albums`);

type MusicAesthetic = {
  id: string;
  title?: string | null;
  imageUrl: string;
  sourceUrl: string;
  vibe?: string | null;
  tags?: string | null;
};

const { data: musicAesthetic } = await useFetch<MusicAesthetic[]>(
  `${api}/music-aesthetic`
);


const { data: vinyls } = await useFetch<Vinyl[]>(`${api}/vinyls`);
const { data: episodes } = await useFetch<ShowEpisode[]>(`${api}/episodes`);
const { data: aesthetics } = await useFetch<AestheticPost[]>(`${api}/aesthetics`);
const { data: creations } = await useFetch<Creation[]>(`${api}/creations`);
</script>

<template>
<nav class="sticky top-0 z-50 border-b border-black/5 bg-amber-50/70 backdrop-blur">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
    <NuxtLink to="/" class="text-sm font-extrabold tracking-wide text-zinc-900">
      BLOOMER
    </NuxtLink>

    <div class="flex flex-wrap gap-2">
      <a href="#vinyls" class="rounded-full px-3 py-1 text-xs font-semibold text-zinc-800 hover:bg-white/70">Vinyles</a>
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

    <!-- SECTION: VINYLS -->
    <section id="vinyls" class="mx-auto max-w-6xl px-6 py-10">
      <div class="flex items-end justify-between gap-6">
        <div>
          <h2 class="text-2xl font-bold">🎵 Vinyles & pochettes</h2>
          <p class="mt-2 text-zinc-700">
            Une vibe “Pinterest” : des pochettes qui donnent envie d’écouter un album en entier.
          </p>
        </div>
      </div>

      <div class="mt-7 columns-2 gap-4 sm:columns-3 lg:columns-4">
        <div
          v-for="v in (vinyls || [])"
          :key="v.id"
          class="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5"
        >
          <div class="aspect-[1/1] w-full bg-amber-100">
            <img
              v-if="v.coverUrl"
              :src="v.coverUrl"
              :alt="`${v.artist} - ${v.title}`"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="p-4">
            <p class="text-sm font-semibold">{{ v.title }}</p>
            <p class="text-sm text-zinc-600">{{ v.artist }} <span v-if="v.year">· {{ v.year }}</span></p>
            <p v-if="v.tags" class="mt-2 text-xs text-zinc-500"># {{ v.tags }}</p>
          </div>
        </div>

        <div v-if="!vinyls || vinyls.length === 0" class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5">
          Ajoute des vinyles via Prisma Studio pour remplir cette section.
        </div>
      </div>

      
    </section>

    <section id="albums" class="mx-auto max-w-6xl px-6 py-10">
  <h2 class="text-2xl font-bold">🎶 Albums cultes</h2>

  <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <div v-if="albumsPending" class="text-zinc-600">Chargement des albums…</div>

<div v-else-if="albumsError" class="text-red-700">
  Erreur albums : {{ albumsError.message }}
</div>

<div v-else class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <div
    v-for="album in (albums || [])"
    :key="album.id"
    class="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5"
  >
    <div class="aspect-square bg-amber-100 mb-3">
      <img
        v-if="album.coverUrl"
        :src="album.coverUrl"
        class="h-full w-full object-cover"
      />
    </div>
    <p class="text-sm font-bold">{{ album.title }}</p>
    <p class="text-sm text-zinc-600">{{ album.artist }}</p>
    <p class="text-xs text-zinc-500">{{ album.year }}</p>
    <p class="text-xs text-zinc-500">{{ album.genre }}</p>
  </div>

  <div v-if="(albums || []).length === 0" class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5">
    Aucun album en base pour l’instant.
  </div>
</div>

  </div>

  <section id="music-aesthetic" class="mx-auto max-w-6xl px-6 py-10">
  <h2 class="text-2xl font-bold">🎶 Aesthetic musique</h2>
  <p class="mt-2 max-w-2xl text-zinc-700">
    Murs de vinyles, collections, coins musique… l’objet et l’ambiance avant le son.
  </p>

  <div class="mt-7 columns-1 gap-4 sm:columns-2 lg:columns-3">
    <a
      v-for="m in (musicAesthetic || [])"
      :key="m.id"
      :href="m.sourceUrl"
      target="_blank"
      class="mb-4 block break-inside-avoid overflow-hidden rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 hover:bg-white"
    >
      <img :src="m.imageUrl" :alt="m.title || 'Music aesthetic'" class="w-full object-cover" loading="lazy" />
      <div class="p-4">
        <p v-if="m.title" class="text-sm font-semibold">{{ m.title }}</p>
        <p v-if="m.vibe" class="text-sm text-zinc-600">{{ m.vibe }}</p>
        <p v-if="m.tags" class="mt-2 text-xs text-zinc-500"># {{ m.tags }}</p>
      </div>
    </a>
  </div>
</section>

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
          Ajoute des épisodes (Simpsons/South Park) via Prisma Studio.
        </div>
      </div>
    </section>

    <section id="nostalgie" class="mx-auto max-w-6xl px-6 py-10">
  <h2 class="text-2xl font-bold">🕹️ Nostalgie générationnelle</h2>
  <p class="mt-2 max-w-2xl text-zinc-700">
    Des souvenirs qui reviennent d’un coup : DS, Wii, dessins animés, creepypastas, interfaces d’époque.
  </p>

  <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <div class="rounded-2xl bg-white/70 p-5 ring-1 ring-black/5 hover:bg-white">
      <p class="text-sm font-bold">Nintendo DS</p>
      <p class="mt-2 text-sm text-zinc-700">Les jeux que tu relançais 50 fois.</p>
    </div>

    <div class="rounded-2xl bg-white/70 p-5 ring-1 ring-black/5 hover:bg-white">
      <p class="text-sm font-bold">Wii</p>
      <p class="mt-2 text-sm text-zinc-700">Le fun simple, sans prise de tête.</p>
    </div>

    <div class="rounded-2xl bg-white/70 p-5 ring-1 ring-black/5 hover:bg-white">
      <p class="text-sm font-bold">Cartoons</p>
      <p class="mt-2 text-sm text-zinc-700">Des épisodes que tu connais par cœur.</p>
    </div>

    <div class="rounded-2xl bg-white/70 p-5 ring-1 ring-black/5 hover:bg-white">
      <p class="text-sm font-bold">Creepypastas</p>
      <p class="mt-2 text-sm text-zinc-700">La peur qui devient souvenir.</p>
    </div>
  </div>
</section>


    <!-- SECTION: AESTHETIC -->
    <section id="aesthetic" class="mx-auto max-w-6xl px-6 py-10">
      <h2 class="text-2xl font-bold">🌇 Aesthetic</h2>
      <p class="mt-2 max-w-2xl text-zinc-700">
        Images qui donnent envie de respirer : couchers de soleil, collections, ambiances “cozy”, vibes nerd.
      </p>

      <div class="mt-7 columns-1 gap-4 sm:columns-2 lg:columns-3">
        <figure
          v-for="a in (aesthetics || [])"
          :key="a.id"
          class="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5"
        >
          <div class="w-full bg-amber-100">
            <img :src="a.imageUrl" :alt="a.title || 'Aesthetic'" class="w-full object-cover" loading="lazy" />
          </div>
          <figcaption class="p-4">
            <p v-if="a.title" class="text-sm font-semibold">{{ a.title }}</p>
            <p v-if="a.vibe" class="text-sm text-zinc-600">{{ a.vibe }}</p>
            <p v-if="a.tags" class="mt-2 text-xs text-zinc-500"># {{ a.tags }}</p>
          </figcaption>
        </figure>

        <div v-if="!aesthetics || aesthetics.length === 0" class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5">
          Ajoute des images (URL) via Prisma Studio pour remplir la galerie.
        </div>
      </div>
    </section>

    <!-- SECTION: CREATIONS -->
    <section id="creations" class="mx-auto max-w-6xl px-6 py-12">
      <h2 class="text-2xl font-bold">🧱 Créations</h2>
      <p class="mt-2 max-w-2xl text-zinc-700">
        Des trucs faits par des gens : Lego, dessin, fan-art, DIY. Pas besoin de coûter un bras pour créer.
      </p>

      <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="c in (creations || [])"
          :key="c.id"
          class="overflow-hidden rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 hover:bg-white"
        >
          <div class="aspect-[4/3] bg-amber-100">
            <img v-if="c.imageUrl" :src="c.imageUrl" :alt="c.title" class="h-full w-full object-cover" loading="lazy" />
          </div>
          <div class="p-5">
            <div class="flex items-center justify-between gap-4">
              <p class="text-sm font-bold">{{ c.title }}</p>
              <span class="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                {{ c.type }}
              </span>
            </div>

            <p v-if="c.description" class="mt-3 text-sm text-zinc-700">
              {{ c.description }}
            </p>

            <p v-if="c.author" class="mt-3 text-xs text-zinc-600">
              par {{ c.author }}
            </p>

            <p v-if="c.tags" class="mt-2 text-xs text-zinc-500"># {{ c.tags }}</p>
          </div>
        </article>

        <div v-if="!creations || creations.length === 0" class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5">
          Ajoute des créations via Prisma Studio.
        </div>
      </div>

      <footer class="mt-14 rounded-2xl bg-white/60 p-6 text-zinc-700 ring-1 ring-black/5">
        <p class="text-sm">
          Le but n’est pas de “consommer plus”, mais de retrouver des choses qui marquent et donnent envie de vivre.
        </p>
      </footer>
    </section>
  </div>
</template>
