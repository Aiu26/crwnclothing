import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

const addCardItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(CartItem) => CartItem.id === productToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map((CartItem) =>
			CartItem.id === productToAdd.id
				? { ...CartItem, quantity: CartItem.quantity + 1 }
				: CartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCardItem = (cartItems, productToRemove) => {
	const existingCartItem = cartItems.find(
		(CartItem) => CartItem.id === productToRemove.id
	);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter((CartItem) => CartItem.id !== productToRemove.id);
	}
	return cartItems.map((CartItem) =>
		CartItem.id === productToRemove.id
			? { ...CartItem, quantity: CartItem.quantity - 1 }
			: CartItem
	);
};

const clearCardItem = (cartItems, productToClear) => {
	return cartItems.filter((CartItem) => CartItem.id !== productToClear.id);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
});

const CART_ACTION_TYPES = {
	SET_CART_ITEMS: 'SET_CART_ITEMS',
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		default:
			throw new Error(`unhandled type of ${type} in cartReducer`);
	}
};

export const CartProvider = ({ children }) => {
	const [{ cartItems, cartCount, isCartOpen, cartTotal }, dispatch] =
		useReducer(cartReducer, INITIAL_STATE);

	const updateCartItemsReducer = (newCartItems) => {
		const newCartCount = cartItems.reduce(
			(total, CartItem) => total + CartItem.quantity,
			0
		);
		const newCartTotal = cartItems.reduce(
			(total, CartItem) => total + CartItem.quantity * CartItem.price,
			0
		);

		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
				cartItems: newCartItems,
				cartTotal: newCartTotal,
				cartCount: newCartCount,
			})
		);
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCardItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};

	const setIsCartOpen = (bool) => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
	};

	const removeItemFromCart = (productToRemove) => {
		const newCartItems = removeCardItem(cartItems, productToRemove);
		updateCartItemsReducer(newCartItems);
	};
	const clearItemFromCart = (productToClear) => {
		const newCartItems = clearCardItem(cartItems, productToClear);
		updateCartItemsReducer(newCartItems);
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartItems,
		cartTotal,
		cartCount,
	};
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
