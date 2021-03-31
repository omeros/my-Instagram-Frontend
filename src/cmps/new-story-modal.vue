<template>
  <div class="main-modal padding" >
 
   <div class="modal-header2 flex "  v-bind:class="{left: myImage }">
      
          <img  class="image" v-if="myImage" :src="myImage" width="" height="">

          <div class="flex">
            <input v-if="!myImage"  class="file-btn round"  type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
          </div>
          <button >   <img  class="save-btn" v-if="myImage" src="https://res.cloudinary.com/omerphoto/image/upload/v1617099828/save_q9xvig.png" width="20" height="20">
          </button>  
    </div>

  </div>
</template>

<script>
export default {
     data() {
        return {
                txt :  null,
                myImage :  null,
        }
      },

  methods: {
        uploadImage(e){
          

            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.myImage = e.target.result;
                console.log('somethinggg',this.previewImage);
            };
                  
                      
        }
}
}
</script>

<style>

</style>