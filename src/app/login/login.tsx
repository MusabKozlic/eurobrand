"use client";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { signInWithGoogle } from "../../../auth";
import { useRouter } from "next/navigation";


export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCookie = Cookies.get("user");
      if(!userCookie){
        const user = await signInWithGoogle();
        console.log(user);
        if(user){
          Cookies.set('user', JSON.stringify(user.email), { expires: 2 });
          Cookies.set('photoUrl', JSON.stringify(user.photoURL), { expires: 2 })
          router.push("/admin/products");
        }else {
          router.push("/");
        }
      }
      // Redirect or handle successful login
    } catch (error) {
      console.log("error: " + error)
    }
  };

  return <>
      <Button onClick={() => {handleLogin()}}>LOGIN</Button>
  </>;
}
