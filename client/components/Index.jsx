import React from 'react';
import ReactDOM from 'react-dom';
import AppWithRouter from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router
} from 'react-router-dom';

ReactDOM.render(<Router><AppWithRouter /></Router>, document.getElementById('app'));
