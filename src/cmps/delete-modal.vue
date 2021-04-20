<template>
  <div class="delete-modal-container">

  <button class="delete-post-btn" @click.stop="removePost()" > Delete Story </button> 
  </div>
</template>

<script>
export default {

  methods: {
      removePost(){
         this.$emit("removepost")
      }
  }
}
</script>

<style>

</style>