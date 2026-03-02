"use client";

import HelloRedux from  "./hello";
import CounterRedux from "./counterredux";
import AddRedux from "./addredux";

import { Provider } from "react-redux";
import Store from "../store";


export default function ReduxExamples() { 
  return ( 
    <Provider store={Store}>
      <div> 
        <h2>Redux Examples</h2> 

      <HelloRedux/>

      <CounterRedux/>

      <AddRedux/>
    </div> 
    </Provider>
  ); 
}