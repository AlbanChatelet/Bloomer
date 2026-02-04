<script setup lang="ts">
import { doomerThemes, doomerContent } from "~/content/doomer.content"
import DoomerHeader from "~/components/DoomerHeader.vue"
import DoomerFooter from "~/components/DoomerFooter.vue"
const route = useRoute()

const slug = computed(() => String(route.params.slug || ""))
const themes = doomerThemes

const theme = computed(() => themes.find(t => t.slug === slug.value))
if (!theme.value) throw createError({ statusCode: 404, statusMessage: "Thème introuvable" })

const index = computed(() => themes.findIndex(t => t.slug === slug.value))
const prev = computed(() => (index.value > 0 ? themes[index.value - 1] : null))
const next = computed(() => (index.value >= 0 && index.value < themes.length - 1 ? themes[index.value + 1] : null))

const blocks = computed(() => doomerContent[slug.value] || [])
const illus = computed(() => theme.value!.illustrations)
</script>

<template>
  <DoomerHeader />

  <div class="min-h-screen bg-[#06060a] text-zinc-100">
    <!-- HERO IMMERSIF -->
    <header class="relative isolate overflow-hidden min-h-[120vh]">
      <!-- Fond image -->
      <div class="pointer-events-none absolute inset-0 z-0">
        <div
          class="absolute inset-0 bg-cover bg-center scale-110"
          :style="{ backgroundImage: `url(${theme!.image})` }"
        ></div>

        <div class="absolute inset-0 bg-black/50"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-[#06060a]"></div>
        <div class="absolute inset-0 opacity-[0.07] mix-blend-overlay grain"></div>
      </div>

      <!-- Contenu hero -->
      <div class="relative z-10 mx-auto max-w-4xl px-6 pt-32">
        <div class="flex flex-wrap items-center gap-3">
          <NuxtLink
            to="/doomer"
            class="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold transition hover:bg-white/10 hover:shadow-lg hover:shadow-white/5"
          >
            ← Retour DOOMER
          </NuxtLink>

          <span
            class="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-200"
          >
            {{ theme!.label }}
          </span>
        </div>

        <h1 class="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl">
          {{ theme!.title }}
        </h1>

        <p class="mt-6 max-w-2xl text-base leading-relaxed text-zinc-200">
          {{ theme!.hook }}
        </p>

        <p class="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300">
          {{ theme!.note }}
        </p>
      </div>

      <!-- IMAGE 1 -->
      <div class="relative z-10 mt-10">
        <div class="mx-auto max-w-4xl px-6">
          <div class="group overflow-hidden rounded-3xl border border-white/10 bg-black/40 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50">
            <div class="relative aspect-[16/9] overflow-hidden">
              <img
                :src="illus.image1"
                :alt="`Illustration 1 — ${theme!.title}`"
                class="absolute h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10"></div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- CONTENU -->
    <main
      id="content"
      class="mx-auto max-w-4xl px-6 pt-16 pb-14 space-y-8"
    >
      <!-- BLOCS -->
      <div
        v-for="(b, i) in blocks"
        :key="i"
        class="group rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-black/40"
      >
        <template v-if="b.kind === 'text'">
          <h3 class="text-lg font-extrabold">{{ b.title }}</h3>
          <div class="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
            <p v-for="(p, j) in b.paragraphs" :key="j">{{ p }}</p>
          </div>
        </template>

        <template v-else-if="b.kind === 'list'">
          <div class="group mb-5 overflow-hidden rounded-3xl border border-white/10 bg-black/40 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
            <div class="relative aspect-[21/9] overflow-hidden">
              <img
                :src="illus.image2"
                :alt="`Illustration 2 — ${theme!.title}`"
                class="absolute h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
            </div>
          </div>

          <h3 class="text-lg font-extrabold">{{ b.title }}</h3>
          <ul class="mt-4 space-y-2 text-sm text-zinc-300">
            <li
              v-for="(it, j) in b.items"
              :key="j"
              class="flex gap-3 transition hover:text-zinc-100"
            >
              <span class="mt-1 h-2 w-2 rounded-full bg-cyan-300/70"></span>
              {{ it }}
            </li>
          </ul>
        </template>

        <template v-else-if="b.kind === 'quote'">
          <p class="text-base font-semibold leading-relaxed text-zinc-100 transition group-hover:text-white">
            “{{ b.text }}”
          </p>
          <p v-if="b.author" class="mt-2 text-xs text-zinc-400">
            — {{ b.author }}
          </p>
        </template>

        <template v-else-if="b.kind === 'actions'">
          <h3 class="text-lg font-extrabold">{{ b.title }}</h3>

          <div class="group mt-5 overflow-hidden rounded-3xl border border-white/10 bg-black/40 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
            <div class="relative aspect-[16/10] overflow-hidden">
              <img
                :src="illus.image3"
                :alt="`Illustration 3 — ${theme!.title}`"
                class="absolute h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10"></div>
            </div>
          </div>

          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            <article
              v-for="(a, j) in b.items"
              :key="j"
              class="rounded-2xl border border-white/10 bg-black/20 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/5 hover:shadow-lg hover:shadow-black/40"
            >
              <h4 class="text-sm font-bold">{{ a.title }}</h4>
              <p class="mt-2 text-sm text-zinc-300">{{ a.desc }}</p>
            </article>
          </div>
        </template>
      </div>

      <!-- NAV BAS -->
      <div class="flex flex-wrap justify-between gap-3 pt-6">
        <NuxtLink
          v-if="prev"
          :to="`/doomer/themes/${prev.slug}`"
          class="rounded-full bg-white/5 px-4 py-2 text-sm transition hover:-translate-x-1 hover:bg-white/10"
        >
          ← {{ prev.title }}
        </NuxtLink>

        <NuxtLink
          v-if="next"
          :to="`/doomer/themes/${next.slug}`"
          class="rounded-full bg-white/10 px-4 py-2 text-sm transition hover:translate-x-1 hover:bg-white/15"
        >
          {{ next.title }} →
        </NuxtLink>
      </div>
    </main>
  </div>
  <DoomerFooter />
</template>

<style scoped>
.grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
}
</style>
