import "./App.css";
import UserSignUpPage from "./pages/UserSignUpPage";
import * as apiCalls from "./api/apicalls";
import LoginPage from "./pages/LoginPage";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import TopBar from "./Input/TopBar";

function App() {
  return (
    <div>
      <TopBar />
      <div className="container">
        <Switch>
          <Route
            path="/login"
            exact
            component={LoginPage}
            //render={(props) => <LoginPage actions={actions} {...props} />}
          />
          <Route
            path="/signup"
            exact
            component={UserSignUpPage}
            //render={(props) => <UserSignUpPage actions={actions} {...props} />}
          />
          <Route path="/:username" exact component={UserPage} />
          <Route path="/" exact component={HomePage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
