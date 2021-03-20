<template>
  <section>
      {{user}}
  </section>
</template>

<script>
export default {
      name: 'user-preview',
      props: {
    user: {
      type: Array,
    },
  },

}
</script>

<style>

</style>