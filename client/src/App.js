import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Landing from "./components/layout/Landing";
import Auth from "./view/Auth";
import AuthContextProvider from './contexts/AuthContext'
import DashBoard from "./view/DashBoard";
import About from "./view/About";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PostContextProvider from './contexts/PostContext';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route
              path='/login'
              render={(props) => <Auth {...props} authRoute='login' />}
            />
            <Route
              path='/register'
              render={(props) => <Auth {...props} authRoute='register' />}
            />
            {/* <Route path='/dashboard'>
            <DashBoard />
          </Route> */}
            <ProtectedRoute path='/dashboard' component={DashBoard} />
            <ProtectedRoute path='/about' component={About} />
          </Switch>
        </Router>
      </PostContextProvider>

    </AuthContextProvider>

  );
}

export default App;
