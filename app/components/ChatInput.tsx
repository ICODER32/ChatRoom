"use client";

import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../../typings";
import useSWR from "swr";
import { fetcher } from "../../utils/fetchMessages";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    const messageToBeSended = input;
    const id = uuid();
    const message: Message = {
      id,
      message: messageToBeSended,
      createdAt: Date.now(),
      username: "Elon Musk",
      profilePic:
        "https://cdn.britannica.com/45/223045-050-A6453D5D/Telsa-CEO-Elon-Musk-2014.jpg",
      email: "ibtisamanwar32@gmail.com",
    };
    const uploadMessageToDb = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());
      return [data.message, ...messages!];
    };
    setInput("");
    await mutate(uploadMessageToDb, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };
  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 w-full flex lg:px-10 lg:py-5 md:px-1 md:py-1 bg-white"
    >
      <input
        className="rounded flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="Enter Message here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
      />
      <button
        disabled={!input}
        className="bg-red-400   transition-all hover:bg-gray-100 hover:text-black text-white lg:font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
