<script setup lang="ts">
import BloomerHeader from "~/components/BloomerHeader.vue";

type BloomerCard = {
  title: string;
  description: string;
  to: string;
  image: string;
};

const cards: BloomerCard[] = [
  {
    title: "DIY Creations",
    description: "Custom, peinture, broderie, objets faits main. Moodboard + focus modal.",
    to: "/bloomer/creations-diy",
    image: "/images/diy/cover.jpg",
  },
  {
    title: "Music Albums",
    description: "Albums cultes, repères, sélection. Une bibliothèque qui a du goût.",
    to: "/bloomer/music-albums",
    image: "/images/MusicAlbums/cover.jpg",
  },
  {
    title: "Lego Creation",
    description: "Créations LEGO, scènes, nostalgie, plaisir visuel.",
    to: "/bloomer/lego-creation",
    image: "/images/lego/cover.jpg",
  },
  {
    title: "Décoration musique",
    description: "Platines, vinyles, setups, coins musique — inspirations visuelles.",
    to: "/bloomer/decoration-music",
    image: "/images/MusicAesthetics/cover.jpg",
  },
  {
    title: "Show cultes",
    description: "Épisodes marquants, classements et capsules pop culture à conserver.",
    to: "/bloomer/show-cultes",
    image: "/images/shows/cover.jpg",
  },
];

const bloomerCover = "/images/BloomerCover.jpg";

const firstRow = computed(() => cards.slice(0, 3));
const secondRow = computed(() => cards.slice(3));
</script>

<template>
  
  <div class="min-h-screen bg-gradient-to-b from-amber-50 via-zinc-50 to-white text-zinc-900">
    <BloomerHeader />

    <!-- HERO (image + titre uniquement) -->
    <section class="relative">
      <div class="relative h-[520px] w-full overflow-hidden sm:h-[660px]">
        <img
          :src="bloomerCover"
          alt="Bloomer cover"
          class="h-full w-full object-cover"
          loading="eager"
        />

        <!-- overlays (léger, pour lisibilité du titre) -->
        <div class="absolute inset-0 bg-black/10"></div>

        <!-- fondu bas -->
        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 h-[260px] sm:h-[320px]
                 bg-gradient-to-b from-transparent via-amber-50/35 to-amber-50/90"
        />
        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 h-[140px] sm:h-[180px]
                 bg-gradient-to-b from-transparent via-amber-50/90 to-amber-50"
        />

        <!-- Titre only -->
        <div class="absolute inset-0">
          <div class="mx-auto flex h-full max-w-6xl items-end px-6 pb-14 pt-28 sm:pb-16">
            <div class="w-full">
              <p class="text-xs font-semibold tracking-[0.35em] text-zinc-900/80">
                BLOOMER
              </p>

              <h1 class="mt-4 text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
                Culture visuelle, nostalgie, <span class="text-amber-700">goût</span>.
              </h1>
            </div>
          </div>
        </div>
      </div>

      <!-- respiration -->
      <div class="h-10 sm:h-14 bg-amber-50"></div>
    </section>

    <!-- TEXTE ÉDITORIAL (en dessous, pleine largeur like cards) -->
    <section class="bg-amber-50">
      <div class="mx-auto max-w-6xl px-6 pb-10 sm:pb-12">
        <!-- sur desktop on peut étaler un peu la lecture sans faire “trou” -->
        <div class="grid gap-8 lg:grid-cols-12">
          <div class="lg:col-span-10">
            <p class="text-lg leading-relaxed text-zinc-900">
              Bloomer est un espace éditorial pensé pour
              <span class="font-bold">réenchanter le quotidien</span>.
              Dans un monde où tout est rapide, optimisé et immédiatement accessible,
              l’idée est de <span class="font-bold">ralentir volontairement</span>,
              et de redonner de la valeur au temps long et à l’attention.
            </p>

            <p class="mt-4 text-lg leading-relaxed text-zinc-900">
              Construire un objet, écouter un album en entier, observer une image,
              ou replonger dans une œuvre qui a marqué.
              Pas pour consommer plus, mais pour
              <span class="font-bold">ressentir davantage</span>,
              nourrir l’imaginaire et recréer un lien sensible avec ce qui nous entoure.
            </p>

            <p class="mt-4 text-lg leading-relaxed text-zinc-900">
              Même à <span class="font-bold">petite échelle</span>, ces gestes ont un impact réel :
              ils redonnent de la profondeur au quotidien, réhabilitent le plaisir de faire
              et rappellent que le monde peut encore être
              <span class="font-bold">habité, façonné et vécu</span>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CARDS -->
    <main class="mx-auto max-w-6xl px-6 pb-20 pt-8" >
      <!-- Row 1 -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="c in firstRow"
          :key="c.to"
          :to="c.to"
          class="group relative overflow-hidden rounded-3xl bg-white
                 shadow-[0_22px_40px_-28px_rgba(0,0,0,0.28)]
                 ring-1 ring-black/5 transition
                 hover:-translate-y-1 hover:scale-[1.03]"
        >
          <img
            :src="c.image"
            :alt="c.title"
            class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
            loading="lazy"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

          <div class="relative flex h-[320px] flex-col justify-end p-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-bold text-white">{{ c.title }}</h2>
              <span class="text-white">→</span>
            </div>

            <p class="mt-2 text-sm text-white/85 line-clamp-2">
              {{ c.description }}
            </p>

            <div class="mt-4 h-px w-10 bg-amber-300/80"></div>
          </div>
        </NuxtLink>
      </div>

      <!-- Row 2 -->
      <div class="mt-6 grid gap-6 lg:grid-cols-2">
        <NuxtLink
          v-for="c in secondRow"
          :key="c.to"
          :to="c.to"
          class="group relative overflow-hidden rounded-3xl bg-white
                 shadow-[0_22px_40px_-28px_rgba(0,0,0,0.28)]
                 ring-1 ring-black/5 transition
                 hover:-translate-y-1 hover:scale-[1.02]"
        >
          <img
            :src="c.image"
            :alt="c.title"
            class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
            loading="lazy"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

          <div class="relative flex h-[380px] flex-col justify-end p-7">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-extrabold text-white">{{ c.title }}</h2>
              <span class="text-white text-lg">→</span>
            </div>

            <p class="mt-2 text-base text-white/85 line-clamp-2">
              {{ c.description }}
            </p>

            <div class="mt-5 h-px w-14 bg-amber-300/80"></div>
          </div>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>
