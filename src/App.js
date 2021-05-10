import React from 'react';
import Routes from './routes/routes';
import store from './store/store';
import { Provider, useSelector } from 'react-redux';
import 'lib-flexible';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import 'antd-mobile/dist/antd-mobile.css'; // or 'antd-mobile/dist/antd-mobile.less'
import 'antd/dist/antd.css';

const App = () => {
    return (
        <Provider store={store}>
            <Routes></Routes>
        </Provider>
    );
};

export default App;
