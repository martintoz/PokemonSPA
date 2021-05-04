import { createStore, applyMiddleware, compose } from 'redux';
// import { createStore } from 'redux';
import rootReducer from '../reducer';
import thunk from "redux-thunk";

// const store = createStore(
    //     rootReducer,
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    //     // applyMiddleware(thunk)
    // );

    const composeEnhacer =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(rootReducer, composeEnhacer(applyMiddleware(thunk)));

//ANTES


// import { createStore } from 'redux';

// import rootReducer from '../reducer';


// export const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// );