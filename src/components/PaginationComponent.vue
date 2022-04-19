<template>
  <div
    class="flex flex-row items-center justify-center mb-2 text-sm font-light text-slate-500"
  >
    Showing page {{ page }} out of {{ pages }}
  </div>
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-row space-x-2">
      <div
        class="py-1 px-3 bg-white text-slate-500 cursor-pointer"
        @click="handleChangePage(page - 1)"
      >
        Prev
      </div>
      <div
        class="py-1 px-3 bg-white text-slate-500 cursor-pointer"
        @click="handleChangePage(1)"
      >
        1
      </div>
    </div>
    <div>
      <div class="flex flex-row items-center justify-center overflow-x-auto">
        <div v-if="page > 2" class="flex flex-row">
          <div
            v-for="page in range(page - 2, page - 1)"
            :key="page"
            class="py-1 px-3 bg-white text-slate-500 cursor-pointer"
            @click="handleChangePage(page)"
          >
            {{ page }}
          </div>
        </div>
        <div class="py-1 px-3 bg-white text-blue-500">
          {{ page }}
        </div>
        <div v-if="page < page + 2" class="flex flex-row">
          <div
            v-for="page in range(page + 1, page + 2)"
            :key="page"
            class="py-1 px-3 bg-white text-slate-500 cursor-pointer"
            @click="handleChangePage(page)"
          >
            {{ page }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row space-x-2">
      <div
        class="py-1 px-3 bg-white text-slate-500 cursor-pointer"
        @click="handleChangePage(pages)"
      >
        {{ pages }}
      </div>
      <div
        class="py-1 px-3 bg-white text-slate-500 cursor-pointer"
        @click="handleChangePage(page + 1)"
      >
        Next
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: Number,
    pages: Number,
    perpage: Number,
    total: Number,
  },
  emits: ["changePage"],
  setup(props, { emit }) {
    const handleChangePage = (page) => {
      emit("changePage", page);
    };

    const range = function* (start, end, step = 1) {
      for (let i = start; i <= end; i += step) {
        yield i;
      }
    };

    return {
      handleChangePage,
      props,
      range,
    };
  },
};
</script>
