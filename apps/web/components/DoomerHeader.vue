<script setup lang="ts">
import { ref, watch } from "vue"

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
    <!-- fond header -->
    <div class="absolute inset-0 bg-zinc-950/85"></div>
    <div class="absolute inset-0 border-b border-white/10"></div>

    <div class="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <!-- LOGO -->
      <NuxtLink
        to="/"
        class="flex items-center transition hover:opacity-90"
        @click="closeMenu"
      >
        <img
          src="/logo/logo.png"
          alt="Logo"
          class="h-12 w-auto select-none sm:h-14"
        />
      </NuxtLink>

      <!-- DESKTOP -->
      <div class="hidden sm:flex items-center gap-3">
        <!-- Bouton DOOMER -->
        <NuxtLink
          to="/doomer"
          class="rounded-full px-4 py-2 text-sm font-extrabold
                 text-white bg-zinc-900 border border-white/15
                 shadow-[0_10px_22px_-18px_rgba(0,0,0,0.9)]
                 transition duration-200 ease-out
                 hover:-translate-y-[1px] hover:bg-zinc-800
                 hover:shadow-[0_18px_30px_-18px_rgba(0,0,0,1)]"
        >
          DOOMER
        </NuxtLink>

        <!-- Bouton BLOOMER -->
        <NuxtLink
          to="/bloomer"
          class="rounded-full px-4 py-2 text-sm font-extrabold
                 text-amber-50 bg-[#944715] border border-white/15
                 shadow-[0_10px_22px_-18px_rgba(0,0,0,0.8)]
                 transition duration-200 ease-out
                 hover:-translate-y-[1px] hover:bg-[#A0521D]
                 hover:shadow-[0_18px_30px_-18px_rgba(0,0,0,0.9)]"
        >
          BLOOMER →
        </NuxtLink>
      </div>

      <!-- MOBILE BURGER -->
      <button
        type="button"
        class="sm:hidden inline-flex items-center justify-center rounded-full
               border border-white/15 bg-white/5 p-3 text-white
               shadow-[0_10px_22px_-18px_rgba(0,0,0,0.8)]
               transition duration-200 ease-out
               hover:bg-white/10 hover:-translate-y-[1px]"
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
      :class="isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="relative border-t border-white/10 bg-zinc-950/90 backdrop-blur-md">
        <div class="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-3">
          <NuxtLink
            to="/doomer"
            class="rounded-2xl border border-white/15 bg-zinc-900 px-4 py-3
                   text-sm font-extrabold text-white
                   shadow-[0_10px_22px_-18px_rgba(0,0,0,0.9)]
                   transition duration-200 ease-out
                   hover:bg-zinc-800 hover:-translate-y-[1px]"
            @click="closeMenu"
          >
            DOOMER
          </NuxtLink>

          <NuxtLink
            to="/bloomer"
            class="rounded-2xl border border-white/15 bg-[#944715] px-4 py-3
                   text-sm font-extrabold text-amber-50
                   shadow-[0_10px_22px_-18px_rgba(0,0,0,0.85)]
                   transition duration-200 ease-out
                   hover:bg-[#A0521D] hover:-translate-y-[1px]"
            @click="closeMenu"
          >
            BLOOMER →
          </NuxtLink>
        </div>
      </div>

      <button
        class="fixed inset-0 -z-10 bg-black/40"
        v-if="isOpen"
        aria-label="Fermer le menu"
        @click="closeMenu"
      />
    </div>
  </nav>
</template>

