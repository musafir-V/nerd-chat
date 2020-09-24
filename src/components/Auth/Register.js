import React from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import md5 from "md5";

import firebase from "../../firebase";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordconfirmation: "",
    errors: [],
    loading: false,
    userRef: firebase.database().ref("users"),
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isFormEmpty = ({ username, email, password, passwordconfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordconfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordconfirmation }) => {
    if (
      password.length < 6 ||
      passwordconfirmation.length < 6 ||
      password !== passwordconfirmation
    ) {
      return false;
    } else {
      return true;
    }
  };

  isFormValid = () => {
    let errors = [],
      error;
    if (this.isFormEmpty(this.state)) {
      // throw error

      error = { message: "Fill all details" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      // throw error

      error = { message: "Password is not valid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  saveUser = (createdUser) => {
    this.state.userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
    return Promise.resolve(1);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          // console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `https://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser)
                .then(() => {
                  this.setState({ loading: false });
                })
                .catch((error) => {
                  this.setState({
                    errors: this.state.errors.concat(error),
                    loading: false,
                  });
                });
              // this.setState({ loading: false });
            })
            .catch((error) => {
              this.setState({
                errors: this.state.errors.concat(error),
                loading: false,
              });
            });
        })
        .catch((error) => {
          // console.error(error);
          this.setState({
            errors: this.state.errors.concat(error),
            loading: false,
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
      <Grid textAlign="center" verticalAlign="middle" className="register">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="yellow" textAlign="center">
            {/*     <Icon name="user plus" color="black" /> */}
            Register for Nerd-Chat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
                className={this.handleErrors(this.state.errors, "username")}
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Adress"
                onChange={this.handleChange}
                type="email"
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
              />

              <Form.Input
                fluid
                name="passwordconfirmation"
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                onChange={this.handleChange}
                type="password"
                className={this.handleErrors(this.state.errors, "password")}
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
            color="white"
            style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Link to="/login"> Already a User!</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
