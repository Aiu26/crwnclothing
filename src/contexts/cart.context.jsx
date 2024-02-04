import { createContext, useState, useEffect } from 'react';

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

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, CartItem) => total + CartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);
	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, CartItem) => total + CartItem.quantity * CartItem.price,
			0
		);
		setCartTotal(newCartTotal);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCardItem(cartItems, productToAdd));
	};
	const removeItemFromCart = (productToRemove) => {
		setCartItems(removeCardItem(cartItems, productToRemove));
	};
	const clearItemFromCart = (productToClear) => {
		setCartItems(clearCardItem(cartItems, productToClear));
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
