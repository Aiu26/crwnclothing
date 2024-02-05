import { configureStore, compose, applyMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
	Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore(
	{ reducer: rootReducer },
	undefined,
	composedEnhancers
);
