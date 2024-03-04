"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Google } from "@mui/icons-material";

const cookies = new Cookies();

export default function Auth() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(cookies.get("auth-tocken"));

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-tocken", result.user.refreshToken);
    } catch (error) {
      console.error(error);
    }

   router.push("/home");
    
  };
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center  bg-gradient-to-b from-yellow-200 to-yellow-600 gap-6">
      <h1 className="lg:text-4xl text-xl font-extrabold">
        Sign In with Google to Continue
      </h1>
      <button variant="contained" sx={{bgcolor:"red"}} onClick={handleSignInWithGoogle} className="lg:text-2xl text-lg rounded-3xl btn">
        Sign In With Google <Google/>
      </button>
    </div>
  );
}
