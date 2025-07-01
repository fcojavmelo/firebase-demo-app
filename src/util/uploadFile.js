import { getMetadata, getStorage, ref, uploadBytes } from "firebase/storage";
//import { v4 as uuid } from 'uuid';
import { firebaseConfig } from "../firebaseConfigFile";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const prefix = 'https://storage.googleapis.com/fir-test-2506c.firebasestorage.app/'

export const uploadFile = async (file, folderName) => {

    const fileExtension = file.type === 'image/png'
        ? '.png'
        : file.type === 'image/jpeg'
            ? '.jpg'
            : '';

    let filePath = folderName + '/' + file.name.split(".")[0] + fileExtension;

    console.log('trying to upload file: ' + filePath);

    let storageRef = ref(storage, filePath);

    let fileAlreadyExists = false;

    const checkIfFileAlreadyExists = async storageRef => {
        //check if image with same name and path already exists
        console.log('checking if file exists');
        try {
            const fileMetadata = await getMetadata(storageRef);
            fileAlreadyExists = true;
        } catch(error) {
            console.log(error.code);
            if (error.code === 'storage/object-not-found'){
                fileAlreadyExists = false;
            }
        }
    }

    do {
        filePath = folderName + '/' + file.name.split(".")[0] + '_' + Math.floor(Math.random() * 1000000) + fileExtension;
        storageRef = ref(storage, filePath);
        checkIfFileAlreadyExists(storageRef);
    }
    while (fileAlreadyExists);

    await uploadBytes(storageRef, file);

    return prefix + filePath;

};