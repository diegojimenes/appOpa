import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Form, Label, Input, Text, Button, Item } from "native-base";
import { connect } from "react-redux";
import { config } from "../../config";

import { send } from "../../redux/actions/comentario";
import { get_Aula } from "../../redux/actions/aulas";
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
        <Button
          style={styles.button}
          block
          onPress={() => {
            this.props.send(
              this.state.comentario,
              this.props.user.id,
              this.props.id
            );
            this.props.get_Aula(this.props.id);
            this.setState({ comentario: "" });
          }}
        >
          <Text style={{ color: "#fff" }}>Comentar</Text>
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
    paddingHorizontal: 10,
    position: "absolute",
    right: 10,
    marginTop: 20
  }
});
const mapStateToProps = state => {
  return {
    status: state.comentario.sendCommentStatus,
    user: state.authReducer.user
  };
};
export default connect(
  mapStateToProps,
  { send, get_Aula }
)(AddComentario);
