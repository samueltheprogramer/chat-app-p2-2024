"use client";

import { useRef, useState } from "react";

import Link from "next/link";
import ChatRoom from "../components/ChatRoom";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { addDoc, collection } from "firebase/firestore";

const cookies = new Cookies();

export default function Page() {
  const router = useRouter();
  const [ roomName, setRoomName] = useState("");
  const inputRoomNameRef = useRef(null)

  const handleGo =async()=>{
    setRoomName(inputRoomNameRef.current.value)
   
  }
  
  const handleNewRoom =()=>{
    setRoomName("")
  }

  const handleSignOut=async ()=>{
    await signOut(auth)
    cookies.remove("auth-tocken")
    router.push("/")
  }
  return (
    <div className="border ">
      
      <h1 className="bg-yellow-500 w-full text-center font-extrabold text-3xl">Chat App </h1>
      <div className="  flex justify-center items-center border-2 ">
      <div className=" border-4 border-black rounded-2xl bg-yellow-400 mt-4 flex   justify-center items-center lg:w-[500px] w-[350px] gap-10 m-2">
        <div className="flex flex-col gap-2 justify-center items-center">
        <label  className="text-center label font-serif font-extrabold" htmlFor="">Enter Room Name:</label>
        <input className="lg:w-60 w-40 h-8 ring-black ring input" type="text"  ref={inputRoomNameRef} />
        <button className="lg:w-60 w-40  btn h-8" onClick={ handleGo}>Go !</button>
        <button className="lg:w-60 w-40  btn h-8" onClick={ handleNewRoom}>NewRoom!</button>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 ">
        <Image className="rounded-full" src={auth?.currentUser?.photoURL} width={50} height={50} alt="userphoto"/>
      <button className=" flow glass bg-yellow-600 w-20  rounded-xl " onClick={handleSignOut}>sign out</button>
      </div>  
          </div>
      </div>

      <div className="mt-10">
        {(roomName)?<ChatRoom room={roomName} />:""}

      </div>
      <div>
        <h1 className="bg-gray-300 mt-10 text-center">crafted by Priya and Viji team</h1>
       </div>
    </div>
  );
}
