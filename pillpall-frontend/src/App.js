import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import MedicationTracker from './components/MedicationTracker';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          {token && <li><Link to="/medications">Medications</Link></li>}
        </ul>
      </nav>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login">
          <Login setToken={setToken} />
        </Route>
        <Route path="/medications">
          {token ? <MedicationTracker /> : <p>Please log in to view medications</p>}
        </Route>
        <Route path="/" exact>
          <h1>Welcome to PillPall</h1>
          {token ? <Link to="/medications">Go to Medications</Link> : <Link to="/login">Login</Link>}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
