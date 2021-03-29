<template>
  <img :src="img"/>
  <p>
    <label for="photo">Select Photo to Upload:</label>
    <input type="file" name="photo" @change="submit">
  </p>
  <div>
    <!--<input type="range" name="redness" @input="changeRed" min="0" max="100">-->
    <input type="range" name="redness" @input="changeRed" min="-100" max="100">
    <label for="redness">Saturation</label>
  </div>
</template>

<script>
import jimp from 'jimp'

const DB_NAME = 'photodb'
const DB_VERSION = 1
const DB_OBJECT_STORE_NAME = 'photos'

export default {
  name: 'ChangeSaturation',
  props: {
    msg: String
  },
  data() {
    return {
      originalImgFile: null,
      img: null,
      prevSliderAmount: null,
      db: null
    }
  },
  async created() {
    this.db = await this.getDb();
  },
  methods: {
    async submit(e) {
      console.log('called submit!')
      // want to make two copies of the file
      const file = e.target.files[0];
      // want those copies in the db
      await this.addPhotoToDb(file, 'original');
      await this.addPhotoToDb(file, 'displayed');
      const originalIMG = await this.getPhotoFromDb('original')
      console.log(originalIMG)
      this.img = URL.createObjectURL(originalIMG.photo);
    },
    async changeRed(e) {
      const sliderAmount = e.target.value;
      //do nothing if slider amount same as last time.
      if(this.prevSliderAmount != sliderAmount){
        //overwrite displayed photo with original.
        const originalPhoto = await this.getPhotoFromDb('original')
        await this.overWriteWithOriginalPhoto(originalPhoto)
        const displayedImg = await this.getPhotoFromDb('displayed')
        const displayedImgObjURL = await URL.createObjectURL(displayedImg.photo)
        //const imgUrlString = String(disla
        const image = await jimp.read(displayedImgObjURL);
        //image.color([{ apply: 'saturate', params: [sliderAmount] }]);
        image.getBuffer(jimp.MIME_PNG, (err, binary) => {
          const buffer = binary.buffer;
          this.img = URL.createObjectURL(new Blob([buffer]));
        })
      }
      this.prevSliderAmount = sliderAmount;
    },
    async addPhotoToDb(photo, name) {
      return new Promise((resolve, reject) => {
        console.log(reject)
        let trans = this.db.transaction([DB_OBJECT_STORE_NAME],'readwrite');
        trans.oncomplete = e => {
          console.log(e)
          resolve(e.target.result);
        };
        let store = trans.objectStore(DB_OBJECT_STORE_NAME);
        store.add({photo: photo, name: name});
      });
    },
    async getPhotoFromDb(name) {
      return new Promise((resolve, reject) => {
        console.log(reject)
        let trans = this.db.transaction([DB_OBJECT_STORE_NAME],'readonly');
        trans.oncomplete = e => {
          console.log(e)
          resolve(returnedPhoto);
        };
        let returnedPhoto = null;
        let store = trans.objectStore(DB_OBJECT_STORE_NAME);
        store.openCursor().onsuccess = e => {
          let cursor = e.target.result;
          if (cursor) {
            console.log(cursor.value)
            if (cursor.value.name === name){
              console.log('thinks that it found the original photo')
              returnedPhoto = cursor.value
            }
            cursor.continue();
          }
        };
      });
    },
    async getDb() {
      return new Promise((resolve, reject) => {

        let request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = e => {
          console.log('Error opening db', e);
          reject('Error');
        };

        request.onsuccess = e => {
          resolve(e.target.result);
        };

        request.onupgradeneeded = e => {
          console.log('onupgradeneeded');
          let db = e.target.result;
          db.createObjectStore(DB_OBJECT_STORE_NAME, { autoIncrement: true, keyPath:'id' });
        };
      });
    },
    async overWriteWithOriginalPhoto(original){
      return new Promise((resolve, reject) => {
        console.log(reject)
        let trans = this.db.transaction([DB_OBJECT_STORE_NAME],'readwrite');
        trans.oncomplete = e => {
          console.log(e)
          resolve();
        };
        let store = trans.objectStore(DB_OBJECT_STORE_NAME);

        // want to grab the original img from our db
        console.log('in OVERWRITE')
        console.log(original)
        store.put({photo: original.photo, name: 'displayed'});
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
