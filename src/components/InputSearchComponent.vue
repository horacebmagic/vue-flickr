<template>
  <input
    type="text"
    name="search"
    class="w-full placeholder:text-center placeholder:font-light placeholder:text-slate-500 border rounded-sm border-slate-300 focus:outline-none px-2 text-center cursor-pointer"
    placeholder="Search by tags"
    v-model="tags"
    @change="handleInputChange"
  />
</template>
<script>
import { watch, ref } from "vue";
export default {
  props: {
    tags: String,
  },
  emits: ["watch-input-search"],
  setup(props, { emit }) {
    const tags = ref("");

    watch(
      () => props.tags,
      (current, prev) => {
        tags.value = current;
      }
    );

    const handleInputChange = (e) => {
      emit("watch-input-search", e.target.value);
    };

    return {
      tags,
      handleInputChange,
    };
  },
};
</script>
