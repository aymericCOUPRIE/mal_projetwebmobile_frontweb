import Login from "./app/pages/login/login";
import {BrowserRouter as Router, Route} from "react-router-dom"

function App() {
  return (
      <Router>
          <Route exact path="/login">
              <Login />
          </Route>
      </Router>
  );
}

export default App;
