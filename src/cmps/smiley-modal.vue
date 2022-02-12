<template>
        <div class="inner-smiley-modal">
            <div class="most-popular">Most Popular</div>
            <div class="grid-container">
            <div class="grid-smiley">
                <div class="smiley-img-modal-container" v-for="s in smiles" :key="s._id">
                    <img :src="s.url" class="smiley-img-modal"  @click="addIcon(s._id)"  alt="smiley image"/>
                </div>
            </div>
            </div>
        </div>
</template>

<script>
export default {
  props: ["smiles"],
  data() {
      return {
        isLiked : false,
        txt : '',
      
    
    };
  },
  created() {
      console.log('load smiles')
  },
  methods: {
    addIcon(id){
      const smile = this.smiles.filter(smile => {
        return (smile._id===id)
      })
        this.$emit("smileyToShow",smile)

    },
  },
};
</script>

<style>
</style>