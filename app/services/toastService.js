import { Toast } from "native-base";

export const toastShow = (message) => {
    Toast.show({
        text: message.text,
        type: message.type,
        buttonText: "Dismiss",
        duration: message.duration
    });  
} 