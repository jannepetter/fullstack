import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, voteAnecdote } from "./requests/anecdoteRequests";
import NotificationContext, {
  setNotification,
} from "./contexts/NotificationContext";
import { useContext } from "react";

const App = () => {
  const queryClient = useQueryClient();
  const [_, notificationDispatch] = useContext(NotificationContext);

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (data) => {
      const anecdotes = queryClient
        .getQueryData(["anecdotes"])
        .filter((a) => a.id !== data.id);

      const newAnecdotes = anecdotes
        .concat(data)
        .sort((a, b) => b.votes - a.votes);
      queryClient.setQueryData(["anecdotes"], newAnecdotes);
      setNotification(`anecdote '${data.content}' voted`, notificationDispatch);
    },
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote);
  };

  const anecdotes = result.data.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
