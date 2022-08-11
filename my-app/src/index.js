import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//Simple function component
function Greet(props) {
  console.log(props);
  return (
    <h1>
      Kiubo {props.name} {props.surname}{" "}
    </h1>
  );
}

//Pattern mattching version
function GreetAgain({ name, surname }) {
  return (
    <h1>
      Hello {name} {surname}
    </h1>
  );
}

//Class version

class Goodbye extends React.Component {
  constructor(props) {
    //Call the constructor of the parent class
    super(props);
    this.state = {
      day: props.day,
      month: props.month,
      year: props.year,
    };
  }

  render() {
    return (
      <h1>
        Bye {this.state.day}/{this.state.month}/{this.state.year}
      </h1>
    );
  }
}

function App() {
  return (
    <div>
      <GreetAgain name="Pana" surname="panini" />
      <Greet name="Pancho" surname="Hernandez" />
      <Goodbye day={10} month="August" year={2000} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
