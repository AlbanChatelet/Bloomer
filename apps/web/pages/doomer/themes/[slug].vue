<script setup lang="ts">
import { doomerThemes, doomerContent } from "~/content/doomer.content"

const route = useRoute()

const slug = computed(() => String(route.params.slug || ""))
const themes = doomerThemes

const theme = computed(() => themes.find(t => t.slug === slug.value))
if (!theme.value) throw createError({ statusCode: 404, statusMessage: "Thème introuvable" })

const index = computed(() => themes.findIndex(t => t.slug === slug.value))
const prev = computed(() => (index.value > 0 ? themes[index.value - 1] : null))
const next = computed(() => (index.value >= 0 && index.value < themes.length - 1 ? themes[index.value + 1] : null))

const blocks = computed(() => doomerContent[slug.value] || [])

// 3 cadres d’illustration (tu mettras tes images plus tard)
const illus = computed(() => theme.value!.illustrations)
</script>

<template>
  <div class="min-h-screen bg-[#06060a] text-zinc-100">
    <!-- Background accents -->
    <div class="pointer-events-none fixed inset-0 -z-10">
      <div class="absolute -top-24 left-1/2 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl"></div>
      <div class="absolute bottom-[-12rem] right-[-8rem] h-[26rem] w-[26rem] rounded-full bg-indigo-500/10 blur-3xl"></div>
      <div class="absolute bottom-[-10rem] left-[-10rem] h-[22rem] w-[22rem] rounded-full bg-fuchsia-500/10 blur-3xl"></div>
    </div>

    <!-- HEADER -->
    <header class="relative overflow-hidden border-b border-white/10">
      <div class="absolute inset-0">
        <div class="h-full w-full bg-cover bg-center" :style="{ backgroundImage: `url(${theme!.image})` }" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/25"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-fuchsia-500/15 via-transparent to-cyan-400/15"></div>
        <div class="absolute inset-0 opacity-[0.07] mix-blend-overlay grain"></div>
      </div>

      <div class="relative mx-auto max-w-6xl px-6 py-14">
        <div class="flex flex-wrap items-center gap-3">
          <NuxtLink
            to="/doomer"
            class="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold text-zinc-200 hover:bg-white/5"
          >
            ← Retour DOOMER
          </NuxtLink>

          <span
            class="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-200"
          >
            {{ theme!.label }}
          </span>

          <span class="hidden sm:inline text-xs text-zinc-400">
            / thème {{ index + 1 }} — {{ themes.length }}
          </span>
        </div>

        <h1 class="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
          {{ theme!.title }}
        </h1>

        <p class="mt-4 max-w-2xl text-base leading-relaxed text-zinc-200">
          {{ theme!.hook }}
        </p>
        <p class="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300">
          {{ theme!.note }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a
            href="#act-1"
            class="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/15"
          >
            Commencer →
          </a>
          <NuxtLink
            to="/bloomer"
            class="rounded-full bg-amber-200/10 px-4 py-2 text-sm font-semibold text-amber-100 hover:bg-amber-200/15"
          >
            Respiration : BLOOMER →
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
      <div class="grid gap-6 lg:grid-cols-12">
        <!-- CONTENU -->
        <section class="lg:col-span-8 space-y-6">
          <!-- ACT 1 -->
          <section id="act-1" class="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">Act I</p>
                <h2 class="mt-1 text-lg font-extrabold">Le diagnostic</h2>
              </div>
              <div class="h-[2px] w-20 bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-indigo-400 opacity-80"></div>
            </div>

            <!-- Cadre image 1 -->
            <div class="mt-5 group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40">
              <div class="absolute -inset-1 opacity-0 blur-xl transition duration-500 group-hover:opacity-100">
                <div class="h-full w-full rounded-[26px] bg-gradient-to-br from-fuchsia-500/35 via-cyan-400/25 to-indigo-500/35"></div>
              </div>

              <div class="relative aspect-[16/9] w-full">

                <div class="absolute bg-[radial-gradient(circle_at_top,#141424,transparent_60%)]"></div>
                <div class="absolute bg-gradient-to-t from-black/80 via-black/35 to-black/10"></div>
                <img
  :src="illus.image1"
  :alt="`Illustration 1 — ${theme!.title}`"
  class="absolute h-full w-full object-cover"
/>

<!-- overlays (tu peux les laisser, ça marche nickel par-dessus l'image) -->
<div class="absolute bg-[radial-gradient(circle_at_top,#141424,transparent_60%)]"></div>
<div class="absolute bg-gradient-to-t from-black/80 via-black/35 to-black/10"></div>
              </div>

              <div class="relative border-t border-white/10 p-4">
                <p class="text-xs text-zinc-300">
                  Illustration du thème — ambiance / symbole / scène (tu peux mettre une caption ici plus tard).
                </p>
              </div>
            </div>
          </section>
          

          <!-- Blocs dynamiques -->
          <div
            v-for="(b, i) in blocks"
            :key="i"
            class="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-[2px] hover:bg-white/[0.07]"
          >
            <!-- Glow léger -->
            <div class="pointer-events-none absolute opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <!-- TEXT -->
            <template v-if="b.kind === 'text'">
              <h3 class="text-lg font-extrabold">
                {{ b.title }}
              </h3>
              <div class="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
                <p v-for="(p, j) in b.paragraphs" :key="j">{{ p }}</p>
              </div>
              <div class="mt-5 h-[2px] w-12 bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-indigo-400"></div>

              
            </template>
            

            <!-- LIST -->
            <template v-else-if="b.kind === 'list'">
              <!-- Cadre image 2 (au début des actions, ça marche bien visuellement) -->
              <div class="mt-5 mb-5 group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40">
                <div class="absolute -inset-1 opacity-0 blur-xl transition duration-500 group-hover:opacity-100">
                  <div class="h-full w-full rounded-[26px] bg-gradient-to-br from-cyan-400/25 via-fuchsia-500/20 to-indigo-500/25"></div>
                </div>
                <div class="relative aspect-[21/9] w-full">
                  <div class="absolute bg-[radial-gradient(circle_at_top,#101022,transparent_60%)]"></div>
                  <div class="absolute bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
                  <img
  :src="illus.image2"
  :alt="`Illustration 2 — ${theme!.title}`"
  class="absolute h-full w-full object-cover"
/>

<div class="absolute bg-[radial-gradient(circle_at_top,#101022,transparent_60%)]"></div>
<div class="absolute bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
                </div>
              </div>
              <h3 class="text-lg font-extrabold">{{ b.title }}</h3>
              <ul class="mt-4 space-y-2 text-sm text-zinc-300">
                <li v-for="(it, j) in b.items" :key="j" class="flex gap-3">
                  <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300/70"></span>
                  <span>{{ it }}</span>
                </li>
              </ul>
              <div class="mt-5 h-px w-16 bg-gradient-to-r from-white/15 to-transparent"></div>
            </template>

            <!-- QUOTE -->
            <template v-else-if="b.kind === 'quote'">
              <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-6">
                <div class="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-400/10"></div>
                <p class="relative text-base font-semibold leading-relaxed text-zinc-100">
                  <span class="text-cyan-200">“</span>{{ b.text }}<span class="text-cyan-200">”</span>
                </p>
                <p v-if="b.author" class="relative mt-3 text-xs text-zinc-400">— {{ b.author }}</p>
              </div>
            </template>

            <!-- ACTIONS -->
            <template v-else-if="b.kind === 'actions'">
              <h3 class="text-lg font-extrabold">{{ b.title }}</h3>

              <!-- Cadre image 3 -->
            <div class="mt-5 group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40">
              <div class="absolute -inset-1 opacity-0 blur-xl transition duration-500 group-hover:opacity-100">
                <div class="h-full w-full rounded-[26px] bg-gradient-to-br from-indigo-500/30 via-cyan-400/20 to-fuchsia-500/30"></div>
              </div>

              <div class="relative aspect-[16/10] w-full">
                <div class="absolute bg-[radial-gradient(circle_at_top,#12122a,transparent_60%)]"></div>
                <div class="absolute  bg-gradient-to-t from-black/80 via-black/35 to-black/10"></div>
                <img
  :src="illus.image3"
  :alt="`Illustration 3 — ${theme!.title}`"
  class="absolute h-full w-full object-cover"
/>

<div class="absolute bg-[radial-gradient(circle_at_top,#12122a,transparent_60%)]"></div>
<div class="absolute bg-gradient-to-t from-black/80 via-black/35 to-black/10"></div>
              </div>
            </div>

              <div class="mt-5 grid gap-4 sm:grid-cols-2">
                <article
                  v-for="(a, j) in b.items"
                  :key="j"
                  class="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:-translate-y-0.5 hover:bg-white/5"
                >
                  <div class="pointer-events-none absolute inset-0 opacity-0 transition duration-500 hover:opacity-100">
                    <div class="absolute -inset-1 bg-gradient-to-br from-fuchsia-500/15 via-transparent to-cyan-400/15 blur-xl"></div>
                  </div>

                  <div class="relative">
                    <h4 class="text-sm font-bold text-zinc-100">{{ a.title }}</h4>
                    <p class="mt-2 text-sm leading-relaxed text-zinc-300">{{ a.desc }}</p>
                    <div class="mt-4 h-[2px] w-10 bg-gradient-to-r from-cyan-300/70 to-transparent transition-all hover:w-16"></div>
                  </div>
                </article>
              </div>
            </template>
          </div>

          <!-- ACT 3 -->
          <section id="act-3" class="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">Act III</p>
                <h2 class="mt-1 text-lg font-extrabold">Clore / enchaîner</h2>
              </div>
              <div class="h-[2px] w-20 bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-indigo-400 opacity-80"></div>
            </div>

            

            <div class="mt-6 flex flex-wrap items-center justify-between gap-3">
              <NuxtLink
                v-if="prev"
                :to="`/doomer/themes/${prev.slug}`"
                class="rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-white/10"
              >
                ← {{ prev.title }}
              </NuxtLink>

              <NuxtLink
                v-if="next"
                :to="`/doomer/themes/${next.slug}`"
                class="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
              >
                {{ next.title }} →
              </NuxtLink>
            </div>
          </section>
        </section>

        <!-- SIDEBAR -->
        <aside class="lg:col-span-4 space-y-4">
          <!-- Sommaire sticky -->
          <div class="lg:sticky lg:top-24 space-y-4">
            <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 class="text-sm font-extrabold">Sommaire</h3>

              <div class="mt-4 flex flex-col gap-2 text-sm">
                <a href="#act-1" class="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-zinc-200 hover:bg-white/5">
                  Act I — Diagnostic
                </a>
                <a href="#act-3" class="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-zinc-200 hover:bg-white/5">
                  Act III — Enchaîner
                </a>
              </div>

              <div class="mt-4 h-px w-full bg-white/10"></div>

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
                  class="mt-1 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15"
                >
                  Retour à DOOMER
                </NuxtLink>
              </div>
            </div>

            <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 class="text-sm font-extrabold">Pont vers BLOOMER</h3>
              <p class="mt-3 text-sm leading-relaxed text-zinc-300">
                Besoin de relief tout de suite : objets, images, créations, nostalgie.
              </p>
              <NuxtLink
                to="/bloomer"
                class="mt-4 inline-flex rounded-full bg-amber-200/10 px-4 py-2 text-sm font-semibold text-amber-100 hover:bg-amber-200/15"
              >
                Aller vers BLOOMER →
              </NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<style scoped>
.grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
}
</style>