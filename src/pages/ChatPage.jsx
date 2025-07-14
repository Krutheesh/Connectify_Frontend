import {
  Chat,
  Channel,
  ChannelHeader,
  Window,
  MessageList,
  MessageInput,
  Thread,
} from 'stream-chat-react';

import useChat from '../hooks/useChat';
import ChatLoader from '../components/ChatLoader';
import CallButton from '../components/CallButton';
import { useEffect } from 'react';
import { useNavigate } from 'react-router'; 
import useProfile from '../hooks/useProfile';
import { useSelector } from 'react-redux';
const ChatPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const { client, channel, load, handleVideoCall } = useChat();
  
  
  if (loading || load || !client || !channel) return <ChatLoader />;

 

  return (
    <div className="h-[90vh]">
      <Chat client={client} theme="messaging light">
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;