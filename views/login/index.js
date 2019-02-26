import React, { Component } from "react";
import { Container, Form, Item, Input, Label, Button, Text } from "native-base";
import { StyleSheet, Image } from "react-native";
import { config } from "../../config";

import { connect } from "react-redux";
import { auth } from "../../redux/actions/auth";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { email: "", senha: "" };
  }
  render() {
    return (
      <Container style={styles.container}>
        <Image
          style={{ width: 200, height: 54, resizeMode: "contain" }}
          source={{ uri: config.logo }}
        />
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input onChangeText={email => this.setState({ email })} />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input onChangeText={senha => this.setState({ senha })} />
          </Item>
          {/* <Text>{this.props.loginState}</Text> */}
          <Button
            style={styles.button}
            block
            onPress={() => {
              this.props.auth(
                this.state.email,
                this.state.senha,
                this.props.navigation
              );
            }}
          >
            <Text>Login</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    width: "80%"
  },
  button: {
    marginTop: 15
  }
});

const mapStateToProps = state => {
  return {
    loginState: state.authReducer.loginState
  };
};

export default connect(
  mapStateToProps,
  { auth }
)(LoginPage);
