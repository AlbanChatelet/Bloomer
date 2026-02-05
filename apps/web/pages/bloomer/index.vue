<script setup lang="ts">
import BloomerHeader from "~/components/BloomerHeader.vue"
import BloomerFooter from "~/components/BloomerFooter.vue"
type BloomerCard = {
  title: string
  description: string
  to: string
  image: string
}

const cards: BloomerCard[] = [
  {
    title: "Créations DIY",
    description: "Custom, peinture, broderie, objets faits main.",
    to: "/bloomer/creations-diy",
    image: "/images/diy/cover.jpg",
  },
  {
    title: "Albums cultes",
    description: "Albums cultes, repères, sélection. Une bibliothèque qui a du goût.",
    to: "/bloomer/music-albums",
    image: "/images/MusicAlbums/cover.jpg",
  },
  {
    title: "Créations en LEGO",
    description: "Créations LEGO, scènes, nostalgie, plaisir visuel.",
    to: "/bloomer/lego-creation",
    image: "/images/lego/cover.jpg",
  },
  {
    title: "Décoration & musique",
    description: "Platines, vinyles, setups, coins musique — inspirations visuelles.",
    to: "/bloomer/decoration-music",
    image: "/images/MusicAesthetics/cover.jpg",
  },
  {
    title: "Shows cultes",
    description: "Épisodes marquants, classements et capsules pop culture à conserver.",
    to: "/bloomer/show-cultes",
    image: "/images/shows/cover.jpg",
  },
]

const bloomerCover = "/images/BloomerCover.jpg"

const firstRow = computed(() => cards.slice(0, 3))
const secondRow = computed(() => cards.slice(3))
</script>

<template>
  <div class="min-h-screen bg-[#E9DCC6] text-zinc-900">
    <BloomerHeader />

    <!-- HERO -->
    <section class="relative">
      <div class="relative h-[520px] w-full overflow-hidden sm:h-[660px]">
        <img
          :src="bloomerCover"
          alt="Bloomer cover"
          class="h-full w-full object-cover scale-[1.03] blur-[3px]"
          loading="eager"
        />

        <!-- overlay lisibilité -->
        <div class="absolute inset-0 bg-black/10"></div>

        <!-- fondu bas -->
        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 h-[260px] sm:h-[320px]
                 bg-gradient-to-b from-transparent via-[#E9DCC6]/60 to-[#E9DCC6]"
        />

        <!-- Titre -->
        <div class="absolute inset-0">
          <div class="mx-auto flex h-full max-w-6xl items-end px-6 pb-14 pt-28 sm:pb-16">
            <div class="w-full">
              <p class="text-xs font-semibold tracking-[0.35em] text-zinc-900/80">
                BLOOMER
              </p>

              <h1 class="mt-4 text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
                Culture visuelle, nostalgie, <span class="text-amber-700">goût</span>.
              </h1>

              <!-- INTRO COURTE DANS LE HERO -->
              <p class="mt-5 max-w-3xl text-base leading-relaxed text-zinc-900/80 sm:text-lg">
                Là où DOOMER décrit ce qui éteint, BLOOMER rassemble ce qui rallume :
                <span class="em">des images</span>, <span class="em">des objets</span>,
                <span class="em">des passions</span> et des gestes simples.
                Pas pour “optimiser” ta vie — pour la <span class="em">ressentir</span> davantage.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="h-10 sm:h-14 bg-[#E9DCC6]"></div>
    </section>

    <!-- TEXTE 1 (AVANT CARDS) -->
    <section class="bg-[#E9DCC6]">
      <div class="mx-auto max-w-6xl px-6 pb-10 sm:pb-12">
        <div class="grid gap-8 lg:grid-cols-12">
          <div class="lg:col-span-10">
            <p class="text-lg leading-relaxed">
              Bloomer est un espace éditorial pensé pour
              <span class="em">réenchanter le quotidien</span> à petite échelle.
              Quand tout va trop vite, on revient à ce qui a du poids :
              <span class="em">le temps long</span>, la matière, l’attention.
            </p>

            <p class="mt-4 text-lg leading-relaxed">
              Construire un objet, terminer un album, collectionner des images,
              soigner un coin de déco…
              Ces choses semblent “inutiles” — et c’est justement pour ça qu’elles sont
              <span class="em">vitales</span>.
            </p>

            <p class="mt-4 text-lg leading-relaxed">
              Ici, tu ne scrolles pas pour oublier. Tu explores pour
              <span class="em">te rappeler</span> : ce que tu aimes, ce qui te calme,
              ce qui te fait dire “ok… ça, c’est beau”.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CARDS -->
    <main class="mx-auto max-w-6xl px-6 pb-14 pt-6">
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
          />

          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

          <div class="relative flex h-[320px] flex-col justify-end p-6">
            <h2 class="text-lg font-bold text-white">{{ c.title }}</h2>
            <p class="mt-2 text-sm text-white/85 line-clamp-2">
              {{ c.description }}
            </p>

            <!-- mini underline qui se dessine -->
            <div class="mt-4 h-[2px] w-0 bg-amber-200/90 transition-all duration-500 group-hover:w-14"></div>
          </div>
        </NuxtLink>
      </div>

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
          />

          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

          <div class="relative flex h-[380px] flex-col justify-end p-7">
            <h2 class="text-xl font-extrabold text-white">{{ c.title }}</h2>
            <p class="mt-2 text-base text-white/85 line-clamp-2">
              {{ c.description }}
            </p>

            <div class="mt-4 h-[2px] w-0 bg-amber-200/90 transition-all duration-500 group-hover:w-16"></div>
          </div>
        </NuxtLink>
      </div>
    </main>

    <!-- TEXTE 2 (APRES THEMES) -->
    <section class="bg-[#E9DCC6]">
      <div class="mx-auto max-w-6xl px-6 pb-20">
        <div class="grid gap-8 lg:grid-cols-12">
          <div class="lg:col-span-10">
            <p class="text-lg leading-relaxed">
              BLOOMER, c’est une réponse douce : au lieu d’ajouter du bruit,
              on choisit <span class="em">des repères</span>.
              Une image qui reste. Un objet qui raconte. Une musique qui te suit.
            </p>

            <p class="mt-4 text-lg leading-relaxed">
              Et surtout : le droit de faire des choses
              <span class="em">pas parfaites</span>.
              Le but n’est pas d’être “instagrammable”, mais de fabriquer du réel,
              avec tes goûts, tes erreurs, tes obsessions.
            </p>

            <p class="mt-4 text-lg leading-relaxed">
              Si DOOMER pose le diagnostic, BLOOMER propose une direction :
              <span class="em">réapprendre à aimer</span> ce qui prend du temps.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <BloomerFooter />
</template>

<style scoped>
/* mots en "gras" stylé */
.em {
  font-weight: 800;
  color: rgba(39, 39, 42, 0.95);
  text-shadow: 0 0 18px rgba(180, 83, 9, 0.12);
}
</style>
