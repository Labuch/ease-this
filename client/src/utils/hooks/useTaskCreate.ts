import useRequest from './useRequest';


type Event = {
  name: string;
  description: string;
  date:Date;
};

function useEventCreate(): {
  create: (
    event: Event,
  ) => Promise<{ data?: Event; error?: Error }>;
} {
  const request = useRequest<Event, Error>();

  async function create(
    event: Event
  ) {

    const { data, error } = await request(
      '/tasks',
      event,
      'POST'
    );

    return { data, error };
  }

  return { create };
}

export default useEventCreate;
