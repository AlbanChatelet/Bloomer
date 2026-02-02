<script setup lang="ts">
import { joinURL } from "ufo"
import DoomerHeader from "~/components/DoomerHeader.vue"

type DoomerTheme = {
  title: string
  slug: string
  hook: string
  note: string
  label: string
  image: string
}

const themes: DoomerTheme[] = [
  {
    title: "Désenchantement & mystère perdu",
    slug: "desenchantement",
    hook: "Quand tout s’explique, le monde se vide.",
    note: "Le réel devient plat : plus de zones floues, moins de fascination.",
    label: "Fondation",
    image: "/doomer/images/monde_plat.jpg",
  },
  {
    title: "Dopamine, scroll & saturation",
    slug: "dopamine-scroll",
    hook: "Trop d’images. Trop d’émotions. Rien ne reste.",
    note: "Le cerveau s’épuise, l’attention se fragmente, l’imaginaire se ferme.",
    label: "Système",
    image: "/doomer/images/scrolling_addiction.jpg",
  },
  {
    title: "Décors froids & environnements sans âme",
    slug: "decors-froids",
    hook: "Le décor influence l’âme.",
    note: "Neutralité partout : le monde ressemble à une interface.",
    label: "Espace",
    image: "/doomer/images/decors_froids.jpg",
  },
  {
    title: "Virtuel infini vs réel limité",
    slug: "virtuel-vs-reel",
    hook: "Ton écran est immense. Ta vie paraît petite.",
    note: "Voir toutes les vies sans bouger crée un décalage frustrant.",
    label: "Décalage",
    image: "/doomer/images/virtuel_infini.jpg",
  },
  {
    title: "Perte de sens & fin des grands récits",
    slug: "perte-de-sens",
    hook: "On avance, mais vers quoi ?",
    note: "Moins de transcendance, plus d’optimisation : le quotidien devient sec.",
    label: "Existence",
    image: "/doomer/images/grand_recit.jpg",
  },
  {
    title: "Réenchanter son quotidien",
    slug: "reenchanter",
    hook: "Pas de miracle. Des gestes de résistance.",
    note: "Ennui, effort, mains, nature, imaginaire : redonner du relief au réel.",
    label: "Sortie",
    image: "/doomer/images/nature.jpg",
  },
]

const exits = [
  { title: "Apprendre à s’ennuyer", desc: "Laisser du silence. L’esprit recommence à fabriquer." },
  { title: "Privilégier l’effort", desc: "Cuisiner, réparer, marcher. Ce qui coûte un peu rend le monde plus dense." },
  { title: "Créer avec ses mains", desc: "Pas pour être parfait. Pour matérialiser quelque chose qui vient de toi." },
  { title: "Revenir au réel", desc: "Sortir sans écouteurs parfois. Se remettre dans le décor." },
  { title: "Nourrir l’imaginaire", desc: "Lire, jouer, apprendre sans objectif d’optimisation. L’inutile est vital." },
]

// PNG doomer (safe baseURL)
const config = useRuntimeConfig()
const doomerPng = computed(() => joinURL(config.app.baseURL, "images/doomer.png"))
</script>

<template>
  <!-- NAV ONLY -->
  <DoomerHeader />

  <div class="relative min-h-screen bg-[#06060a] text-zinc-100 overflow-hidden">
    <!-- OVERLAY GLOBAL (violet/cyan + grain) -->
    <div class="pointer-events-none fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-400/10"></div>
      <div class="absolute inset-0 opacity-[0.06] mix-blend-overlay grain"></div>

      <!-- Accents globaux -->
      <div class="absolute -top-24 left-1/2 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl"></div>
      <div class="absolute bottom-[-12rem] right-[-8rem] h-[26rem] w-[26rem] rounded-full bg-indigo-500/10 blur-3xl"></div>
      <div class="absolute bottom-[-10rem] left-[-10rem] h-[22rem] w-[22rem] rounded-full bg-fuchsia-500/10 blur-3xl"></div>
    </div>

    <!-- HERO IMAGE + TEXTE (comme ton screen) -->
    <section class="relative h-[70vh] w-full overflow-hidden">
      <!-- Image de fond -->
      <div
  class="
    absolute inset-0 bg-cover

    /* mobile : on part de la gauche de l’image */
    bg-left

    /* tablet+ : image centrée */
    sm:bg-center
  "
  style="background-image: url('/doomer/images/doomerhead.jpg')"
