import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Components/Login";
import CreateAccount from "./Components/CreateAccount";
import Main from "./Components/Main";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/createAccount" component={CreateAccount} />
          <Route exact path="/main" component={Main} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
