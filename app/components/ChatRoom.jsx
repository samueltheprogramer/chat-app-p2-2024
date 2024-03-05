"use client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../config/firebase";

import CharacterLimitedTextField from "./CharacterLimitedTextField";
import Message from "./Message";
import { Send } from "@mui/icons-material";

export default function ChatRoom({ room }) {
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsuscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      photoURL: auth.currentUser.photoURL,
      room,
    });

    setNewMessage("");
  };

  const handleDeleteMeassage = async (id, userId) => {
    if (auth.currentUser.uid === userId) {
      const messageDocs = doc(db, "messages", id);
      await deleteDoc(messageDocs);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center bg-yellow-500 font-extrabold ring ring-black rounded-md m-4 text-black ">
          Wellcome to :{room}
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <div className=" border-4 border-black mb-4 w-80">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-2 m-2">
              <div className="flex flex-col justify-center items-center">
                <img
                  className="rounded-full w-5 h-5 text-black"
                  src={message.photoURL}
                  alt="pic"
                />
                <span className="font-extrabold text-xs text-ellipsis text-black">
                  {message.user}
                </span>
              </div>

              <Message text={message.text} />
              <button
                className="btn w-1 rounded-full bg-yellow-500 btn-xs"
                onClick={() => handleDeleteMeassage(message.id, message.userId)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <CharacterLimitedTextField
            maxLength={100}
            setNewMessage={setNewMessage}
            newMessage={newMessage}
            placeholder="Type your message here"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn bg-blue-500 btn-sm text-black" type="submit">
            Send <Send />
          </button>
        </form>
      </div>
    </div>
  );
}
