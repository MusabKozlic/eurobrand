import { ref, uploadBytes } from 'firebase/storage';
import { storage } from "../../../../firebase";
import { getDownloadURL } from 'firebase/storage';

const uploadImage = async (file, brand, model) => {
    const storageRef = ref(storage, `${brand}/${model}/${URL.createObjectURL(file)}`);
    await uploadBytes(storageRef, file);
    // Optionally, you can get the download URL after upload for further processing
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };


export default uploadImage;