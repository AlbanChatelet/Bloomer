<script setup lang="ts">
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
</script>

<template>
  <!-- NAV -->
  <nav class="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
      <NuxtLink to="/doomer" class="text-sm font-extrabold tracking-wide text-zinc-100">
        DOOMER
      </NuxtLink>

      <div class="flex gap-2">
        <a href="#themes" class="rounded-full px-3 py-1 text-xs font-semibold text-zinc-200 hover:bg-white/5">
          Thèmes
        </a>
        <a href="#reenchanter" class="rounded-full px-3 py-1 text-xs font-semibold text-zinc-200 hover:bg-white/5">
          Réenchanter
        </a>
        <NuxtLink to="/bloomer" class="rounded-full px-3 py-1 text-xs font-semibold text-amber-200 hover:bg-white/5">
          BLOOMER →
        </NuxtLink>
      </div>
    </div>
  </nav>

  <div class="min-h-screen bg-[#06060a] text-zinc-100">
    <!-- HERO -->
    <header class="mx-auto max-w-6xl px-6 pt-14 pb-10">
      <p class="text-xs tracking-wide text-zinc-400">DOOMER</p>
      <h1 class="mt-3 text-4xl font-extrabold sm:text-5xl">
        Le monde s’est <span class="text-zinc-300">aplati</span>.
      </h1>
      <p class="mt-5 max-w-2xl text-zinc-300">
        Tout est accessible. Tout est expliqué. Tout est optimisé.
        <span class="text-zinc-200">Et pourtant, quelque chose manque.</span>
      </p>
    </header>

    <!-- THEMES -->
    <section id="themes" class="mx-auto max-w-6xl px-6 py-10">
      <h2 class="text-2xl font-bold">Thèmes</h2>
      <p class="mt-2 max-w-2xl text-zinc-300">
        Six portes. Six angles. Même malaise de fond.
      </p>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="t in themes"
          :key="t.slug"
          :to="`/doomer/themes/${t.slug}`"
          class="group relative block h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-black transition hover:-translate-y-1"
        >
          <!-- IMAGE -->
          <div class="pointer-events-none absolute inset-0">
            <div
              class="h-full w-full bg-cover bg-center transition duration-700 group-hover:scale-110"
              :style="{ backgroundImage: `url(${t.image})` }"
            />
          </div>

          <!-- OVERLAY -->
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>

          <!-- CONTENT -->
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