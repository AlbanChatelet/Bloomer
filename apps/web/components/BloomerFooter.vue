<script setup lang="ts">
</script>

<template>
  <footer class="relative bg-[#E9DCC6] text-zinc-900">
    <!-- séparation douce -->
    <div class="mx-auto max-w-6xl px-6">
      <div class="h-px w-full bg-zinc-900/10"></div>
    </div>

    <div class="mx-auto max-w-6xl px-6 py-12">
      <div class="grid gap-8 md:grid-cols-3 items-start">
        <!-- Identité -->
        <div>
          <p class="text-xs font-semibold tracking-[0.3em] text-zinc-700">
            BLOOMER
          </p>
          <p class="mt-3 text-sm leading-relaxed text-zinc-800">
            Un espace pour <span class="em">réenchanter le quotidien</span> :
            images, objets, culture et gestes simples.
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-zinc-700">
            Navigation
          </p>
          <ul class="mt-4 space-y-3 text-sm">
            <li>
              <NuxtLink
                to="/bloomer"
                class="footer-link footer-link--bloomer"
              >
                → Aller vers BLOOMER
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/doomer"
                class="footer-link footer-link--doomer"
              >
                → Basculer vers DOOMER
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Note éditoriale -->
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-zinc-700">
            Intention
          </p>
          <p class="mt-4 text-sm leading-relaxed text-zinc-800">
            Ici, pas d’optimisation forcée.
            Juste des choses qui prennent du temps,
            et qui <span class="em">valent le coup</span>.
          </p>
        </div>
      </div>

      <!-- Bas footer -->
      <div class="mt-10 flex flex-col gap-4 border-t border-zinc-900/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xs text-zinc-700">
          © {{ new Date().getFullYear() }} BLOOMER — projet éditorial.
        </p>

        <p class="text-xs text-zinc-600">
          DOOMER ↔ BLOOMER : deux faces d’un même monde.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* accent texte */
.em {
  font-weight: 800;
  color: #3f3f46;
}

/* liens footer */
.footer-link {
  position: relative;
  display: inline-block;
  font-weight: 600;
  transition: color 0.3s ease;
}

.footer-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 2px;
  width: 0;
  transition: width 0.35s ease;
  border-radius: 999px;
}

/* bloomer = chaud */
.footer-link--bloomer {
  color: #92400e;
}
.footer-link--bloomer::after {
  background: linear-gradient(
    to right,
    rgba(251, 191, 36, 0.6),
    rgba(251, 191, 36, 1)
  );
}

/* doomer = froid */
.footer-link--doomer {
  color: #155e75;
}
.footer-link--doomer::after {
  background: linear-gradient(
    to right,
    rgba(34, 211, 238, 0.6),
    rgba(34, 211, 238, 1)
  );
}

.footer-link:hover::after {
  width: 100%;
}
</style>
