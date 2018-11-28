// src/js/components/App.js
import React from "react";
import ListComponent from "./ListComponent";
import FormComponent from "./FormComponent";
import CountComponent from "./CountComponent";
import "./AppComoponentDis.css"

const App = () => (
  <div className="row mt-5">
	<div className="col order-md-2">
	  <h2>Add To Do</h2>
	  <FormComponent />
	 </div>
      <div className="col order-md-1">
          <table>
              <tbody>
              <tr>
                  <td width={"80%"}> <h2>To Do List </h2> </td>
                  <td > <CountComponent /></td>
              </tr>
              </tbody>
          </table>
          <ListComponent />
      </div>
  </div>
);

export default App;