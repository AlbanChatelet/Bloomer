<script setup lang="ts">
import BloomerHeader from "~/components/BloomerHeader.vue";
import BloomerFooter from "~/components/BloomerFooter.vue"
const config = useRuntimeConfig();
const api = config.public.apiBase;

type MusicAlbum = {
  id: string;
  title: string;
  artist: string;
  year?: number | null;
  genre: string;
  region?: string | null;
  coverUrl?: string | null;
  coverImageUrl?: string | null;
};

const {
  data: albums,
  pending: albumsPending,
  error: albumsError,
} = await useFetch<MusicAlbum[]>(`${api}/albums`);

/** UI state */
const query = ref("");
const selectedGenre = ref("all");
const sortMode = ref<"new" | "old">("new");

/** Derived */
const allAlbums = computed(() => albums.value ?? []);

/** Build unique genres from DB */
const genres = computed(() => {
  const set = new Set<string>();
  for (const a of allAlbums.value) {
    const g = (a.genre || "").trim();
    if (g) set.add(g);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
});

const hasActiveFilters = computed(
  () => selectedGenre.value !== "all" || query.value.trim().length > 0 || sortMode.value !== "new"
);

const clearFilters = () => {
  selectedGenre.value = "all";
  query.value = "";
  sortMode.value = "new";
};

/**
 * ✅ PRETTY GENRE
 * - gère les codes: pop_us, rap_fr, variete_fr, hiphop, electro, fr, etc.
 * - fallback intelligent si non présent dans la map
 */
const GENRE_LABELS: Record<string, string> = {
  // Rap / Hip-hop
  rap_us: "Rap américain",
  rap_fr: "Rap français",
  hiphop: "Hip-hop",
  hip_hop: "Hip-hop",

  // Pop
  pop_us: "Pop américaine",
  pop_fr: "Pop française",
  pop: "Pop",

  // Variété
  variete_fr: "Variété française",
  variete: "Variété",

  // Rock
  rock: "Rock",
  rock_us: "Rock américain",
  rock_fr: "Rock français",

  // Electronic
  electro: "Musique électronique",
  electronic: "Musique électronique",

  // Others common
  jazz: "Jazz",
  rnb: "R&B",
  soul: "Soul",
  metal: "Metal",
  alternative: "Alternative",
  indie: "Indie",
  classical: "Classique",

  // Regions / scenes (si tu t’en sers comme “genre”)
  fr: "Variété française",
  france: "Variété française",
  us: "Pop américaine",
  usa: "Pop américaine",
  africa: "Scène africaine",
  asia: "Scène asiatique",
};

const toTitleCase = (s: string) =>
  s
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const prettyGenre = (raw: string) => {
  const g = (raw || "").trim();
  if (!g) return "Autre";

  const key = g.toLowerCase();
  if (GENRE_LABELS[key]) return GENRE_LABELS[key];

  // fallback intelligent: "pop_us" -> "Pop américaine"
  // 1) normalise separators
  const normalized = key.replace(/[-\s]+/g, "_");

  // 2) pattern *_us / *_fr
  const match = normalized.match(/^(.+?)_(us|usa|fr|uk|br|de|es|it)$/);
  if (match) {
    const base = match[1];
    const region = match[2];

    const baseLabel = toTitleCase(base.replace(/_/g, " "));
    const regionLabel: Record<string, string> = {
      us: "américaine",
      usa: "américaine",
      fr: "française",
      uk: "britannique",
      br: "brésilienne",
      de: "allemande",
      es: "espagnole",
      it: "italienne",
    };

    return `${baseLabel} ${regionLabel[region] ?? ""}`.trim();
  }

  // 3) fallback general: "drill" -> "Drill", "cloud_rap" -> "Cloud Rap"
  return toTitleCase(normalized.replace(/_/g, " "));
};

const filteredSortedAlbums = computed(() => {
  const q = query.value.trim().toLowerCase();

  const filtered = allAlbums.value.filter((a) => {
    const matchesGenre = selectedGenre.value === "all" ? true : a.genre === selectedGenre.value;

    const title = (a.title || "").toLowerCase();
    const artist = (a.artist || "").toLowerCase();
    const genre = (a.genre || "").toLowerCase();

    const matchesQuery =
      q.length === 0 ? true : title.includes(q) || artist.includes(q) || genre.includes(q);

    return matchesGenre && matchesQuery;
  });

  filtered.sort((a, b) => {
    const ya = a.year ?? -9999;
    const yb = b.year ?? -9999;
    return sortMode.value === "new" ? yb - ya : ya - yb;
  });

  return filtered;
});

const safeCover = (a: MusicAlbum) =>
  a.coverImageUrl ? encodeURI(a.coverImageUrl) : "/images/MusicAlbums/cover.jpg";
</script>

<template>
  <div class="min-h-screen bg-[#E9DCC6] text-zinc-900">
    <BloomerHeader />

    <div class="pt-20 sm:pt-24">
      <!-- Intro -->
      <header class="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <p class="text-xs font-semibold tracking-[0.22em] text-zinc-600">
          BLOOMER • ALBUMS
        </p>

        <h1 class="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
          Albums
          <span class="text-amber-700">cultes à découvrir</span>
        </h1>

        <p class="mt-4 max-w-2xl text-zinc-700">
          Ici, des albums musicaux qui s'écoutent en profondeur. Des classiques intemporels, qui ont marqué leur époque et continuent d'influencer la culture musicale.
        </p>
      </header>

      <main class="mx-auto max-w-6xl px-6 pb-16">
        <!-- States -->
        <div
          v-if="albumsPending"
          class="rounded-2xl bg-white/60 p-5 text-zinc-700 ring-1 ring-black/5"
        >
          Chargement des albums…
        </div>

        <div
          v-else-if="albumsError"
          class="rounded-2xl bg-red-50 p-5 text-red-800 ring-1 ring-red-200"
        >
          Impossible de récupérer la liste pour le moment.
          <span class="block text-sm text-red-700/90 mt-1">
            Détail : {{ albumsError.message }}
          </span>
        </div>

        <div v-else>
          <!-- Filter bar -->
          <section class="mb-10">
            <div class="rounded-3xl bg-white/60 p-5 ring-1 ring-black/5 shadow-sm backdrop-blur">
              <div class="grid gap-4 md:grid-cols-3 md:items-center">
                <!-- Search -->
                <input
                  v-model="query"
                  type="text"
                  placeholder="Chercher un album, un artiste…"
                  class="rounded-2xl bg-white/80 px-4 py-3 text-sm
                         ring-1 ring-black/10 shadow-sm
                         placeholder:text-zinc-400
                         focus:outline-none focus:ring-0"
                />

                <!-- Genre select -->
                <select
                  v-model="selectedGenre"
                  class="rounded-2xl bg-white/80 px-4 py-3 text-sm
                         ring-1 ring-black/10 shadow-sm
                         focus:outline-none focus:ring-0"
                >
                  <option value="all">Tous les genres</option>
                  <option v-for="g in genres" :key="g" :value="g">
                    {{ prettyGenre(g) }}
                  </option>
                </select>

                <!-- Sort -->
                <div class="flex items-center gap-3">
                  <span class="text-xs font-semibold text-zinc-700">Tri</span>

                  <div class="inline-flex rounded-full bg-white ring-1 ring-black/10 p-1 shadow-sm">
                    <button
                      type="button"
                      @click="sortMode = 'new'"
                      class="rounded-full px-4 py-2 text-xs font-semibold transition
                             focus:outline-none focus:ring-0"
                      :class="sortMode === 'new' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-50'"
                    >
                      Plus récents
                    </button>

                    <button
                      type="button"
                      @click="sortMode = 'old'"
                      class="rounded-full px-4 py-2 text-xs font-semibold transition
                             focus:outline-none focus:ring-0"
                      :class="sortMode === 'old' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-50'"
                    >
                      Plus anciens
                    </button>
                  </div>
                </div>
              </div>

              <div class="mt-4 flex items-center justify-between">
                <div class="text-xs text-zinc-600">
                  <span class="font-semibold text-zinc-900">{{ filteredSortedAlbums.length }}</span>
                  album<span v-if="filteredSortedAlbums.length > 1">s</span>
                </div>

                <button
                  v-if="hasActiveFilters"
                  type="button"
                  @click="clearFilters"
                  class="text-xs font-semibold text-amber-700 hover:underline
                         focus:outline-none focus:ring-0"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </section>

          <!-- Empty -->
          <div
            v-if="filteredSortedAlbums.length === 0"
            class="rounded-2xl bg-white/60 p-6 text-zinc-700 ring-1 ring-black/5"
          >
            Aucun album ne correspond à ta recherche.
          </div>

          <!-- Grid: covers only, hover shows title + artist -->
          <div
            v-else
            class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          >
            <component
              v-for="a in filteredSortedAlbums"
              :key="a.id"
              :is="a.coverUrl ? 'a' : 'div'"
              v-bind="a.coverUrl ? { href: a.coverUrl, target: '_blank', rel: 'noopener noreferrer' } : {}"
              class="group block focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              :title="`${a.title} — ${a.artist}`"
            >
              <div class="relative aspect-square">
                <img
                  :src="safeCover(a)"
                  :alt="`Pochette de ${a.title}`"
                  class="h-full w-full object-cover
                         shadow-[0_18px_40px_-28px_rgba(0,0,0,0.55)]
                         transition-transform duration-300 ease-out
                         group-hover:scale-[1.04]"
                  loading="lazy"
                />

                <!-- Hover overlay -->
                <div
                  class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  <div class="absolute inset-0 bg-black/45"></div>

                  <div class="absolute inset-x-0 bottom-0 p-3">
                    <p class="text-sm font-extrabold text-white leading-snug line-clamp-1">
                      {{ a.title }}
                    </p>
                    <p class="mt-0.5 text-xs text-white/90 line-clamp-1">
                      {{ a.artist }}
                      <span v-if="a.year" class="text-white/70"> · {{ a.year }}</span>
                    </p>
                    <p v-if="a.genre" class="mt-1 text-[11px] text-white/70 line-clamp-1">
                      {{ prettyGenre(a.genre) }}
                    </p>
                  </div>
                </div>
              </div>
            </component>

            <!-- No data -->
            <div
              v-if="allAlbums.length === 0"
              class="col-span-full rounded-2xl bg-white/60 p-6 text-zinc-700 ring-1 ring-black/5"
            >
              Aucun album pour le moment. Lance le seed ou ajoute-en via Prisma Studio.
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <BloomerFooter />
</template>
