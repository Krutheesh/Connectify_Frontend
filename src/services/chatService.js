// ✅ File: src/services/chatService.js
import { StreamChat } from 'stream-chat';
import api from './api';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
let chatClient = null;

export const getStreamToken = async () => {
  const res = await api.get('/api/chat/token');
  return res.data; // { token: '...' }
};

export const initializeChat = async ({ authUser, targetUserId, token }) => {
  if (!chatClient) {
    chatClient = StreamChat.getInstance(STREAM_API_KEY);
  }

  // Avoid re-connecting same user
  if (!chatClient?.userID) {
    await chatClient.connectUser(
      {
        id: authUser._id,
        name: authUser.fullName,
        image: authUser.profilePic,
      },
      token
    );
  }

  const channelId = [authUser._id, targetUserId].sort().join('-');

  const channel = chatClient.channel('messaging', channelId, {
    members: [authUser._id, targetUserId],
  });

  await channel.watch();

  return { client: chatClient, channel };
};
