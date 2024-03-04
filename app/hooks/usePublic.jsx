"use client"
import { useState } from "react"

export const usePublic = ()=>{
    const [roomName,setRoomName]=useState("")

    return {roomName,setRoomName}
}