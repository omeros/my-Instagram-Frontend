<template>
        <div class="inner-smiley-modal">
            <div class="most-popular">Most Popular</div>
            <div class="grid-smiley">
                <div class="smily-img" v-for="s in smiles" :key="s._idx">
                    <img :src="s.url" @click="addIcon(s._idx)" />
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
     // console.log('load smiles')
    },
 methods: {
        addIcon(id){
      //console.log('icon id : ',id)
      var smile = this.smiles.filter(smile => {
        return (smile._idx===id)
      })
        //console.log('smile  : ',smile) 
        this.$emit("smileyToShow",smile)
        // this.$emit("SmileyToShow",smile[0].emoji)
       // this.txt += String.fromCodePoint(smile[0].emoji); 
    },
 },
};
</script>

<style>
</style>