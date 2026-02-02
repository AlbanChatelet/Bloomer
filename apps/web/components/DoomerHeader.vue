<script setup lang="ts">
import { ref, watch } from "vue"

const links = [
  { label: "Thèmes", href: "#themes" },
  { label: "Réenchanter", href: "#reenchanter" },
]

const isOpen = ref(false)

function closeMenu() {
  isOpen.value = false
}

function toggleMenu() {
  isOpen.value = !isOpen.value
}

// Bonus: fermer le menu si on repasse en desktop (resize)
if (process.client) {
  const mq = window.matchMedia("(min-width: 640px)") // sm
  mq.addEventListener("change", (e) => {
    if (e.matches) isOpen.value = false
  })
}

// Bonus: empêcher le scroll derrière quand menu ouvert
watch(isOpen, (v) => {
  if (!process.client) return
  document.documentElement.style.overflow = v ? "hidden" : ""
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
    <div class="absolute inset-0 bg-black/20"></div>

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
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="rounded-full px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-white/10"
        >
          {{ l.label }}
        </a>

        <NuxtLink
          to="/doomer"
          class="rounded-full bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-300/20"
        >
          DOOMER →
        </NuxtLink>
      </div>

      <!-- MOBILE BURGER -->
      <button
        type="button"
        class="sm:hidden inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-zinc-100 hover:bg-white/10"
        :aria-expanded="isOpen"
        aria-label="Ouvrir le menu"
        @click="toggleMenu"
      >
        <!-- Icon burger (3 barres) -->
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
      :class="isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="relative border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div class="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-2">
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/10"
            @click="closeMenu"
          >
            {{ l.label }}
          </a>

          <NuxtLink
            to="/doomer"
            class="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-200 hover:bg-cyan-300/20"
            @click="closeMenu"
          >
            DOOMER →
          </NuxtLink>
        </div>
      </div>

      <!-- overlay clic pour fermer (optionnel mais clean) -->
      <button
        class="fixed inset-0 -z-10 bg-black/40"
        v-if="isOpen"
        aria-label="Fermer le menu"
        @click="closeMenu"
      />
    </div>
  </nav>
</template>
