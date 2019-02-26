import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Form, Label, Input, Text, Button, Item } from "native-base";
import { connect } from "react-redux";
import { config } from "../../config";
class AddComentario extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Form style={styles.form}>
        <Item floatingLabel style={styles.input}>
          <Label>Adicionar um comentário</Label>
          <Input onChangeText={comentario => this.setState({ comentario })} />
        </Item>
        <Button style={styles.button} block onPress={() => {}}>
          <Text style={{ color: "#fff" }}>Login</Text>
        </Button>
      </Form>
    );
  }
}
const styles = StyleSheet.create({
  form: {
    width: "100%",
    flexDirection: "column"
  },
  input: {
    width: "100%"
  },
  button: {
    backgroundColor: config.colors.secondary,
    width: 80,
    position: "absolute",
    right: 10,
    marginTop: 20
  }
});
const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  null
)(AddComentario);
