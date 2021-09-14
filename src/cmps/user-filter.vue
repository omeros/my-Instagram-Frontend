<template>
 <div> 
    <input class="main-header-search"   type="text"  @input="setFilter"  placeholder="Search "  v-model="filterBy.name"  />
 </div>
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