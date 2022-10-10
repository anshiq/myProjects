import React, { useState,useEffect } from "react";
import male from "../images/maleProfile.jpg";
import female from "../images/femaleProfile.jpg";
import "./selectedEmployee.css";
export default function Employees(props) {
  const [selectTeam, setSelectTeam] = useState(JSON.parse(localStorage.getItem('selectedTeam'))|| 'TeamB');

  const handleEmployeeSelection = (event) => { // editing the object array containing employees.
    const tansformedEmployee = props.Employee.map((employee) =>
      employee.id === parseInt(event.currentTarget.id) // if employeeid = currentid of employee means to select the employee on which it is clicked in the array.
        ? (employee.teamName === selectTeam) // and if also it is selected or not then tougle.
          ? { ...employee, teamName: "" }
          : { ...employee, teamName: selectTeam }
        : employee // if not employeeid === currentid of employee means no change means it is not the employee on which we clicked.
    );
   props.setEmployees(tansformedEmployee);
    // console.log(event.currentTarget.id)
    // here event.target.id dont work
  };
  const empData = props.Employee.map((item) => {
    return <>
      
        <div id={item.id} key={item.id}
          style={{
            // border: "2px solid red",
            width: "10rem",
            height: "10rem",
            margin: ".8rem",
            cursor: 'pointer'
          }}
          className={item.teamName === selectTeam ? "selected" : "box"}
          
          onClick={handleEmployeeSelection}
        >
          <h5 style={{ fontSize: ".6rem" }}>Name: {item.fullName}</h5>
          <img
            src={item.gender === "male" ? male : female}
            style={{ width: "5rem" }}
          />
          <h5 style={{ fontSize: ".6rem" }}>technology: {item.designation}</h5>
        </div>
      
    </>;
  });
  const handleChangeTeam = (event) => {
    setSelectTeam(event.target.value);
  };
  useEffect(()=>{
     localStorage.setItem('employeeList',JSON.stringify(props.Employee))
  },[empData])
  useEffect(()=>{
     localStorage.setItem('selectedTeam',JSON.stringify(selectTeam))
  },[selectTeam])
  return (
    <main>
      <div>
        <div>
          <select value={selectTeam} onChange={handleChangeTeam}>
            <option value="TeamA">TeamA</option>
            <option value="TeamB">TeamB</option>
            <option value="TeamC">TeamC</option>
            <option value="TeamD">TeamD</option>
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr" }}>
          {empData}
        </div>
      </div>
    </main>
  );
}
