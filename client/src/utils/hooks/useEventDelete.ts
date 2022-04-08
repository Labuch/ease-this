import { useState } from 'react';
import useRequest from './useRequest';


type Event = {
  name: string;
  description: string;
  date:Date;
};


function useEventDelete(): {
  deleteEvent: (eventId: string) => Promise<{
    error?: Error;
  }>;
  loading: boolean;
} {
  const request = useRequest<Event, Error>();

  const [loading, setLoading] = useState(false);

  async function deleteEvent(eventId: string) {
    if (!eventId) return {};

    setLoading(true);

    const { data, error } = await request(
      `/events/${eventId}`,
      {},
      'DELETE'
    );

    setLoading(false);

    return { data, error };
  }

  return {
    deleteEvent,
    loading,
  };
}

export default useEventDelete
