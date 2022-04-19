<template>
  <header
    class="flex flex-row bg-white items-center py-2 border border-b-slate-300 sticky top-0 z-20"
  >
    <div class="md:basis-6/12 mx-auto">
      <nav class="flex flex-row space-x-2 justify-between items-center">
        <RouterLink to="/" class="text-slate-500" @click="backToHome">
          <HomeIcon />
        </RouterLink>
        <div class="basis-full items-center">
          <div class="flex flex-row items-center relative">
            <span
              v-if="tagFilter !== ''"
              class="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"
              @click="clearTagFilter"
            >
              <ClearFilterIcon />
            </span>
            <InputSearchComponent
              @click="toggleFilter = !toggleFilter"
              :tags="tagFilter"
              @watch-input-search="watchInputSearch"
            />
          </div>
        </div>
        <span class="text-slate-500 cursor-pointer">
          <FilterSearchIcon @click="searchByTag" />
        </span>
      </nav>
    </div>
  </header>
  <main class="flex flex-row">
    <div class="md:basis-6/12 mx-auto my-2 relative flex justify-center grow-0">
      <div
        v-if="toggleFilter"
        class="w-full fixed z-10 flex md:w-1/2 flex-nowrap justify-center top-13"
      >
        <FilterComponent :toggleFilter="toggleFilter" @pick-tag="pickTag" />
      </div>
      <RouterView
        :class="[toggleFilter ? 'opacity-40' : '']"
        :tags="tagFilter"
        :searchres="searchRes"
        @click="closeFilter"
      />
    </div>
  </main>
  <footer class="flex flex-row">
    <div
      class="md:basis-6/12 mx-auto my-2 relative flex justify-between text-slate-500 text-sm font-light"
    >
      <div>
        ©2022 API by
        <a
          href="http://www.flickr.com"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline"
          >Flickr.</a
        >
      </div>
      <div>email.rafihidayat@gmail.com</div>
    </div>
  </footer>
</template>
<script>
import { ref } from "vue";
import { getByTag, getInterestingness } from "./endpoint";
// component
import FilterComponent from "./components/FilterComponent.vue";
import InputSearchComponent from "./components/InputSearchComponent.vue";
// icon
import HomeIcon from "./components/icons/HomeIcon.vue";
import FilterSearchIcon from "./components/icons/FilterSearchIcon.vue";
import ClearFilterIcon from "./components/icons/ClearFilterIcon.vue";

export default {
  components: {
    FilterComponent,
    HomeIcon,
    FilterSearchIcon,
    ClearFilterIcon,
    InputSearchComponent,
  },
  setup() {
    const toggleFilter = ref(false);
    const tagFilter = ref("");
    const searchRes = ref({});

    const closeFilter = () => {
      toggleFilter.value = false;
    };

    const pickTag = (tag) => {
      tagFilter.value += tag + ",";
    };

    const clearTagFilter = () => {
      tagFilter.value = "";
    };

    const searchByTag = async () => {
      closeFilter();
      if (tagFilter.value !== "") {
        const res = await fetch(getByTag(tagFilter.value));
        searchRes.value = await res.json();
      }
    };

    const backToHome = async () => {
      closeFilter();
      tagFilter.value = "";
      const res = await fetch(getInterestingness());
      searchRes.value = await res.json();
    };

    const watchInputSearch = (val) => {
      tagFilter.value = val;
    };

    return {
      toggleFilter,
      pickTag,
      tagFilter,
      clearTagFilter,
      searchByTag,
      searchRes,
      closeFilter,
      backToHome,
      watchInputSearch,
    };
  },
};
</script>
