import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import data from "./mock-data.json";
import Papa from "papaparse";

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

export function date_to_american(date) {
  const day = date.split("/")[0];
  const month = date.split("/")[1];
  const year = date.split("/")[2];
  return month + "/" + day + "/" + year;
}

export function remove_surname(fullName) {
  const firstName = fullName.split(" ")[0];
  const lastName = fullName.split(" ")[1];
  return firstName + " " + lastName;
}

export function change_mail(id) {
  const email = "@tec.mx";
  return id + email;
}

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
  //React will update the app for us with this funciton

  // const [contacts, setContacts] = useState(data);
  // const [addFormData, setAddFormData] = useState({
  //   fullName: "",
  //   address: "",
  //   phoneNumber: "",
  //   email: "",
  // });

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

          // if (keyNames[1] === "Name") {
          //   const regNames = Object.values(d)[1];
          //   const firstName = regNames.split(" ")[0];
          //   const lastName = regNames.split(" ")[1];
          //   const fullName = firstName + " " + lastName;
          //   console.log(firstName, lastName);
          // }
          valuesArray.push(Object.values(d));

          // valuesArray.push(Object.values(d));
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

                  return <td key={i}>{format_line(i, val)}</td>;
                  // } else if (i === 1) {
                  //   const regularName = val;
                  //   return <td key={i}>{remove_surname(regularName)}</td>;
                  // } else if (i === 2) {
                  //   const ID = val;
                  //   return <td key={i}>{change_mail(ID)}</td>;
                  // } else if (i === 3) {
                  //   const date = val;
                  //   return <td key={i}>{date_to_american(date)}</td>;
                  // } else if (i === 4) {
                  //   const grade = val;
                  //   return <td key={i}>{grade_to_letter(grade)}</td>;
                  // }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

//   const handleAddFormChange = (event) => {
//     event.preventDefault();

//     const fieldName = event.target.getAttribute("name");
//     const fieldValue = event.target.value;

//     const newFormData = { ...addFormData }; //Copy the existing form data
//     newFormData[fieldName] = fieldValue; //Update object with the value that has been tiped

//     setAddFormData(newFormData);
//   };

//   const handleAddFormSubmit = (event) => {
//     event.preventDefault();

//     const newContact = {
//       id: nanoid(),
//       fullName: addFormData.fullName,
//       address: addFormData.address,
//       phoneNumber: addFormData.phoneNumber,
//       email: addFormData.email,
//     };

//     const newContacts = [...contacts, newContact];
//     setContacts(newContacts);
//   };

//   return (
//     <div className="container">
//       <table className="table table-success table-striped">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Address</th>
//             <th>Phone Number</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/*As the mpa function flips through the contacts array, it will give
//           us access to the current contact object it is on and passes it to our
//           function as a variable, that we named contact*/}
//           {contacts.map((contact) => (
//             <tr>
//               <td>{contact.fullName}</td>
//               <td>{contact.address}</td>
//               <td>{contact.phoneNumber}</td>
//               <td>{contact.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h2>Upload File</h2>
//       <div>
//         {/* File Uploader */}
//         <input
//           type="file"
//           name="file"
//           accept=".csv"
//           onChange={changeHandler}
//           style={{ display: "block", margin: "10px auto" }}
//         />
//       </div>
//       <h2>Add a Contact</h2>
//       <form onSubmit={handleAddFormSubmit}>
//         <input
//           type="text"
//           name="fullName"
//           required="required"
//           placeholder="Enter name"
//           onChange={handleAddFormChange}
//         ></input>
//         <input
//           type="text"
//           name="address"
//           required="required"
//           placeholder="Enter address"
//           onChange={handleAddFormChange}
//         ></input>
//         <input
//           type="text"
//           name="phoneNumber"
//           required="required"
//           placeholder="Enter a phone number"
//           onChange={handleAddFormChange}
//         ></input>
//         <input
//           type="email"
//           name="email"
//           required="required"
//           placeholder="Enter email"
//           onChange={handleAddFormChange}
//         ></input>
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// };

export default App;
