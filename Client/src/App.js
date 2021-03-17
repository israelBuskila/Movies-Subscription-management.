import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Components/Login";
import CreateAccount from "./Components/CreateAccount";
import Main from "./Components/Main";
import Movies from "./Components/Movies";
import ManageUsers from "./Components/ManageUsers";
import Subscriptions from "./Components/Subscriptions";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/createAccount" component={CreateAccount} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/manageUsers" component={ManageUsers} />
          <Route exact path="/subscriptions" component={Subscriptions} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
