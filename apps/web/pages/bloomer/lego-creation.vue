<script setup lang="ts">
const config = useRuntimeConfig();
const api = config.public.apiBase;
import BloomerFooter from "~/components/BloomerFooter.vue"
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

/** UI state */
const query = ref<string>("");
const selectedType = ref<string>("all");

/** Helpers */
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

const safeImage = (c: LegoCreation) => c.imageUrl || "/images/lego/cover.jpg";

/** Filter data */
const allCreations = computed(() => creations.value ?? []);

const availableTypes = computed(() => {
  const set = new Set<string>();
  for (const c of allCreations.value) set.add(prettyCategory(c.category) || "Autres");

  const order = ["Art", "Architecture", "Diorama", "Objet", "Jeu", "Autres"];
  const rest = [...set].filter((t) => !order.includes(t)).sort((a, b) => a.localeCompare(b));
  return [...order.filter((t) => set.has(t)), ...rest];
});

const typeCounts = computed(() => {
  const counts: Record<string, number> = {};
  for (const c of allCreations.value) {
    const key = prettyCategory(c.category) || "Autres";
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
});

const hasActiveFilters = computed(
  () => selectedType.value !== "all" || query.value.trim().length > 0
);

const clearFilters = () => {
  selectedType.value = "all";
  query.value = "";
};

const filteredCreations = computed(() => {
  const q = query.value.trim().toLowerCase();

  return allCreations.value.filter((c) => {
    const title = (c.title || "").toLowerCase();
    const type = (prettyCategory(c.category) || "Autres").toLowerCase();

    const matchesQuery = q.length === 0 ? true : title.includes(q) || type.includes(q);

    const matchesType =
      selectedType.value === "all"
        ? true
        : (prettyCategory(c.category) || "Autres") === selectedType.value;

    return matchesQuery && matchesType;
  });
});

/** Editorial carousel (right side) - autoplay only (no dots, no click) */
const heroSlides = [
  "/images/lego/lego.jpg",
  "/images/lego/lego2.jpg",
  "/images/lego/lego3.jpg",
  "/images/lego/lego4.jpg",
  "/images/lego/lego5.jpg",
];

const slideIndex = ref(0);

onMounted(() => {
  const id = window.setInterval(() => {
    slideIndex.value = (slideIndex.value + 1) % heroSlides.length;
  }, 3000);

  onBeforeUnmount(() => window.clearInterval(id));
});
</script>

<template>
  <div class="min-h-screen bg-[#E9DCC6] text-zinc-900">
    <BloomerHeader />

    <div class="pt-20 sm:pt-24">
      <!-- Hero -->
      <header class="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <p class="text-xs font-semibold tracking-[0.22em] text-zinc-600">
          BLOOMER • CRÉATIONS
        </p>

        <h1 class="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
          LEGO Ideas
          <span class="text-amber-700">pour réenchanter le quotidien</span>
        </h1>

        <p class="mt-4 max-w-2xl text-zinc-700">
          Une sélection de créations (dioramas, objets, architecture) choisies pour donner envie de faire,
          pas juste de regarder.
        </p>
      </header>

      <main class="mx-auto max-w-6xl px-6 pb-16">
        <!-- Editorial split (text + carousel) -->
        <section class="mb-12">
          <div class="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <!-- Text -->
            <article class="max-w-2xl">
              <h2 class="text-2xl font-extrabold text-zinc-900 sm:text-3xl">
                Retrouver l’enfance, mais en version adulte
              </h2>

              <p class="mt-5 text-base leading-relaxed text-zinc-700">
                Réenchanter le monde, c’est souvent <span class="font-bold text-zinc-900">réapprendre à voir autrement</span>.
                Avec LEGO, on revient à un geste simple : <span class="font-bold text-zinc-900">construire</span>.
                On n’est plus dans le “tout en deux clics” — on <span class="font-bold text-zinc-900">prend le temps</span>,
                on manipule, on teste, on corrige. Et c’est précisément ça qui change l’expérience :
                l’objet final n’est pas seulement beau, il est <span class="font-bold text-zinc-900">le résultat d’un processus</span>.
              </p>

              <p class="mt-4 text-base leading-relaxed text-zinc-700">
                Ces créations rappellent l’enfance parce qu’elles réveillent
                <span class="font-bold text-zinc-900">l’imaginaire</span> :
                un décor devient une histoire, un détail devient une scène, une construction devient un petit monde.
                Sauf qu’ici, ce “petit monde” existe <span class="font-bold text-zinc-900">physiquement</span> :
                il prend de la place sur une étagère, on le voit tous les jours, on le montre,
                et on ressent une <span class="font-bold text-zinc-900">fierté très concrète</span>.
              </p>

              <p class="mt-4 text-base leading-relaxed text-zinc-700">
                Cette page sert d’inspiration : tu peux explorer par type d’objet, chercher une création,
                et ouvrir la source pour voir le projet original. L’idée, c’est de donner envie de
                <span class="font-bold text-zinc-900">recréer</span>, <span class="font-bold text-zinc-900">modifier</span>,
                ou simplement <span class="font-bold text-zinc-900">se remettre à faire</span> avec ses mains —
                parce que c’est une des manières les plus directes de <span class="font-bold text-zinc-900">réenchanter sa vie</span>.
              </p>
            </article>

            <!-- Carousel: same visual height as article (desktop), responsive (mobile keeps ratio) -->
            <div class="relative overflow-hidden rounded-3xl ring-1 ring-black/5 shadow-sm">
              <!-- Mobile/tablet: ratio to avoid huge block.
                   Desktop: stretch to match article with min-height. -->
              <div class="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px]">
                <img
                  v-for="(src, i) in heroSlides"
                  :key="src"
                  :src="src"
                  :alt="`LEGO visuel ${i + 1}`"
                  class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                  :class="i === slideIndex ? 'opacity-100' : 'opacity-0'"
                  loading="lazy"
                />

                <div class="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <!-- States -->
        <div
          v-if="pending"
          class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5"
        >
          Chargement des créations…
        </div>

        <div
          v-else-if="error"
          class="rounded-2xl bg-red-50 p-5 text-red-800 ring-1 ring-red-200"
        >
          Erreur API : {{ error.message }}
        </div>

        <div v-else>
          <!-- Filter Bar -->
          <section class="mb-10">
            <div class="relative overflow-hidden rounded-3xl bg-white/60 ring-1 ring-black/5 shadow-sm backdrop-blur">
              <div class="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-300/25 blur-3xl" />
              <div class="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-300/20 blur-3xl" />

              <div class="relative p-4 sm:p-5">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 class="text-sm font-extrabold tracking-wide text-zinc-900">
                      Explorer
                    </h3>
                    <p class="mt-1 text-xs text-zinc-600">
                      Filtre par type d’objet et recherche par titre.
                    </p>
                  </div>

                  <button
                    v-if="hasActiveFilters"
                    type="button"
                    @click="clearFilters"
                    class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-800
                           ring-1 ring-black/10 hover:bg-amber-50 transition
                           focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  >
                    <span class="opacity-80">↺</span>
                    Réinitialiser
                  </button>
                </div>

                <!-- Search + stats -->
                <div class="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                  <div class="relative">
                    <div class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" aria-hidden="true">
                      <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <input
                      v-model="query"
                      type="text"
                      placeholder="Rechercher une création…"
                      class="w-full rounded-2xl bg-white/80 px-11 py-3.5 text-sm text-zinc-900
                             ring-1 ring-black/10 shadow-sm placeholder:text-zinc-400
                             focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    />

                    <button
                      v-if="query.trim().length"
                      type="button"
                      @click="query = ''"
                      class="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-xl
                             bg-white ring-1 ring-black/10 hover:bg-zinc-50 transition
                             focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                      aria-label="Effacer la recherche"
                    >
                      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </div>

                  <div class="flex items-center justify-between gap-2 md:justify-end">
                    <div class="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs text-zinc-700 ring-1 ring-black/10 shadow-sm">
                      <span class="font-semibold text-zinc-900">{{ filteredCreations.length }}</span>
                      <span>résultat<span v-if="filteredCreations.length > 1">s</span></span>
                    </div>
                  </div>
                </div>

                <!-- Type chips -->
                <div class="mt-4">
                  <div class="flex items-center justify-between">
                    <p class="text-xs font-semibold text-zinc-700">Types d’objet</p>
                    <p class="text-xs text-zinc-500">Clique pour filtrer</p>
                  </div>

                  <div class="mt-2 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
                    <button
                      type="button"
                      @click="selectedType = 'all'"
                      class="shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition
                             ring-1 ring-black/10
                             focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                      :class="selectedType === 'all'
                        ? 'bg-zinc-900 text-white shadow-sm'
                        : 'bg-white/80 text-zinc-800 hover:bg-white'"
                    >
                      Tout
                      <span class="ml-2 rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-extrabold text-zinc-700">
                        {{ allCreations.length }}
                      </span>
                    </button>

                    <button
                      v-for="t in availableTypes"
                      :key="t"
                      type="button"
                      @click="selectedType = t"
                      class="shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition
                             ring-1 ring-black/10
                             focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                      :class="selectedType === t
                        ? 'bg-amber-500/90 text-zinc-900 shadow-sm'
                        : 'bg-white/80 text-zinc-800 hover:bg-white'"
                      :title="t"
                    >
                      {{ t }}
                      <span class="ml-2 rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-extrabold text-zinc-700">
                        {{ typeCounts[t] ?? 0 }}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Top row -->
          <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <p class="text-sm text-zinc-600">
              <span class="font-semibold text-zinc-900">{{ filteredCreations.length }}</span>
              création<span v-if="filteredCreations.length > 1">s</span>
              <span v-if="hasActiveFilters" class="text-zinc-500"> (filtré)</span>
            </p>

            <a
              href="https://beta.ideas.lego.com/product-ideas"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white
                     transition hover:bg-zinc-800
                     focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
            >
              Parcourir LEGO Ideas
              <span class="opacity-90">↗</span>
            </a>
          </div>

          <!-- Empty results -->
          <div
            v-if="filteredCreations.length === 0"
            class="rounded-2xl bg-white/60 p-6 ring-1 ring-black/5"
          >
            <p class="text-zinc-800 font-semibold">Aucun résultat.</p>
            <p class="mt-1 text-sm text-zinc-600">
              Essaie un autre mot-clé ou repasse sur “Tout”.
            </p>
          </div>

          <!-- Cards -->
          <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <component
              v-for="c in filteredCreations"
              :key="c.id"
              :is="'a'"
              :href="c.sourceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group block focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <article
                class="relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5
                       transition-transform duration-300 ease-out
                       hover:scale-[1.03] hover:shadow-xl"
              >
                <div class="relative aspect-[16/11] w-full">
                  <img
                    :src="safeImage(c)"
                    :alt="c.title"
                    class="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />

                  <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  <div class="absolute left-4 top-4 right-4 flex items-start justify-between gap-2">
                    <span
                      v-if="c.category"
                      class="inline-flex items-center justify-center rounded-full bg-white/85 px-3 h-10 text-[11px] font-semibold text-zinc-900 ring-1 ring-black/10"
                    >
                      {{ prettyCategory(c.category) }}
                    </span>

                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur
                             transition-all duration-300 ease-out
                             group-hover:-translate-y-1 group-hover:scale-110"
                      aria-hidden="true"
                      title="Ouvrir la création"
                    >
                      <span class="text-lg text-white">↗</span>
                    </div>
                  </div>

                  <div class="absolute inset-x-0 bottom-0 p-4">
                    <h2 class="text-base font-extrabold leading-snug text-white drop-shadow">
                      {{ c.title }}
                    </h2>
                  </div>
                </div>

                <div
                  class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5 transition group-hover:ring-amber-300/60"
                />
              </article>
            </component>

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
  </div>
  <BloomerFooter />
</template>
