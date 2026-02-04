<script setup lang="ts">
import { ref, watch, computed } from "vue"

const isOpen = ref(false)

const creationsLinks = [
  { label: "Créations en LEGO", to: "/bloomer/lego-creation" },
  { label: "DIY", to: "/bloomer/creations-diy" },
]

const cultureLinks = [
  { label: "Shows cultes", to: "/bloomer/show-cultes" },
  { label: "Albums musicaux", to: "/bloomer/music-albums" },
]

const decorationsLinks = [
  { label: "Décoration musique", to: "/bloomer/decoration-music" },
]

const mobileLinks = computed(() => [
  ...creationsLinks,
  ...cultureLinks,
  ...decorationsLinks,
])

function closeMenu() {
  isOpen.value = false
}

function toggleMenu() {
  isOpen.value = !isOpen.value
}

if (process.client) {
  const mq = window.matchMedia("(min-width: 640px)")
  mq.addEventListener("change", (e) => {
    if (e.matches) isOpen.value = false
  })
}

watch(isOpen, (v) => {
  if (!process.client) return
  document.documentElement.style.overflow = v ? "hidden" : ""
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
    <div class="absolute inset-0 bg-[#944715]/50"></div>
    <div class="absolute inset-0 border-b border-black/10"></div>

    <div class="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <!-- LOGO -->
      <NuxtLink to="/" class="flex items-center transition hover:opacity-90" @click="closeMenu">
        <img src="/logo/logo.png" alt="Bloomer" class="h-12 w-auto select-none sm:h-14 md:h-16" />
      </NuxtLink>

      <!-- DESKTOP NAV -->
      <div class="hidden sm:flex items-center gap-2">
        <!-- Shared "button brut" style: fond plein + hover stylé -->
        <!-- Créations -->
        <div class="relative">
          <div class="group inline-block">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold
                     text-white bg-[#7A330E] border border-white/15
                     shadow-[0_10px_22px_-18px_rgba(0,0,0,0.75)]
                     transition duration-200 ease-out
                     hover:-translate-y-[1px] hover:shadow-[0_18px_30px_-18px_rgba(0,0,0,0.8)]
                     hover:bg-[#8A3B10] active:translate-y-0"
              aria-haspopup="menu"
            >
              Créations
              <span class="inline-block transition-transform duration-200 group-hover:rotate-180" aria-hidden="true">▾</span>
            </button>

            <!-- ✅ dropdown smooth -->
            <div class="absolute left-0 top-full pt-2">
              <div
                class="w-max min-w-max whitespace-nowrap overflow-hidden rounded-2xl
                       border border-white/15 bg-[#944715] shadow-lg
                       origin-top-left transform-gpu
                       opacity-0 translate-y-1 scale-[0.98]
                       pointer-events-none
                       transition duration-200 ease-out
                       group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                       group-hover:pointer-events-auto
                       delay-75 group-hover:delay-0"
                role="menu"
              >
                <NuxtLink
                  v-for="l in creationsLinks"
                  :key="l.to"
                  :to="l.to"
                  class="block px-4 py-3 text-sm font-bold text-white
                         hover:bg-white/10"
                  role="menuitem"
                >
                  {{ l.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Culture -->
        <div class="relative">
          <div class="group inline-block">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold
                     text-white bg-[#7A330E] border border-white/15
                     shadow-[0_10px_22px_-18px_rgba(0,0,0,0.75)]
                     transition duration-200 ease-out
                     hover:-translate-y-[1px] hover:shadow-[0_18px_30px_-18px_rgba(0,0,0,0.8)]
                     hover:bg-[#8A3B10] active:translate-y-0"
              aria-haspopup="menu"
            >
              Culture
              <span class="inline-block transition-transform duration-200 group-hover:rotate-180" aria-hidden="true">▾</span>
            </button>

            <div class="absolute left-0 top-full pt-2">
              <div
                class="w-max min-w-max whitespace-nowrap overflow-hidden rounded-2xl
                       border border-white/15 bg-[#944715] shadow-lg
                       origin-top-left transform-gpu
                       opacity-0 translate-y-1 scale-[0.98]
                       pointer-events-none
                       transition duration-200 ease-out
                       group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                       group-hover:pointer-events-auto
                       delay-75 group-hover:delay-0"
                role="menu"
              >
                <NuxtLink
                  v-for="l in cultureLinks"
                  :key="l.to"
                  :to="l.to"
                  class="block px-4 py-3 text-sm font-bold text-white hover:bg-white/10"
                  role="menuitem"
                >
                  {{ l.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Décorations -->
        <div class="relative">
          <div class="group inline-block">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold
                     text-white bg-[#7A330E] border border-white/15
                     shadow-[0_10px_22px_-18px_rgba(0,0,0,0.75)]
                     transition duration-200 ease-out
                     hover:-translate-y-[1px] hover:shadow-[0_18px_30px_-18px_rgba(0,0,0,0.8)]
                     hover:bg-[#8A3B10] active:translate-y-0"
              aria-haspopup="menu"
            >
              Décorations
              <span class="inline-block transition-transform duration-200 group-hover:rotate-180" aria-hidden="true">▾</span>
            </button>

            <div class="absolute left-0 top-full pt-2">
              <div
                class="w-max min-w-max whitespace-nowrap overflow-hidden rounded-2xl
                       border border-white/15 bg-[#944715] shadow-lg
                       origin-top-left transform-gpu
                       opacity-0 translate-y-1 scale-[0.98]
                       pointer-events-none
                       transition duration-200 ease-out
                       group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                       group-hover:pointer-events-auto
                       delay-75 group-hover:delay-0"
                role="menu"
              >
                <NuxtLink
                  v-for="l in decorationsLinks"
                  :key="l.to"
                  :to="l.to"
                  class="block px-4 py-3 text-sm font-bold text-white hover:bg-white/10"
                  role="menuitem"
                >
                  {{ l.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <span class="mx-1 h-5 w-px bg-black/15"></span>

        <!-- DOOMER (bouton brut aussi, mais cyan) -->
        <NuxtLink
          to="/doomer"
          class="rounded-full px-4 py-2 text-sm font-extrabold
                 text-cyan-50 bg-cyan-700 border border-cyan-200/15
                 shadow-[0_10px_22px_-18px_rgba(0,0,0,0.7)]
                 transition duration-200 ease-out
                 hover:-translate-y-[1px] hover:bg-cyan-600 hover:shadow-[0_18px_30px_-18px_rgba(0,0,0,0.8)]"
        >
          DOOMER →
        </NuxtLink>
      </div>

      <!-- MOBILE BURGER (bouton brut) -->
      <button
        type="button"
        class="sm:hidden inline-flex items-center justify-center rounded-full
               border border-white/15 bg-[#7A330E] p-3 text-white
               shadow-[0_10px_22px_-18px_rgba(0,0,0,0.75)]
               transition duration-200 ease-out
               hover:bg-[#8A3B10] hover:-translate-y-[1px]"
        :aria-expanded="isOpen"
        aria-label="Ouvrir le menu"
        @click="toggleMenu"
      >
        <span class="relative block h-[14px] w-[18px]">
          <span
            class="absolute left-0 top-0 h-[2px] w-full rounded bg-white transition duration-300"
            :class="isOpen ? 'translate-y-[6px] rotate-45' : ''"
          ></span>
          <span
            class="absolute left-0 top-[6px] h-[2px] w-full rounded bg-white transition duration-300"
            :class="isOpen ? 'opacity-0' : 'opacity-100'"
          ></span>
          <span
            class="absolute left-0 bottom-0 h-[2px] w-full rounded bg-white transition duration-300"
            :class="isOpen ? '-translate-y-[6px] -rotate-45' : ''"
          ></span>
        </span>
      </button>
    </div>

    <!-- MOBILE DROPDOWN -->
    <div
      class="sm:hidden overflow-hidden transition-[max-height,opacity] duration-300"
      :class="isOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="relative border-t border-black/10 bg-[#944715]/30 backdrop-blur-md">
        <div class="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-2">
          <NuxtLink
            v-for="l in mobileLinks"
            :key="l.to"
            :to="l.to"
            class="rounded-2xl border border-white/15 bg-[#7A330E] px-4 py-3
                   text-sm font-bold text-white
                   shadow-[0_10px_22px_-18px_rgba(0,0,0,0.75)]
                   transition duration-200 ease-out
                   hover:bg-[#8A3B10] hover:-translate-y-[1px]"
            @click="closeMenu"
          >
            {{ l.label }}
          </NuxtLink>

          <NuxtLink
            to="/doomer"
            class="rounded-2xl border border-cyan-200/20 bg-cyan-700 px-4 py-3
                   text-sm font-extrabold text-cyan-50
                   shadow-[0_10px_22px_-18px_rgba(0,0,0,0.7)]
                   transition duration-200 ease-out
                   hover:bg-cyan-600 hover:-translate-y-[1px]"
            @click="closeMenu"
          >
            DOOMER →
          </NuxtLink>
        </div>
      </div>

      <button
        class="fixed inset-0 -z-10 bg-black/25"
        v-if="isOpen"
        aria-label="Fermer le menu"
        @click="closeMenu"
      />
    </div>
  </nav>
</template>
