<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative bg-[#06060a] text-zinc-200">
    <!-- séparation + glow léger -->
    <div class="mx-auto max-w-6xl px-6">
      <div class="h-px w-full bg-white/10"></div>
    </div>

    <div class="mx-auto max-w-6xl px-6 py-12">
      <div class="grid gap-8 md:grid-cols-3 items-start">
        <!-- Identité -->
        <div>
          <p class="text-xs font-semibold tracking-[0.3em] text-zinc-400">
            DOOMER
          </p>
          <p class="mt-3 text-sm leading-relaxed text-zinc-300">
            Un espace pour nommer ce qui <span class="em">éteint</span> :
            saturation, décors froids, perte de sens —
            et préparer la <span class="em">sortie</span>.
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Navigation
          </p>

          <ul class="mt-4 space-y-3 text-sm">
            <li>
              <NuxtLink to="/doomer" class="footer-link footer-link--doomer">
                → Retour à DOOMER
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/bloomer" class="footer-link footer-link--bloomer">
                → Aller vers BLOOMER
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Note -->
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Note
          </p>
          <p class="mt-4 text-sm leading-relaxed text-zinc-300">
            DOOMER est un espace éditorial.
            En cas de détresse grave, contacte un proche
            ou les services d’urgence.
          </p>
        </div>
      </div>

      <!-- Bas footer -->
      <div class="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xs text-zinc-400">
          © {{ year }} DOOMER — projet éditorial.
        </p>

        <p class="text-xs text-zinc-500">
          DOOMER ↔ BLOOMER : diagnostic & respiration.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* mots accentués */
.em {
  font-weight: 800;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 0 18px rgba(99, 102, 241, 0.22);
}

/* liens */
.footer-link {
  position: relative;
  display: inline-block;
  font-weight: 600;
  color: rgba(228, 228, 231, 0.92);
  transition: color 0.3s ease, transform 0.3s ease;
}

.footer-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 2px;
  width: 0;
  border-radius: 999px;
  transition: width 0.35s ease;
}

/* doomer = froid (cyan/fuchsia) */
.footer-link--doomer::after {
  background: linear-gradient(
    to right,
    rgba(34, 211, 238, 0.9),
    rgba(217, 70, 239, 0.9)
  );
}

/* bloomer = chaud (ambre) */
.footer-link--bloomer::after {
  background: linear-gradient(
    to right,
    rgba(251, 191, 36, 0.6),
    rgba(251, 191, 36, 1)
  );
}

.footer-link:hover {
  transform: translateY(-1px);
}

.footer-link:hover::after {
  width: 100%;
}
</style>
