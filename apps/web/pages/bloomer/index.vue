<script setup lang="ts">
import BloomerHeader from "~/components/BloomerHeader.vue"

type BloomerCard = {
  title: string
  description: string
  to: string
  image: string
}

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
    description: "Créations LEGO, scènes, nostalgia design, plaisir visuel.",
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
]

const bloomerPng = "/images/bloomer.png"
const bloomerCover = "/images/BloomerCover.png"
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-amber-50 via-zinc-50 to-white text-zinc-900">
    <BloomerHeader />

    <!-- PNG flottant -->
    <ClientOnly>
      <Teleport to="body">
        <img
          :src="bloomerPng"
          alt="Bloomer"
          class="
            fixed z-[99999] opacity-95 transition-all duration-500 ease-out drop-shadow-2xl
            bottom-0 right-4 w-[120px]
            sm:bottom-0 sm:right-6 sm:w-[180px]
            lg:bottom-0 lg:right-16 lg:w-[300px]
            lg:hover:scale-[1.20]
            lg:hover:drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)]
            animate-[float_6s_ease-in-out_infinite]
          "
        />
      </Teleport>
    </ClientOnly>

    <!-- HERO COVER FULL TOP -->
    <section class="relative">
      <!-- ✅ on peut aussi monter un peu la hauteur si tu veux encore + immersion -->
      <div class="relative h-[520px] w-full overflow-hidden sm:h-[660px]">
        <img
          :src="bloomerCover"
          alt="Bloomer cover"
          class="h-full w-full object-cover"
          loading="eager"
        />

        <!-- Lisibilité du texte (léger) -->
        <div class="absolute inset-0 bg-black/15"></div>

        <!-- ✅ FONDU PROGRESSIF (plus bas + plus doux) -->
        <!-- couche 1 : très longue, feather -->
        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 h-[260px] sm:h-[320px]
                 bg-gradient-to-b from-transparent via-amber-50/30 to-amber-50/80"
        ></div>

        <!-- couche 2 : finition pour matcher parfaitement le fond -->
        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 h-[140px] sm:h-[180px]
                 bg-gradient-to-b from-transparent via-amber-50/85 to-amber-50"
        ></div>

        <!-- Texte PAR-DESSUS -->
        <div class="absolute inset-0">
          <div class="mx-auto flex h-full max-w-6xl items-end px-6 pb-12 pt-24 sm:pb-14 sm:pt-28">
            <div class="max-w-2xl">
              <p class="text-xs font-semibold tracking-[0.35em] text-white/85 drop-shadow">
                BLOOMER
              </p>

              <h1 class="mt-4 text-4xl font-extrabold leading-tight text-white drop-shadow sm:text-5xl">
                Culture visuelle, nostalgie, <span class="text-amber-200">goût</span>.
              </h1>

              <p class="mt-5 text-base leading-relaxed text-white/90 drop-shadow">
                Un hub éditorial lumineux : tu choisis une section, tu explores. Une vibe chaude pour contraster avec DOOMER.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ✅ respiration + “fin” de fondu encore plus naturelle -->
      <!-- ce bloc prolonge le fondu dans la page -->
      <div class="h-10 sm:h-14 bg-amber-50"></div>
    </section>

    <!-- CARDS -->
    <main class="mx-auto max-w-6xl px-6 pb-20">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="c in cards"
          :key="c.to"
          :to="c.to"
          class="group relative overflow-hidden rounded-3xl bg-white shadow-[0_22px_40px_-28px_rgba(0,0,0,0.28)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_28px_55px_-34px_rgba(0,0,0,0.35)]"
        >
          <img
            :src="c.image"
            :alt="c.title"
            class="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.06]"
            loading="lazy"
          />

          <div class="absolute inset-0 bg-black/10"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

          <div class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <div class="absolute -inset-24 bg-[radial-gradient(circle,rgba(251,191,36,0.18),transparent_60%)]"></div>
          </div>

          <div class="relative flex h-[320px] flex-col justify-end p-6">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-lg font-bold tracking-wide text-white">
                {{ c.title }}
              </h2>

              <span
                class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition duration-300 group-hover:scale-105 group-hover:bg-white/15"
                aria-hidden="true"
              >
                →
              </span>
            </div>

            <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-white/85">
              {{ c.description }}
            </p>

            <div class="mt-4 h-px w-10 bg-amber-300/80 transition-all duration-300 group-hover:w-16"></div>
          </div>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0) }
  50% { transform: translateY(-6px) }
}
</style>
