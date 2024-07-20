import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    const userEmail = localStorage.getItem("currentUserEmail");
    switch (action.type) {
        case "ADD":
            const updatedState = [...state, {
                id: action.id,
                name: action.name,
                desc: action.desc,
                img: action.img,
                price: action.price,
                qty: action.qty
            }];
            localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedState));
            return updatedState;
        case "UPDATE":
            const newState = state.map(item =>
                item.id === action.id
                    ? { ...item, qty: item.qty+action.qty }
                    : item
            );
            localStorage.setItem(`cart_${userEmail}`, JSON.stringify(newState));
            return newState;
        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index, true);
            localStorage.setItem(`cart_${userEmail}`, JSON.stringify(newArr));
            return newArr;
        case "SET_CART":
            return action.cart;
        case "RESET_CART":
            const prevCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
            return prevCart
        default:
            console.log("error in Reducer");
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        const userEmail = localStorage.getItem('currentUserEmail');
        if (userEmail) {
            const savedCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`));
            if (savedCart) {
                dispatch({ type: "SET_CART", cart: savedCart });
            }
        }
    }, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
