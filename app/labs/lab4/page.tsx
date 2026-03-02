"use client";

import ClickEvent from "./clickevent";
import PassingDataOnEvent from "./passingdataonevent";
import PassingFunctions from "./passingfunctions";
import Counter from "./counter";
import BooleanStateVariables from "./booleanstatevariables";
import StringStateVariables from "./stringstatevariables";
import DateStateVariable from "./datestatevariable";
import ObjectStateVariable from "./objectstatevariable";
import ArrayStateVariable from "./arraystatevariable";
import ParentStateComponent from "./parentstatecomponent";
import QueryCalculator from "./url-encoding/query-params/page";
import PathCalculator from "./url-encoding/path-params/[a]/[b]/page";
import UrlEncoding from "./query-parameters";
import Link from "next/link";
import Store from "./store";
import { Provider } from "react-redux";
import TodoList from "./redux/todos/todolist";

export default function Lab4() {
   function sayHello() { 
    alert("Hello"); 
  } 
  return (
    <Provider store={Store}>
      <div id="wd-passing-functions">
        <h2>Lab 4</h2>

        <ClickEvent/>

        <PassingDataOnEvent/>

        <PassingFunctions theFunction={sayHello}/>

        <Counter/>

        <BooleanStateVariables/>

        <StringStateVariables/>

        <DateStateVariable/>

        <ObjectStateVariable/>

        <ArrayStateVariable/>

        <ParentStateComponent/>

        <QueryCalculator/>

        <PathCalculator/>

        <UrlEncoding/>

        <Link href="./lab4/redux">Redux Examples</Link>

        <TodoList/>


      </div>
    </Provider>
);}