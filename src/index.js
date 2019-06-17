import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {Reducer} from './redux/reducer'
import * as serviceWorker from './serviceWorker';

const store = createStore(Reducer);
ReactDOM.render(
        <Provider store={store}>
            <Main />
        </Provider>, document.getElementById('root'));
serviceWorker.unregister();
