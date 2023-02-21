import { Message } from "../typings";
import ChatInput from "./components/ChatInput";
import MessageList from "./components/MessageList";

const HomePage = async () => {
  const data = await fetch(`http://localhost:3000/api/getMessages`).then(
    (res) => res.json()
  );
  const messages: Message[] = data.messages;
  return (
    <main>
      {/* ChatList  */}
      <MessageList initialMessages={messages} />
      {/* messageInput  */}
      <ChatInput />
    </main>
  );
};

export default HomePage;
