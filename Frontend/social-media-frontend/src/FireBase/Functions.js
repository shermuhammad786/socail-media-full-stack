import { ref, storage, uploadBytes, getDownloadURL} from "./firebaseConfig";

export const uploadFile = async (file, fileName) => {
    try {
        // Create a storage reference with the specified file name
        const storageRef = ref(storage, fileName);

        // Upload the file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(snapshot.ref);

        // console.log(downloadURL, "=====================downloadURL")

        return {
            status: true,
            message: "File uploaded successfully",
            downloadURL: downloadURL
        };
    } catch (error) {
        return {
            status: false,
            message: error.message
        };
    }
};

