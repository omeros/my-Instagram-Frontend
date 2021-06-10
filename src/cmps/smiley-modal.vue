<template>
        <div class="inner-smiley-modal">
            <div class="most-popular">Most Popular</div>
            <div class="grid-smiley">
                <div class="smily-img" v-for="s in smiles" :key="s._id">
                    <img :src="s.url" @click="addIcon(s._id)" />
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