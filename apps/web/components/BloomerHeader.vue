<script setup lang="ts">
import { ref, watch } from "vue"

const links = [
  { label: "DIY", to: "/bloomer/creations-diy" },
  { label: "Albums", to: "/bloomer/music-albums" },
  { label: "LEGO", to: "/bloomer/lego-creation" },
  { label: "Déco", to: "/bloomer/decoration-music" },
  { label: "Shows", to: "/bloomer/show-cultes" },
]

const isOpen = ref(false)

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
    <!-- ✅ voile clair, transparent -->
    <div class="absolute inset-0 bg-white/55"></div>
    <div class="absolute inset-0 border-b border-black/5"></div>

    <div class="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <!-- LOGO -->
      <NuxtLink to="/bloomer" class="flex items-center transition hover:opacity-90" @click="closeMenu">
        <img src="/logo/logo.png" alt="Bloomer" class="h-12 w-auto select-none sm:h-14 md:h-16" />
      </NuxtLink>

      <!-- DESKTOP NAV -->
      <div class="hidden sm:flex items-center gap-2">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="rounded-full px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-black/5"
        >
          {{ l.label }}
        </NuxtLink>

        <span class="mx-1 h-5 w-px bg-black/10"></span>

        <NuxtLink
          to="/doomer"
          class="rounded-full border border-cyan-400/25 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-800 hover:bg-cyan-300/20"
        >
          DOOMER →
        </NuxtLink>
      </div>

      <!-- MOBILE BURGER -->
      <button
        type="button"
        class="sm:hidden inline-flex items-center justify-center rounded-full border border-black/10 bg-white/60 p-3 text-zinc-900 hover:bg-white"
        :aria-expanded="isOpen"
        aria-label="Ouvrir le menu"
        @click="toggleMenu"
      >
        <span class="relative block h-[14px] w-[18px]">
          <span
            class="absolute left-0 top-0 h-[2px] w-full rounded bg-zinc-900 transition duration-300"
            :class="isOpen ? 'translate-y-[6px] rotate-45' : ''"
          ></span>
          <span
            class="absolute left-0 top-[6px] h-[2px] w-full rounded bg-zinc-900 transition duration-300"
            :class="isOpen ? 'opacity-0' : 'opacity-100'"
          ></span>
          <span
            class="absolute left-0 bottom-0 h-[2px] w-full rounded bg-zinc-900 transition duration-300"
            :class="isOpen ? '-translate-y-[6px] -rotate-45' : ''"
          ></span>
        </span>
      </button>
    </div>

    <!-- MOBILE DROPDOWN -->
    <div
      class="sm:hidden overflow-hidden transition-[max-height,opacity] duration-300"
      :class="isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="relative border-t border-black/5 bg-white/70 backdrop-blur-md">
        <div class="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-2">
          <NuxtLink
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            class="rounded-2xl border border-black/10 bg-white/60 px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-white"
            @click="closeMenu"
          >
            {{ l.label }}
          </NuxtLink>

          <NuxtLink
            to="/doomer"
            class="rounded-2xl border border-cyan-400/25 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-800 hover:bg-cyan-300/20"
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
