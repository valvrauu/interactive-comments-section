import { createContext, useContext } from 'react';
import data from '../data/comments.json';

export const CurrentUserContext = createContext(null);
export const useCurrentUser = () => useContext(CurrentUserContext);

export function CurrentUserProvider({ children }) {
    return (
        <CurrentUserContext.Provider value={data.currentUser}>
            {children}
        </CurrentUserContext.Provider>
    );
}
