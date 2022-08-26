import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import data from "./mock-data.json";
import Papa from "papaparse";

//Transform the number based grade into a latter based grade
export function grade_to_letter(grade) {
  switch (true) {
    case grade < 64:
      return "E";
    case grade >= 64 && grade <= 66:
      return "D";
    case grade >= 67 && grade <= 69:
      return "D+";
    case grade >= 70 && grade <= 72:
      return "C-";
    case grade >= 73 && grade <= 76:
      return "C";
    case grade >= 77 && grade <= 79:
      return "C+";
    case grade >= 80 && grade <= 82:
      return "B-";
    case grade >= 83 && grade <= 86:
      return "B";
    case grade >= 87 && grade <= 89:
      return "B+";
    case grade >= 90 && grade <= 92:
      return "A-";
    case grade >= 93 && grade <= 100:
      return "A";
  }
}

//Transform the date into the american date format
export function date_to_american(date) {
  const day = date.split("/")[0];
  const month = date.split("/")[1];
  const year = date.split("/")[2];
  return month + "/" + day + "/" + year;
}

//Modify the full name
export function remove_surname(fullName) {
  const firstName = fullName.split(" ")[0];
  const lastName = fullName.split(" ")[1];
  return firstName + " " + lastName;
}

//Modify the email
export function change_mail(id) {
  const email = "@tec.mx";
  return id + email;
}

//Get the value of the column in order to return the correct modified values of the specific row
export function format_line(i, val) {
  if (i === 0) {
    const index = val;
    return index;
  } else if (i === 1) {
    const regularName = val;
    return remove_surname(regularName);
  } else if (i === 2) {
    const ID = val;
    return change_mail(ID);
  } else if (i === 3) {
    const date = val;
    return date_to_american(date);
  } else if (i === 4) {
    const grade = val;
    return grade_to_letter(grade);
  }
}
const App = () => {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          const keyNames = Object.keys(d);

          rowsArray.push(keyNames);
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  return (
    <div>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <br />
      {/* Table */}
      <table className="table table-primary table-striped">
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <table className="table table-success table-striped">
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  // if (i === 0) {
                  //   const index = val;

                  //Display the values of the i column
                  return <td key={i}>{format_line(i, val)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
