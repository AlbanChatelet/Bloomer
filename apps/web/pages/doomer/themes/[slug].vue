<script setup lang="ts">
const route = useRoute()

type Theme = {
  title: string
  slug: string
  hook: string
  note: string
  label: string
  image: string
}

const themes: Theme[] = [
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
console.log("THEME PAGE", route.params.slug)
const slug = computed(() => String(route.params.slug || ""))

const theme = computed(() => themes.find(t => t.slug === slug.value))

if (!theme.value) {
  throw createError({ statusCode: 404, statusMessage: "Thème introuvable" })
}

const index = computed(() => themes.findIndex(t => t.slug === slug.value))
const prev = computed(() => (index.value > 0 ? themes[index.value - 1] : null))
const next = computed(() => (index.value >= 0 && index.value < themes.length - 1 ? themes[index.value + 1] : null))

const blocks = computed(() => themeContent[slug.value] || [])

type ContentBlock =
  | { kind: "text"; title: string; paragraphs: string[] }
  | { kind: "list"; title: string; items: string[] }
  | { kind: "actions"; title: string; items: { title: string; desc: string }[] }
  | { kind: "quote"; text: string; author?: string }

const themeContent: Record<string, ContentBlock[]> = {
  desenchantement: [
    {
      kind: "text",
      title: "Ce que tu ressens",
      paragraphs: [
        "Tu connais déjà la fin avant d’avoir commencé.",
        "Tu vois les ficelles. Tu devines le marketing. Tu sais comment ça marche.",
        "Et à force de tout comprendre, le monde perd son épaisseur."
      ],
    },
    {
      kind: "text",
      title: "Le mécanisme",
      paragraphs: [
        "Le mystère, c’est un espace vide. Un endroit où l’imaginaire peut travailler.",
        "Quand tout est expliqué, commenté, optimisé, l’espace se referme.",
        "Le réel devient “plat” : il ne surprend plus, il informe."
      ],
    },
    {
      kind: "quote",
      text: "Quand tout est éclairé, il n’y a plus d’ombre pour rêver.",
    },
    {
      kind: "list",
      title: "Signaux typiques",
      items: [
        "Tu consommes du contenu mais rien ne reste.",
        "Tu cherches un frisson… et tu retombes vite.",
        "Tu veux être “impressionné”, mais tu te sens difficile.",
        "Même les nouveautés ressemblent à des remixes."
      ],
    },
    {
      kind: "text",
      title: "Ce que ça abîme",
      paragraphs: [
        "L’envie de s’engager.",
        "La capacité à s’émerveiller.",
        "Le goût du détail.",
        "Le sens du “sacré” (au sens large : ce qui dépasse l’utilité)."
      ],
    },
    {
      kind: "actions",
      title: "Micro-gestes pour rouvrir le mystère",
      items: [
        {
          title: "Laisser du non-savoir",
          desc: "Regarde/écoute sans chercher l’analyse. Pas de “making of”, pas de commentaires, pas de review.",
        },
        {
          title: "Ritualiser un moment",
          desc: "Même simple : lumière basse, musique, un objet. Le rituel recrée de la profondeur.",
        },
        {
          title: "Une activité lente",
          desc: "Marche, photo, dessin, cuisine. Le mystère revient quand le temps redevient épais.",
        },
        {
          title: "Collectionner un détail",
          desc: "Un son, une texture, un lieu, une odeur. Revenir au concret plutôt qu’au discours.",
        },
        {
          title: "Choisir une œuvre “opaque”",
          desc: "Quelque chose que tu ne comprends pas totalement. Laisse-le te résister.",
        },
      ],
    },
    {
      kind: "text",
      title: "Passer à la suite",
      paragraphs: [
        "Ce thème est la base.",
        "Ensuite, on comprend pourquoi le mystère disparaît encore plus vite avec la dopamine et le scroll."
      ],
    },
  ],
}
</script>

<template>
  <div class="min-h-screen bg-[#06060a] text-zinc-100">
    <header class="relative overflow-hidden border-b border-white/10">
      <div class="absolute inset-0">
        <div
          class="h-full w-full bg-cover bg-center"
          :style="{ backgroundImage: `url(${theme!.image})` }"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-fuchsia-500/15 via-transparent to-cyan-400/15"></div>
      </div>

      <div class="relative mx-auto max-w-6xl px-6 py-14">
        <div class="flex flex-wrap items-center gap-3">
          <NuxtLink to="/doomer" class="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold text-zinc-200 hover:bg-white/5">
            ← Retour DOOMER
          </NuxtLink>
          <span class="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-200">
            {{ theme!.label }}
          </span>
        </div>

        <h1 class="mt-6 text-4xl font-extrabold sm:text-5xl">{{ theme!.title }}</h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-zinc-200">{{ theme!.hook }}</p>
        <p class="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300">{{ theme!.note }}</p>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
  <div class="grid gap-6 lg:grid-cols-12">
    <!-- CONTENU -->
    <section class="lg:col-span-8 space-y-6">
      <div
        v-for="(b, i) in blocks"
        :key="i"
        class="rounded-3xl border border-white/10 bg-white/5 p-6"
      >
        <!-- TEXT -->
        <template v-if="b.kind === 'text'">
          <h2 class="text-lg font-extrabold">{{ b.title }}</h2>
          <div class="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
            <p v-for="(p, j) in b.paragraphs" :key="j">{{ p }}</p>
          </div>
          <div class="mt-5 h-[2px] w-12 bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-indigo-400"></div>
        </template>

        <!-- LIST -->
        <template v-else-if="b.kind === 'list'">
          <h2 class="text-lg font-extrabold">{{ b.title }}</h2>
          <ul class="mt-4 space-y-2 text-sm text-zinc-300">
            <li v-for="(it, j) in b.items" :key="j" class="flex gap-3">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300/70"></span>
              <span>{{ it }}</span>
            </li>
          </ul>
        </template>

        <!-- QUOTE -->
        <template v-else-if="b.kind === 'quote'">
          <p class="text-base font-semibold text-zinc-100 leading-relaxed">
            “{{ b.text }}”
          </p>
          <p v-if="b.author" class="mt-3 text-xs text-zinc-400">— {{ b.author }}</p>
        </template>

        <!-- ACTIONS -->
        <template v-else-if="b.kind === 'actions'">
          <h2 class="text-lg font-extrabold">{{ b.title }}</h2>
          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            <article
              v-for="(a, j) in b.items"
              :key="j"
              class="group rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:-translate-y-0.5 hover:bg-white/5"
            >
              <h3 class="text-sm font-bold text-zinc-100">{{ a.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-zinc-300">{{ a.desc }}</p>
              <div class="mt-4 h-[2px] w-10 bg-gradient-to-r from-cyan-300/70 to-transparent transition-all group-hover:w-16"></div>
            </article>
          </div>
        </template>
      </div>
    </section>

    <!-- SIDEBAR -->
    <aside class="lg:col-span-4 space-y-4">
      <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 class="text-sm font-extrabold">Navigation</h3>
        <div class="mt-4 flex flex-col gap-2">
          <NuxtLink
            v-if="prev"
            :to="`/doomer/themes/${prev.slug}`"
            class="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200 hover:bg-white/5"
          >
            ← {{ prev.title }}
          </NuxtLink>

          <NuxtLink
            v-if="next"
            :to="`/doomer/themes/${next.slug}`"
            class="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200 hover:bg-white/5"
          >
            {{ next.title }} →
          </NuxtLink>

          <NuxtLink
            to="/doomer"
            class="mt-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15"
          >
            Retour à DOOMER
          </NuxtLink>
        </div>
      </div>

      <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 class="text-sm font-extrabold">Pont vers BLOOMER</h3>
        <p class="mt-3 text-sm leading-relaxed text-zinc-300">
          Si tu veux du “relief” tout de suite : objets, images, créations, nostalgie.
        </p>
        <NuxtLink
          to="/bloomer"
          class="mt-4 inline-flex rounded-full bg-amber-200/10 px-4 py-2 text-sm font-semibold text-amber-100 hover:bg-amber-200/15"
        >
          Aller vers BLOOMER →
        </NuxtLink>
      </div>
    </aside>
  </div>
</main>
  </div>
</template>