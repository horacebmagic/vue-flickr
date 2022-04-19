<template>
  <div
    v-if="toggleFilter"
    class="bg-white p-2 grid grid-cols-6 rounded-sm overflow-x-auto w-full gap-1"
  >
    <div
      v-for="(tag, index) in tags"
      :key="index"
      class="bg-slate-200 rounded-sm cursor-pointer px-1 text-slate-600"
      @click="handlePickTag(tag)"
    >
      <span class="">{{ tag }}</span>
    </div>
  </div>
</template>
<script>
import { tags } from "../endpoint";
export default {
  props: ["toggleFilter"],
  emits: ["pick-tag"],
  setup(props, { emit }) {
    const handlePickTag = (tag) => {
      emit("pick-tag", tag);
    };

    return { tags, handlePickTag };
  },
};
</script>
