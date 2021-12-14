import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {
    productListReducer,
    productDetailsReducer,
    productCategoryListReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    categoryCreateReducer,
    categoryDeleteReducer,
    categoryUpdateReducer,
    categoryDetailsReducer,
    pltShowReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
    searchCategoryReducer, 
    searchKeywordReducer,
    productRecommendReducer,
    } from './reducers/searchReducers'
import {
    userSigninReducer,
    userRegisterReducer, 
    userListReducer,
    userDeleteReducer,
    userUpdateProfileReducer,
    userDetailsReducer,
} from './reducers/userReducers';

import {
    orderCreateReducer,
    orderMineListReducer,
    orderListReducer,
    orderDeleteReducer,
    orderUpdateReducer,
    orderDetailsReducer,
    pltShowOrderReducer,
  } from './reducers/orderReducers';




const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [], 
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod: 'PayPal',
    },
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
          ? JSON.parse(localStorage.getItem('userInfo'))
          : null,
          
      },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    keywordSearch: searchKeywordReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderMineList: orderMineListReducer,
    categorySearch: searchCategoryReducer,
    listCategory: productCategoryListReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderUpdate: orderUpdateReducer,
    productsRecommend: productRecommendReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    orderDetails: orderDetailsReducer,
    categoryCreate: categoryCreateReducer,
    categoryDelete: categoryDeleteReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryDetails: categoryDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDetails: userDetailsReducer,
    pltShow: pltShowReducer,
    pltOrder: pltShowOrderReducer,
});


const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;