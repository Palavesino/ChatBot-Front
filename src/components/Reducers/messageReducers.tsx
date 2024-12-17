import { Message } from "../Interface/Message";

export const initialState: Message[] = JSON.parse(window.localStorage.getItem('messages') || '[]');

interface CountActionProps {
    type: string;
    payload?: Message;
    newState?: Message[];
}

// Tipos de acciones del carrito
export const MESSAGE_ACTION_TYPES = {
    ADD_TO_MESSAGE: 'ADD_TO_MESSAGE',
    REMOVE_FROM_MESSAGE: 'REMOVE_FROM_MESSAGE',
    CLEAR_MESSAGE: 'CLEAR_MESSAGE',
    DECREASE_CART_QUANTITY: 'DECREASE_CART_QUANTITY',
    SET_MESSAGE: 'SET_MESSAGE',
} as const;
// update localStorage with state for cart
export const updateLocalStorage = (state: Message[]) => {
    window.localStorage.setItem('messages', JSON.stringify(state))
}

export const messagesReducer = (state: Message[], action: CountActionProps): Message[] => {
    const { type: actionType, payload: actionPayload, newState } = action;
    switch (actionType) {
        case MESSAGE_ACTION_TYPES.ADD_TO_MESSAGE: {
            if (actionPayload) {

                // const messageInMessagesIndex = state.findIndex(item => item.id === actionPayload.id)
                       
                // const newState = messageInMessagesIndex >= 0
                // ? [
                //     ...state.slice(0, messageInMessagesIndex),
                //     {
                //         ...state[messageInMessagesIndex],
                //         // Aquí puedes agregar cualquier lógica adicional para actualizar el mensaje existente
                //         body: actionPayload.body, // Ejemplo: actualizar contenido
                //     },
                //     ...state.slice(messageInMessagesIndex + 1)
                // ]
                // : [
                //     ...state,
                //     actionPayload
                // ];

                const newState =[
                    ...state,
                    actionPayload
                ];

            // Actualizar almacenamiento local y devolver el nuevo estado
            updateLocalStorage(newState);
            return newState;
            }
            return state;
        }
        case MESSAGE_ACTION_TYPES.REMOVE_FROM_MESSAGE: {
            if (actionPayload) {
                const newState = state.filter(item => item.id !== actionPayload.id)
                    
                updateLocalStorage(newState)
                return newState;
            }
            return state;
        }
        case MESSAGE_ACTION_TYPES.CLEAR_MESSAGE: {
            updateLocalStorage([]);
            return [];
        }
        case MESSAGE_ACTION_TYPES.SET_MESSAGE: {
            if (newState) {
                updateLocalStorage(newState);
                return newState;
            }
            updateLocalStorage([]);
            return state;
        }
        default:
            return state;
    }
};