import React from "react";
import App from "./App";
import  ReactDOM  from "react-dom";
import {AppProvider} from './components/context/Context'
ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
        <App/>
        </AppProvider> 
    </React.StrictMode>,document.getElementById('root')
)