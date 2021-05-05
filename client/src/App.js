import React from 'react';

import './App.css';
import Search from './components/Search';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ReviewProduct from './components/ReviewProduct';
import NotFound from './components/NotFound';
import Layout from './components/Layout'

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Forgot from "./components/Forgot";

import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import About from './components/About';
import ContactUs from './components/ContactUs';
import Verify from './components/Verify';

const App = () => {

  const theme = createMuiTheme({

    palette: {
      primary: {
        main: '#FF785A'
      },
      secondary: {
        main: '#191919'
      },
    },
    typography: {
      fontFamily: 'Open Sans'
    }
  })

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <div>
              <Switch>
                <PrivateRoute exact path="/" component={Search} layout={Layout} />
                <PrivateRoute exact path="/review" component={ReviewProduct} layout={Layout} />
                <PrivateRoute exact path="/about" component={About} layout={Layout} />
                <PrivateRoute exact path="/contact" component={ContactUs} layout={Layout} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/forgot" component={Forgot} />
                <Route exact path="/verify" component={Verify} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
              </Switch>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
