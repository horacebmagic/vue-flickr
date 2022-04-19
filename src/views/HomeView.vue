<template>
  <div class="flex flex-col space-y-2">
    <div v-if="state.photos" class="grid grid-cols-3 gap-2">
      <div
        v-for="data in state.photos.photo"
        :key="data.id"
        class="relative overflow-hidden"
        @mouseover="toggleInformation = data.id"
        @mouseleave="toggleInformation = 0"
      >
        <img
          :src="data.url_w"
          :alt="data.title"
          class="object-cover w-full h-60 cursor-pointer hover:opacity-90 hover:scale-110 transform transition duration-500"
        />
        <div
          v-show="toggleInformation === data.id"
          class="flex flex-col absolute bottom-0 w-full opacity-70 text-white p-2"
        >
          <div class="flex">
            <a class="truncate cursor-pointer font-bold hover:underline">
              {{ data.title }}
            </a>
          </div>
          <div class="text-sm">views: {{ data.views }}</div>
        </div>
      </div>
    </div>
    <div v-if="state.photos">
      <PaginationComponentVue
        :page="state.photos.page"
        :pages="state.photos.pages"
        :perpage="state.photos.perpage"
        :total="state.photos.total"
        @changePage="changePage"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import { getByTag, getInterestingness } from "../endpoint";
import PaginationComponentVue from "../components/PaginationComponent.vue";

export default {
  components: {
    PaginationComponentVue,
  },
  props: {
    tags: String,
    searchres: Object,
  },
  setup(props) {
    const state = ref({});
    const toggleInformation = ref(0);
    const currentPage = ref(1);
    const isFilterEmpty = ref(Boolean);

    onMounted(() => {
      isFilterEmpty.value = true;
    });

    watch(
      () => props.tags,
      (current, prev) => {
        if (current == "") {
          isFilterEmpty.value = true;
        } else if (current !== "") {
          isFilterEmpty.value = false;
        }
      }
    );

    const getPhotos = async (page = 1) => {
      if (isFilterEmpty.value) {
        const res = await fetch(getInterestingness(page));
        state.value = await res.json();
      } else {
        const res = await fetch(getByTag(props.tags, page));
        state.value = await res.json();
      }
    };

    onMounted(async () => {
      getPhotos();
    });

    watch(
      () => props.searchres,
      (first, second) => {
        state.value = first;
        window.scrollTo(0, 0);
      }
    );

    const changeCurrentPage = computed({
      get: () => currentPage.value,
      set: (val) => (currentPage.value = val),
    });

    const changePage = (page) => {
      console.log("change page trigger", page);
      changeCurrentPage.value = page;
      window.scrollTo(0, 0);
    };

    watch(
      () => currentPage.value,
      (current, prev) => {
        getPhotos(current);
      }
    );

    return {
      state,
      toggleInformation,
      changePage,
      isFilterEmpty,
    };
  },
};
</script>
