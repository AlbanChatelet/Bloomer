<script setup lang="ts">
const config = useRuntimeConfig();
const api = config.public.apiBase;

type LegoCreation = {
  id: string;
  title: string;
  imageUrl?: string | null;
  sourceUrl: string;
  category?: string | null;
  tags?: string | null;
};

const { data: creations, pending, error } = await useFetch<LegoCreation[]>(
  `${api}/lego-creations`
);

// petits helpers d’affichage
const prettyCategory = (c?: string | null) => {
  if (!c) return null;
  const map: Record<string, string> = {
    art: "Art",
    architecture: "Architecture",
    game: "Jeu",
    diorama: "Diorama",
    object: "Objet",
  };
  return map[c] ?? c;
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-zinc-900">
    <nav class="sticky top-0 z-50 border-b border-black/5 bg-amber-50/70 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <NuxtLink to="/" class="text-sm font-extrabold tracking-wide text-zinc-900">
          BLOOMER
        </NuxtLink>

        <div class="flex items-center gap-2">
          <NuxtLink
            to="/bloomer"
            class="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-800 hover:bg-white"
          >
            Retour Bloomer
          </NuxtLink>
        </div>
      </div>
    </nav>

    <header class="mx-auto max-w-6xl px-6 pt-12 pb-8">
      <p class="text-sm tracking-wide text-zinc-600">CRÉATIONS DIY</p>
      <h1 class="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
        LEGO Ideas <span class="text-amber-700">inspiration</span>
      </h1>
      <p class="mt-4 max-w-2xl text-zinc-700">
        Des créations de la communauté : dioramas, objets, architecture… juste de la créativité, pas du scroll infini.
      </p>
    </header>

    <main class="mx-auto max-w-6xl px-6 pb-16">
      <div v-if="pending" class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5">
        Chargement des créations…
      </div>

      <div v-else-if="error" class="rounded-2xl bg-red-50 p-5 text-red-800 ring-1 ring-red-200">
        Erreur API : {{ error.message }}
      </div>

      <div v-else>
        <div class="mb-6 flex items-end justify-between gap-6">
          <p class="text-sm text-zinc-600">
            {{ (creations || []).length }} créations
          </p>

          <a
            href="https://beta.ideas.lego.com/product-ideas"
            target="_blank"
            class="rounded-full bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
          >
            Parcourir LEGO Ideas →
          </a>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="c in (creations || [])"
            :key="c.id"
            class="overflow-hidden rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 hover:bg-white"
          >
            <div class="aspect-[4/3] bg-amber-100">
              <img
                v-if="c.imageUrl"
                :src="c.imageUrl"
                :alt="c.title"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div class="p-5">
              <div class="flex items-start justify-between gap-4">
                <h2 class="text-base font-bold leading-snug">
                  {{ c.title }}
                </h2>

                <span
                  v-if="c.category"
                  class="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900"
                >
                  {{ prettyCategory(c.category) }}
                </span>
              </div>

              <p v-if="c.tags" class="mt-2 text-xs text-zinc-500">
                # {{ c.tags }}
              </p>

              <a
                :href="c.sourceUrl"
                target="_blank"
                class="mt-4 inline-block text-sm font-semibold text-amber-800 hover:underline"
              >
                Voir la création →
              </a>
            </div>
          </article>

          <div
            v-if="(creations || []).length === 0"
            class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5"
          >
            Aucune création en base. Relance le seed LEGO.
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
