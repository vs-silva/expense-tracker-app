import './App.css';
import {ReactElement} from "react";
import {ExpensesPage} from "./expenses/page/expenses-page";

function App(): ReactElement {

  return (<div>
      <ExpensesPage />
  </div>);
}

export default App;
