<script setup lang="ts">
import { ref, watch } from "vue"

const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}

// fermer si on repasse en desktop
if (process.client) {
  const mq = window.matchMedia("(min-width: 640px)")
  mq.addEventListener("change", (e) => {
    if (e.matches) isOpen.value = false
  })
}

// bloquer scroll quand menu mobile ouvert
watch(isOpen, (v) => {
  if (!process.client) return
  document.documentElement.style.overflow = v ? "hidden" : ""
})
</script>

<template>
  <!-- HEADER TRANSPARENT / BLUR ONLY -->
  <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
    <!-- aucun fond plein, juste le blur -->

    <div class="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <!-- LOGO -->
      <NuxtLink to="/" class="flex items-center transition hover:opacity-90" @click="closeMenu">
        <img
          src="/logo/logo.png"
          alt="Bloomer"
          class="h-12 w-auto select-none sm:h-14 md:h-16"
        />
      </NuxtLink>

      <!-- DESKTOP NAV -->
      <div class="hidden sm:flex items-center gap-4">
        <NuxtLink
          to="/doomer"
          class="rounded-full bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-300/20"
        >
          DOOMER
        </NuxtLink>

        <NuxtLink
          to="/bloomer"
          class="rounded-full bg-amber-200/10 px-4 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-200/20"
        >
          BLOOMER
        </NuxtLink>
      </div>

      <!-- BURGER MOBILE -->
      <button
        type="button"
        class="sm:hidden inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-zinc-100 hover:bg-white/10"
        aria-label="Ouvrir le menu"
        @click="toggleMenu"
      >
        <span class="relative block h-[14px] w-[18px]">
          <span
            class="absolute left-0 top-0 h-[2px] w-full rounded bg-white transition duration-300"
            :class="isOpen ? 'translate-y-[6px] rotate-45' : ''"
          />
          <span
            class="absolute left-0 top-[6px] h-[2px] w-full rounded bg-white transition duration-300"
            :class="isOpen ? 'opacity-0' : 'opacity-100'"
          />
          <span
            class="absolute left-0 bottom-0 h-[2px] w-full rounded bg-white transition duration-300"
            :class="isOpen ? '-translate-y-[6px] -rotate-45' : ''"
          />
        </span>
      </button>
    </div>

    <!-- MENU MOBILE -->
    <div
      class="sm:hidden overflow-hidden transition-[max-height,opacity] duration-300"
      :class="isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="bg-black/40 backdrop-blur-md">
        <div class="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-2">
          <NuxtLink
            to="/doomer"
            class="rounded-2xl bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-200 hover:bg-cyan-300/20"
            @click="closeMenu"
          >
            DOOMER
          </NuxtLink>

          <NuxtLink
            to="/bloomer"
            class="rounded-2xl bg-amber-200/10 px-4 py-3 text-sm font-semibold text-amber-200 hover:bg-amber-200/20"
            @click="closeMenu"
          >
            BLOOMER
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
