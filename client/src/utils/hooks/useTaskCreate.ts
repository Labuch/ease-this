import useRequest from './useRequest';


type Task = {
  name: string;
  description: string;
  date:Date;
};

function useTaskCreate(): {
  create: (
    task: Task,
  ) => Promise<{ data?: Task; error?: Error }>;
} {
  const request = useRequest<Task, Error>();

  async function create(
    event: Task
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

export default useTaskCreate;
