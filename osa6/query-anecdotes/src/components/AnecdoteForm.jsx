import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAnecdote } from "../requests/anecdoteRequests";
import { useContext } from "react";
import NotificationContext, {
  setNotification,
} from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [_, notificationDispatch] = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (data) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(data));
      setNotification(
        `anecdote '${data.content}' created`,
        notificationDispatch
      );
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.error || "error happened";
      setNotification(errorMsg, notificationDispatch);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
