import React from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import firebase from "../../firebase";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isFormValid = ({ email, password }) => {
    this.setState({
      errors: [],
    });
    if (!email.length) {
      let error = [{ message: "Enter Email" }];
      this.setState({
        errors: error,
      });
    } else if (!password.length) {
      let error = [{ message: "Enter Password" }];
      this.setState({
        errors: error,
      });
    } else {
      return true;
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          // consconsole.log(createdUser);
          this.setState({ loading: false });
        })
        .catch((error) => {
          // console.error(error);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(error),
          });
        });
    }
  };

  handleErrors = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="login">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="yellow" textAlign="center">
            <Icon name="code branch" color="yellow" />
            Login for Nerd-Chat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Adress"
                onChange={this.handleChange}
                type="email"
                style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                className={this.handleErrors(this.state.errors, "email")}
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                className={this.handleErrors(this.state.errors, "password")}
                style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
              />

              <Button
                disabled={this.state.loading}
                color="black"
                className={this.state.loading ? "loading" : ""}
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {this.state.errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(this.state.errors)}
            </Message>
          )}
          <Message
            style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            textAlign="left"
          >
            <Link to="/register">New User! </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
