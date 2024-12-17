import React, { useContext, createContext, ReactNode, useReducer } from 'react';
import { Message } from '../Interface/Message';
import { initialState, MESSAGE_ACTION_TYPES, messagesReducer } from '../Reducers/messageReducers';


type MessagesContextProps = {
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    addToMessages: (item: Message) => void;
    removeFromMessages: (item: Message) => void;
    clearMessages: () => void;
};

export const MessagesContext = createContext<MessagesContextProps | undefined>(undefined);

export function useMessages() {
    const context = useContext(MessagesContext);
    if (context === undefined) {
        throw new Error('useMessages must be used within a MessagesProvider');
    }
    return context;
}
function useMessagesReducer() {
    const [state, dispatch] = useReducer(messagesReducer, initialState);
    const addToMessage = (message: Message) => dispatch({ type: MESSAGE_ACTION_TYPES.ADD_TO_MESSAGE, payload: message });
    const removeFromCart = (message: Message) => dispatch({ type: MESSAGE_ACTION_TYPES.REMOVE_FROM_MESSAGE, payload: message })
    const clearCart = () => dispatch({ type: MESSAGE_ACTION_TYPES.CLEAR_MESSAGE });
    const setCart = (messages: Message[]) => dispatch({ type: MESSAGE_ACTION_TYPES.SET_MESSAGE, newState: messages })
    return { state, addToCart: addToMessage, removeFromCart, clearCart,setCart };
}

export const MesageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { state, addToCart, removeFromCart, clearCart, setCart } = useMessagesReducer();

    return (
        <MessagesContext.Provider value={{ messages: state, setMessages: setCart, addToMessages: addToCart, removeFromMessages: removeFromCart, clearMessages: clearCart}}>
            {children}
        </MessagesContext.Provider>
    );
};

