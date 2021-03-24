<template>
  <input class="main-header-search"   type="text"  @input="setFilter"  placeholder="Search "  v-model="filterBy.name"  />
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        name: "",
      },
    };
  },
  methods: {
    setFilter() {
      this.$emit("filtered", this.filterBy);
    },
  },
};
</script>

<style>
</style>