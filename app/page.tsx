import ChatInput from "./components/ChatInput";
import MessageList from "./components/MessageList";

const HomePage = () => {
  return (
    <main>
      {/* ChatList  */}
      <MessageList />
      {/* messageInput  */}
      <ChatInput />
    </main>
  );
};

export default HomePage;
