<template>
  <v-footer class="bg-primary d-flex flex-column align-center justify-center py-4 mt-8">
    <div class="d-flex align-center mb-2">
      <v-img
        src="@/assets/PayGoIcon.png"
        width="45"
        height="45"
        class="mr-2"
      />
      <span class="text-colortext2 text-body-2 text-center">PayGo</span>
    </div>
    <div class="text-subtitle-2 text-colortext2 mb-2 font-weight-medium text-center px-4">
      Paygo: Dinero rápido y siempre al alcance.
    </div>
    <div class="text-caption text-colortext2 text-center">
      © {{ new Date().getFullYear() }} PayGo. Todos los derechos reservados.
    </div>
  </v-footer>
</template>

<style scoped>
.v-footer {
  width: 100%;
  text-align: center;
}
</style>