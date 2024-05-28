import { createContext, useContext, useReducer } from 'react';
import { commentsReducer } from '../reducers/commentsReducer';
import data from '../data/comments.json';

export const CommentsContext = createContext(null);
export const CommentsDispatchContext = createContext(null);
export const useComments = () => useContext(CommentsContext);
export const useCommentsDispatch = () => useContext(CommentsDispatchContext);

export function CommentsProvider({ children }) {
    const [comments, dispatch] = useReducer(commentsReducer, data.comments);

    return (
        <CommentsContext.Provider value={comments}>
            <CommentsDispatchContext.Provider value={dispatch}>
                {children}
            </CommentsDispatchContext.Provider>
        </CommentsContext.Provider>
    );
}
