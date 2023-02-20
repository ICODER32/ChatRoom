"use client";
import { useEffect } from "react";
import useSWR from "swr";
import { clientPusher } from "../../pusher";
import { Message } from "../../typings";
import { fetcher } from "../../utils/fetchMessages";
import MessageBubble from "./MessageBubble";
const MessageList = () => {
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
  useEffect(() => {
    const channel = clientPusher.subscribe("message");
    channel.bind("new-message", async (data: Message) => {
      if (messages?.find((message) => message.id === data.id)) return;
      if (!messages) {
        return mutate(fetcher);
      }
      mutate(fetcher, {
        optimisticData: [data, ...messages!],
        rollbackOnError: true,
      });
    });
    return () => {
      channel.unbind();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);
  return (
    <div className="space-y-5 px-5 pt-8 mb-32">
      {messages?.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};
export default MessageList;
