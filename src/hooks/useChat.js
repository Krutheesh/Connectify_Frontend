import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';

import { getStreamToken, initializeChat } from '../services/chatService';
import useProfile from './useProfile';

const useChat = () => {
  const { id: targetUserId } = useParams();
  const { user: authUser } = useProfile();

  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState(null);
  const chatClientRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      if (!authUser || !targetUserId) return;

      try {
        setLoading(true);
        const { token } = await getStreamToken();
        const { client, channel } = await initializeChat({ authUser, targetUserId, token });

        chatClientRef.current = client;
        setChannel(channel);
      } catch (err) {
        console.error(err);
        toast.error('Could not connect to chat.');
      } finally {
        setLoading(false);
      }
    };

    init();

    return () => {
      chatClientRef.current?.disconnectUser();
    };
  }, [authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });
      toast.success('Video call link sent!');
    }
  };

  return { client: chatClientRef.current, channel, load:loading, handleVideoCall };
};

export default useChat;