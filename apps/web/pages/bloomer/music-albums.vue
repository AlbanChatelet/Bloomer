<script setup lang="ts">
const config = useRuntimeConfig()
const api = config.public.apiBase

type MusicAlbum = {
  id: string
  title: string
  artist: string
  year?: number | null
  genre: string
  region?: string | null
  coverUrl?: string | null
  coverImageUrl?: string | null
}

const {
  data: albums,
  pending: albumsPending,
  error: albumsError,
} = await useFetch<MusicAlbum[]>(`${api}/albums`)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-zinc-900">
    <header class="mx-auto max-w-6xl px-6 pt-14 pb-10">
      <NuxtLink to="/" class="text-sm font-bold text-zinc-600 hover:underline">
        ← Retour
      </NuxtLink>

      <h1 class="mt-4 text-4xl font-extrabold">
        🎶 Albums cultes
      </h1>
      <p class="mt-3 max-w-2xl text-zinc-700">
        Des albums qu’on écoute en entier. Des pochettes qui restent en tête.
      </p>
    </header>

    <section class="mx-auto max-w-6xl px-6 pb-20">
      <!-- Loading -->
      <div v-if="albumsPending" class="text-zinc-600">
        Chargement des albums…
      </div>

      <!-- Error -->
      <div v-else-if="albumsError" class="text-red-700">
        Erreur : {{ albumsError.message }}
      </div>

      <!-- Albums -->
      <div
        v-else
        class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div
          v-for="album in (albums || [])"
          :key="album.id"
          class="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5 hover:bg-white transition"
        >
          <!-- Image locale + lien wiki -->
          <component
            :is="album.coverUrl ? 'a' : 'div'"
            v-bind="
              album.coverUrl
                ? {
                    href: album.coverUrl,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {}
            "
            class="block"
          >
            <div class="aspect-square mb-3 overflow-hidden rounded-xl bg-zinc-100">
              <img
  v-if="album.coverImageUrl"
  :src="encodeURI(album.coverImageUrl)"
  :alt="`Pochette de ${album.title}`"
  class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
  loading="lazy"
/>

              <div
                v-else
                class="grid h-full w-full place-items-center text-xs text-zinc-500"
              >
                Pas d’image
              </div>
            </div>
          </component>

          <p class="text-sm font-bold">{{ album.title }}</p>
          <p class="text-sm text-zinc-600">{{ album.artist }}</p>
          <p class="text-xs text-zinc-500">
            {{ album.year }} · {{ album.genre }}
          </p>

          <a
            v-if="album.coverUrl"
            :href="album.coverUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2 inline-block text-xs font-medium text-blue-600 hover:underline"
          >
            Voir sur Wikipédia →
          </a>
        </div>

        <!-- Empty state -->
        <div
          v-if="albums && albums.length === 0"
          class="col-span-full rounded-2xl bg-white/60 p-6 text-zinc-700 ring-1 ring-black/5"
        >
          Aucun album pour le moment. Lance le seed ou ajoute-en via Prisma Studio.
        </div>
      </div>
    </section>
  </div>
</template>
