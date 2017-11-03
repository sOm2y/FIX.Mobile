import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          setTimeout(()=>{
            resolve(true);
          }, 2000);
        } else {
          setTimeout(()=>{
            resolve(false);
          }, 2000);
        }
      })
      .catch(err => reject(err));
  });
};

