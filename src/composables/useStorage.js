import { projectStorage } from '../firebase/config'
import { ref } from "vue"
import getUser from "./getUser"

const { user } = getUser()

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        //file path: covers folder, user id folder, filename
        filePath.value = `covers/${user.value.uid}/${file.name}`

        //path in storage
        const storageRef = projectStorage.ref(filePath.value)

        try{
            //upload image
            const res = await storageRef.put(file)
            //url of file
            url.value = await res.ref.getDownloadURL()
        }catch(err){
            console.warn(err.message)
            error.value = err.message
        }
    }

    const deleteImage = async (path) => {
        const storageRef = projectStorage.ref(path)

        try {
            await storageRef.delete()
        } catch (err) {
            console.warn(err.message)
            error.value = err.message
        }
    }

    return {
        url,
        filePath,
        error,
        uploadImage,
        deleteImage
    }
}

export default useStorage;