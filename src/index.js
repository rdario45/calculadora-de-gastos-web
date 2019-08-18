import React from 'react';
import ReactDOM from 'react-dom';
// vendors styles
import 'bootstrap/dist/css/bootstrap.css';
import 'alertifyjs/build/css/alertify.min.css'
import 'react-datetime/css/react-datetime.css'
// user styles
import './index.scss';
// load config
import './config/config.js'
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();