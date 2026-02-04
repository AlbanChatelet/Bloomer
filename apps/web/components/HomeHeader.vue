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
  <!-- HEADER : logo only (mobile + desktop) -->
  <nav class="fixed top-0 left-0 right-0 z-50">
    <div class="mx-auto max-w-6xl px-6 py-5">
      <NuxtLink to="/" class="inline-flex items-center transition hover:opacity-90" @click="closeMenu">
        <img
          src="/logo/logo.png"
          alt="Bloomer"
          class="h-12 w-auto select-none sm:h-14 md:h-16"
        />
      </NuxtLink>
    </div>
  </nav>
</template>
