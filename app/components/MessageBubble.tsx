import Image from "next/image";
import { Message } from "../../typings";

type Props = {
  message: Message;
};
const MessageBubble = ({ message }: Props) => {
  const isUser = true;
  return (
    <div className={`flex w-fit max-w-md ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          src={message.profilePic}
          height={10}
          width={50}
          alt={"U"}
          className="rounded-full mx-2"
        />
      </div>
      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-red-400 text-right" : "text-green-400 text-left"
          }`}
        >
          {message.username}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit ${
              isUser ? "bg-red-400 order-2" : "bg-green-400"
            } text-white`}
          >
            <p>{message.message}</p>
          </div>
          <p
            className={`text-[0.65rem] italic ${
              isUser && "text-right"
            } px-2 text-gray-300`}
          >
            {new Date(message.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
