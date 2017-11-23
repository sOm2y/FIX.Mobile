import { Toast } from "native-base";
export const toastShow = (title, type, duration) => {
    Toast.show({
        text: title,
        type: type,
        buttonText: "Dismiss",
        duration: duration
    });  
} 