<template>
    <v-container class="buttons-nav-bar bg-primary px-4" fluid>

      <v-container class="left-container">
        <a href="/" class="d-flex align-center text-decoration-none logo-link">
          <div class="logo-container">
            <v-img
              src="@/assets/PayGoIcon.png"
              width="110"
              height="110"
            />
          </div>
        </a>
      </v-container>

      <v-container class="center-container">
        <SectionNav
          v-for="section in sections"
          :key="section.route"
          :selected="section.selected"
          :icon="section.icon"
          :text="section.text"
          @click="goToRoute(section.route)"
          class="mx-1"
        />
      </v-container>

      <v-container class="right-container">
        <v-menu transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <ProfileSectionNav v-bind="props" :name="getInitials()"
            class="align-center justify-center display-flex flex-row" style="height: 50px; width: 50px;"/>
          </template>
          <SectionNav 
          v-for="option in profileOptions"
          :selected="option.selected"
          :icon="option.icon"
          :text="option.text"
          @click="option.action"
          class="my-1"
          />
        </v-menu>
      </v-container>
    </v-container>
</template>
  
<script setup>
  import { useRouter } from 'vue-router';
  import SectionNav from './SectionNav.vue';
  import ProfileSectionNav from './ProfileSectionNav.vue';
  import { useAppStore } from '@/stores/store';

  const appStore = useAppStore();

  const router = useRouter();
  
  const goToRoute = (route) => {
    router.push({name: route});
  };

  const handleSignOut = () => {
    appStore.setCurrentUser(-1);
    goToRoute("signIn");
  }

  const profileOptions = [
    {text: "Tus Datos", icon: "mdi-account", selected: false, action: () => {goToRoute("account")} },
    {text: "Personalizar", icon: "mdi-pencil", selected: false, action: () => {goToRoute("more")} },
    {text: "Cerrar Sesion", icon: "mdi-logout", selected: false, action: handleSignOut }
  ]
  
  const props = defineProps({
    sections: {
        type: Array,
        required: false,
    }
  });

  const getInitials = () => {
    const currentUser = appStore.getCurrentUser();
    if (!currentUser || !currentUser.name || !currentUser.surname) return "";
    return `${currentUser.name.charAt(0)}${currentUser.surname.charAt(0)}`;
  };
  
</script>
  
<style scoped>
  .buttons-nav-bar {
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    z-index: 100;
    height: 90px;
    overflow: visible;
  }
  .left-container {
    height: 100%;
    width: 12.5%;
    display: flex;
    align-items: center;
  }
  .logo-link {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .center-container{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 65%;
  }
  .right-container{
    height: 100%;
    width: 12.5%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
  }
</style>
