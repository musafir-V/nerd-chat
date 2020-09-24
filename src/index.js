import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "semantic-ui-css/semantic.min.css";

import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import firebase from "./firebase";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers/index";
import setUser from "./actions/setuser";
import clearUser from "./actions/clearuser";
import Spinner from "./components/spinner";

const store = createStore(rootReducer, composeWithDevTools());

const mapStateFromProps = (state) => {
  return {
    isLoading: state.user.isLoading,
    user: state.user.currentUser,
  };
};

const mapDispatchToProps = () => {
  return { setUser, clearUser };
};

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push("/");
      } else {
        this.props.history.push("/login");
        this.props.clearUser();
      }
    });
  }
  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    );
  }
}

const RootWithAuth = withRouter(
  connect(mapStateFromProps, mapDispatchToProps())(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
