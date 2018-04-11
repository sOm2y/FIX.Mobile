import { Toast } from "native-base";

export const toastShow = (payload) => {
    Toast.show({
        text: payload.text,
        type: payload.type,
        buttonText: "Dismiss",
        duration: payload.duration
    });  
} 