></div>


      <!-- Dégradé lisibilité + fondu -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-[#06060a]"></div>

      <!-- Contenu -->
      <div class="relative z-10 mx-auto max-w-6xl px-6 pt-28">
        <p class="text-xs tracking-wide text-zinc-400">DOOMER</p>

        <h1 class="mt-3 text-4xl font-extrabold sm:text-5xl">
          Le monde s’est <span class="text-zinc-300">aplati</span>.
        </h1>

        <p class="mt-5 max-w-2xl text-zinc-300">
          Tout est accessible. Tout est expliqué. Tout est optimisé.
          <span class="text-zinc-200">Et pourtant, quelque chose manque.</span>
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a
            href="#themes"
            class="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
          >
            Commencer →
          </a>

          <a
            href="#reenchanter"
            class="rounded-full bg-black/30 px-5 py-2.5 text-sm font-semibold text-zinc-200 hover:bg-white/10"
          >
            Aller aux sorties ↓
          </a>
        </div>
      </div>
    </section>

    <!-- DOOMER PNG -->
    <ClientOnly>
  <Teleport to="body">
    <img
      :src="doomerPng"
      alt="Doomer"
      class="
        fixed z-[99999] opacity-95 transition-all duration-500 ease-out drop-shadow-2xl

        /* mobile */
        bottom-0 right-4 w-[120px]

        /* tablet */
        sm:bottom-0 sm:right-6 sm:w-[180px]

        /* desktop */
        lg:bottom-0 lg:right-16 lg:w-[300px]
        lg:hover:scale-[1.20]
        lg:hover:drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)]
      "
    />
  </Teleport>
</ClientOnly>


    <!-- THEMES -->
    <section id="themes" class="mx-auto max-w-6xl px-6 py-2 md:py-10">
      <h2 class="text-2xl font-bold">Thèmes</h2>
      <p class="mt-2 max-w-2xl text-zinc-300">
        Six portes. Six angles. Même malaise de fond.
      </p>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="t in themes"
          :key="t.slug"
          :to="`/doomer/themes/${t.slug}`"
          class="group relative block h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-black/30 transition hover:-translate-y-1"
        >
          <div class="absolute inset-0">
            <div
              class="h-full w-full bg-cover bg-center transition duration-700 group-hover:scale-110"
              :style="{ backgroundImage: `url(${t.image})` }"
            />
          </div>

          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>

          <div class="relative z-10 flex h-full flex-col justify-end p-6">
            <span class="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-200">
              {{ t.label }}
            </span>
            <h3 class="text-xl font-extrabold">{{ t.title }}</h3>

            <div class="mt-2 opacity-0 transition group-hover:opacity-100">
              <p class="text-sm font-semibold text-fuchsia-200">
                {{ t.hook }}
              </p>
              <p class="mt-1 text-sm text-zinc-300">
                {{ t.note }}
              </p>
            </div>

            <span class="mt-4 text-sm font-semibold text-cyan-300">
              Entrer →
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- REENCHANTER -->
    <section id="reenchanter" class="mx-auto max-w-6xl px-6 py-10">
      <h2 class="text-2xl font-bold">Réenchanter</h2>
      <p class="mt-2 max-w-2xl text-zinc-300">
        Pas des solutions miracles. Des gestes simples.
      </p>

      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="e in exits"
          :key="e.title"
          class="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <h3 class="font-bold">{{ e.title }}</h3>
          <p class="mt-2 text-sm text-zinc-300">{{ e.desc }}</p>
        </article>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="mx-auto max-w-6xl px-6 py-12">
      <p class="text-sm text-zinc-400">
        DOOMER est un espace éditorial.
        En cas de détresse grave, contacte un proche ou les services d’urgence.
      </p>
    </footer>
  </div>
</template>

<style scoped>
.grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
}
</style>
