import api from '../services/api';
import { StreamVideoClient } from '@stream-io/video-react-sdk';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
let videoClient = null;

export const getVideoToken = async () => {
  const res = await api.get('/api/chat/token');
  return res.data; // { token: '...' }
};

export const initializeVideoCall = async ({ authUser, callId, token }) => {
  if (!videoClient) {
    videoClient = new StreamVideoClient({
      apiKey: STREAM_API_KEY,
      user: {
        id: authUser._id,
        name: authUser.name,
        image: authUser.profilePic,
      },
      token,
    });
  }

  const call = videoClient.call('default', callId);
  await call.join({ create: true });

  return { client: videoClient, call };
};