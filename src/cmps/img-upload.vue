<template>
<div>
  <img  class="image-new-story" v-if="myImage" :src="myImage" width="" height="">
              <div class="flex">
                    <label v-if="!isLoading&&!myImage" for="imgUploader"  @drop.prevent="handleFile" @dragover.prevent="dragOver"  @dragleave="isDragOver = false"  >
                        <img  class="input-img"  src="https://res.cloudinary.com/omerphoto/image/upload/v1618335628/upload3_te8f2v.png"  >
                    </label>


                      <!-- <img alt=""   v-if="isLoading"  class="input-img" importance="auto" loading="auto" src="https://i.pinimg.com/originals/c7/67/34/c76734f9045eac95df71b9816ac53b08.gif"> -->
                      <!-- <img    v-if="isLoading"  alt="" id="" class="uploadImg-user-details"  role="presentation" src="https://assets2.ello.co/uploads/asset/attachment/2121936/ello-optimized-71aceb91.gif"> -->
                      <img  v-if="isLoading"  alt="" id="" class="uploadImg-user-details"  role="presentation" src="https://assets1.ello.co/uploads/asset/attachment/2121938/ello-optimized-c1c988e6.gif">

                      <!-- <img   v-if="isLoading" class=""  src="https://motiongraphicsphoebe.files.wordpress.com/2018/10/animated-loading-c397-1.gif"> -->
                      <!-- <img   v-if="isLoading" class="input-img"  src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif"> -->

                  
                 <!-- <img  class="input-img"  src="https://res.cloudinary.com/omerphoto/image/upload/v1617824183/iconfinder_file_add_48761_tfhfua.png" width="" height=""> -->
                 <!-- <img  class="input-img"  src="https://res.cloudinary.com/omerphoto/image/upload/v1618335628/upload3_te8f2v.png"> -->
                <input v-if="!myImage"  id="imgUploader" class="file-btn round"  type="file" accept="image/*" @change="onUploadImg($event)" >
              </div>

</div>
</template>

<script>
import { uploadImg2 } from "@/services/img-upload2.service.js";
import { uploadImg } from "@/services/img-upload.service.js";
export default {
     data() {
        return {
                txt :  null,
                myImage :  null,
                isSmilyModal : false,
                isLoading: false

        }
      },
  methods: {
    dragOver(ev) {
      this.isDragOver = true;
    },
    handleFile(ev) {
      let file;
      if (ev.type === "change") file = ev.target.files[0];
      else if (ev.type === "drop") file = ev.dataTransfer.files[0];
      this.onUploadImg(file);
    },

    async onUploadImg(file) {
      this.isLoading = true;
     // this.isDragOver = false;
      const res = await uploadImg2(file);
      const uploadedImg = res.url;
      this.$emit("imgSaved", uploadedImg);
      //console.log('the img from service : ',uploadedImg)
      this.isLoading = false;
    },
    // async uploadImage(ev) {
    //   this.isLoading = true
    //   const res = await uploadImg2(ev)
    //   this.myImage = res.url
    //   console.log('onUploadImg -> res', res)
    //   this.isLoading = false
    // },
  },
};
</script>

<style>
.loader {
  height: 150px;
}

label img {
  height: 100px;
  cursor: pointer;
  transition: height 0.6s;
}

input {
  width: 0;
  height: 0;
}
.drag {
  color: grey;
  display: inline-block;
  padding: 30px 5px;
  width: 220px;
  border: 1px dashed gray;
  border-radius: 8px;
}
</style>