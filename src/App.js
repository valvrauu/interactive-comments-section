import { CommentsProvider } from './contexts/CommentsContext';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import ListComments from './components/ListComments';
import AddComment from './components/AddComment';

function App() {
  return (
    <div className="App">
      <main>
        <CommentsProvider>
          <CurrentUserProvider>
            <ListComments />
            <AddComment />
          </CurrentUserProvider>
        </CommentsProvider>
      </main>
    </div>
  );
}

export default App;
