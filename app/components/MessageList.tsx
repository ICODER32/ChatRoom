"use client";
import { useEffect } from "react";
import useSWR from "swr";
import { clientPusher } from "../../pusher";
import { Message } from "../../typings";
import { fetcher } from "../../utils/fetchMessages";
import MessageBubble from "./MessageBubble";

type Props = {
  initialMessages: Message[];
};

const MessageList = ({ initialMessages }: Props) => {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", async (data: Message) => {
      if (messages?.find((message) => message.id === data.id)) return;
      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);
  return (
    <div className="space-y-5 px-5 pt-8 mb-32">
      {(initialMessages || messages)?.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};
export default MessageList;
