import { auth } from "./firebase";

export const getUserInfo = () => {
  const currentUser = auth.currentUser;
  const email = currentUser ? currentUser.email : "";
  const userName = currentUser ? currentUser.displayName : "";
  const photoURL = currentUser.photoURL ? currentUser.photoURL : "";

  console.log(email);
  console.log(userName);

  return {
    email: email,
    userName: userName,
    photoURL: photoURL,
    phoneNo: "",
    bloodGroup: "",
    age: "",
    weight: "",
    height: "",
    BMI: "",
    gender: "",
  };
};
