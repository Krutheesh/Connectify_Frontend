import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getVideoToken, initializeVideoCall } from '../services/videoService';
import useProfile from '../hooks/useProfile';

const useVideoCall = () => {
  const { id: callId } = useParams();
  const { user: authUser } = useProfile();

  const [loading, setLoading] = useState(true);
  const [call, setCall] = useState(null);
  const videoClientRef = useRef(null);

  useEffect(() => {
    const startCall = async () => {
      if (!authUser || !callId) return;

      try {
        setLoading(true);
        const { token } = await getVideoToken();
        const { client, call } = await initializeVideoCall({ authUser, callId, token });

        videoClientRef.current = client;
        setCall(call);
      } catch (err) {
        console.error('Video call initialization failed', err);
      } finally {
        setLoading(false);
      }
    };

    startCall();

    return () => {
      call?.leave();
    };
  }, [authUser, callId]);

  return { client: videoClientRef.current, call, loading };
};

export default useVideoCall;