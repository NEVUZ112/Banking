<template>
  <div class="box">
    <nav class="navbar">
      <h3 class="animated-navbar-text">{{ t('translate.nav.title') }}</h3>
      <ul class="navbar-menu">
        <li>
          <div class="js">
            <div class="language-picker js-language-picker" data-trigger-class="btn btn--subtle">
              <form action="" class="language-picker__form">
                <label for="language-picker-select"></label>
                <select name="language-picker-select" id="language-picker-select" @change="handleLanguageChange">
                  <option lang="uz" value="uz">{{ t('translate.nav.lang.uzb') }}</option>
                  <option lang="en" value="en">{{ t('translate.nav.lang.eng') }}</option>
                  <option lang="ar" value="ar">{{ t('translate.nav.lang.arab') }}</option>
                </select>
              </form>
            </div>
          </div>
        </li>
        <li>
          <router-link to="/" class="animated-navbar-text" :class="{ active: isRouteActive('/') }">{{ t('translate.nav.home') }}</router-link>
        </li>
        <li>
          <router-link to="/help" class="animated-navbar-text" :class="{ active: isRouteActive('/help') }">{{ t('translate.nav.help') }}</router-link>
        </li>
        <li>
          <router-link to="/chart" class="animated-navbar-text" :class="{ active: isRouteActive('/chart') }">{{ t('translate.nav.statistics') }}</router-link>
        </li>
        <li>
          <a href="#" class="animated-navbar-text" @mouseenter="applyTextEffect" @click.prevent="open">{{ t('translate.nav.sidebar') }}</a>
        </li>
        <li>
          <a href="#" class="animated-navbar-text" @click.prevent="logout">{{ t('translate.nav.logout') }}</a>
        </li>
      </ul>
    </nav><br>
  </div>
</template>

<script>
import { ref, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import anime from 'animejs';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const i18n = inject('i18n');
    const locale = ref(i18n.global.locale.value);

    const logout = () => {
      store.commit('auth/logout');
      router.push('/login');
    };

    const open = () => {
      store.commit('setSidebar');
    };

    const setLocale = (lang) => {
      i18n.global.locale = lang;
      locale.value = lang;
    };

    const handleLanguageChange = (event) => {
      setLocale(event.target.value);
    };

    const applyTextEffect = (event) => {
      anime({
        targets: event.target,
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutExpo',
      });
    };

    const isRouteActive = (route) => {
      return router.currentRoute.value.path === route;
    };

    return {
      logout,
      open,
      locale,
      setLocale,
      handleLanguageChange,
      applyTextEffect,
      isRouteActive,
      t: (key) => i18n.global.t(key),
    };
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  background-color: #333;
  box-sizing: border-box;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 10px 20px;
}

.navbar-menu {
  list-style: none;
  display: flex;
  gap: 20px;
}

.navbar-menu li {
  display: inline;
}

.navbar-menu a,
.navbar h3 {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.navbar-menu a:hover,
.navbar h3:hover {
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
}

.navbar-menu a.active {
  color: #84ffab; /* Turquoise or any other color you prefer */
}
</style>
