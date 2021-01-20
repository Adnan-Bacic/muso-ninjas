<template>
  <div>
    <form v-on:submit.prevent="handleSubmit">
      <h4>Create a New Playlist</h4>
      <input type="text" required placeholder="Playlist title" v-model="title">
      <textarea required placeholder="Playlist description..." v-model="description"></textarea>
      <!-- upload playlist image -->
      <label>Upload Playlist Cover Image</label>
      <input v-on:change="handleChange" type="file">
      <div class="error">{{ fileError }}</div>
      <div class="error"></div>

      <button v-if="!isPending">Create</button>
      <button v-else disabled>Saving...</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
    setup(){
        const { filePath, url, uploadImage } = useStorage()
        const { error, addDoc } = useCollection('playlists')
        const { user } = getUser()
        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)

        const handleSubmit = async () => {
            if(file.value){
                //console.log(title.value, description.value, file.value)

                isPending.value = true

                //pass file to function to upload file
                await uploadImage(file.value)
                //console.log('url', url.value)

                //add data to firestore
                const res = await addDoc({
                    title: title.value,
                    description: description.value,
                    userID: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: timestamp()
                })

                isPending.value = false

                if(!error.value){
                    //console.log('playlist added')

                    router.push({
                      name: 'PlaylistDetails', params: {
                        id: res.id
                      }
                    })
                }
            }
        }

        //allowed file extensions
        const types = ['image/png', 'image/jpeg', 'image/jpg']

        const handleChange = (e) => {
            const selectedFile = e.target.files[0]
            console.log(selectedFile)

            //only set file value if user picks a file
            //only allowed our file types
            if(selectedFile && types.includes(selectedFile.type)){
                file.value = selectedFile
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please select an iamge and file type must be: png, jpg, jpeg'
            }
        }

        return{
            title,
            description,
            fileError,
            isPending,
            handleSubmit,
            handleChange
        }
    }
}
</script>

<style>
  form {
    background: white;
  }
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>