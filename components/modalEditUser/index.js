import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableHighlight,
  Dimensions
} from "react-native";
import {
  Button,
  Icon,
  Form,
  Item,
  Label,
  Input,
  Footer,
  FooterTab
} from "native-base";
import { connect } from "react-redux";
import { config } from "../../config";

import {
  get_Users,
  register,
  dellUser,
  update,
  currentUser
} from "../../redux/actions/auth";

import ImagePicker from "react-native-image-picker";
const options = {
  title: "Select Video",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
var { width } = Dimensions.get("window");
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      action: "",
      username: "",
      email: "",
      img: "",
      isAdmin: "",
      polo: "",
      nucleo: "",
      cpf: "",
      fone: "",
      id: 0
    };
  }
  componentWillMount() {
    this.props.get_Users();
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  formModal() {
    return (
      <Form>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
        </Item>
        <Item floatingLabel>
          <Label>E-mail</Label>
          <Input
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </Item>
        {this.state.action != "editar" ? (
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
          </Item>
        ) : null}

        <Item floatingLabel>
          <Label>Polo</Label>
          <Input
            onChangeText={polo => this.setState({ polo })}
            value={this.state.polo}
          />
        </Item>

        <Item floatingLabel>
          <Label>Nucleo</Label>
          <Input
            onChangeText={nucleo => this.setState({ nucleo })}
            value={this.state.nucleo}
          />
        </Item>

        <Item floatingLabel>
          <Label>Cpf</Label>
          <Input
            onChangeText={cpf => this.setState({ cpf })}
            value={this.state.cpf}
          />
        </Item>

        <Item floatingLabel>
          <Label>Fone</Label>
          <Input
            onChangeText={fone => this.setState({ fone })}
            value={this.state.fone}
          />
        </Item>

        <Item floatingLabel>
          <Label>isAdmin</Label>
          <Input
            onChangeText={fone => this.setState({ isAdmin })}
            value={this.state.isAdmin}
          />
        </Item>

        <Item
          style={{
            flexDirection: "column"
          }}
        >
          <Button
            style={{
              backgroundColor: config.colors.primary,
              marginVertical: 10
            }}
            onPress={() =>
              ImagePicker.launchImageLibrary(options, response => {
                console.log("Response = ", response);

                if (response.didCancel) {
                  console.log("User cancelled image picker");
                } else if (response.error) {
                  console.log("ImagePicker Error: ", response.error);
                } else if (response.customButton) {
                  console.log(
                    "User tapped custom button: ",
                    response.customButton
                  );
                } else {
                  const source = { uri: response.uri };

                  // You can also display the image using data:
                  // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                  this.setState({
                    avatarSource: source
                  });
                }
              })
            }
          >
            <Icon type="FontAwesome" name="camera" />
            <Text
              style={{
                color: config.colors.white,
                marginRight: 20
              }}
            >
              Foto de Perfil
            </Text>
          </Button>
        </Item>
      </Form>
    );
  }
  modal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}
      >
        <View
          style={{
            height: "100%"
          }}
        >
          <View
            style={{
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <TouchableHighlight
              style={{ marginLeft: 10 }}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Icon type="FontAwesome" name="times" />
            </TouchableHighlight>
            <Text
              style={{
                fontSize: config.fontSize.title,
                marginLeft: 10
              }}
            >
              Editar Perfil
            </Text>
          </View>
          <ScrollView>{this.formModal()}</ScrollView>
          <Footer
            style={{
              flexDirection: "row"
            }}
          >
            <FooterTab
              style={{
                backgroundColor: config.colors.primary
                // marginVertical: 10
              }}
            >
              <Button
                // block
                // vertical
                // style={styles.buttonSend}
                onPress={() => {
                  if (this.state.action === "editar") {
                    Promise.all([
                      this.props.update(
                        this.state.username,
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIc8W7-NLyEXZXp6JQ82JvoWx6RjANHDBxVzzU61lupNGynQV",
                        true,
                        this.state.polo,
                        this.state.nucleo,
                        this.state.cpf,
                        this.state.fone,
                        this.state.id
                      ),
                      this.setModalVisible(!this.state.modalVisible)
                    ]).then(() => this.props.currentUser());
                  } else {
                    Promise.all([
                      this.props.register(
                        this.state.username,
                        this.state.email,
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIc8W7-NLyEXZXp6JQ82JvoWx6RjANHDBxVzzU61lupNGynQV",
                        this.state.password,
                        true,
                        this.state.polo,
                        this.state.nucleo,
                        this.state.cpf,
                        this.state.fone
                      ),
                      this.setModalVisible(!this.state.modalVisible)
                    ]).then(() => this.props.currentUser());
                  }
                }}
              >
                <Text style={{ color: "#fff" }}>Enviar</Text>
              </Button>
            </FooterTab>
          </Footer>
        </View>
      </Modal>
    );
  }
  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
            this.setState({
              username: this.props.user.username,
              email: this.props.user.email,
              img: this.props.user.img,
              isAdmin: `${this.props.user.isAdmin}`,
              polo: this.props.user.polo,
              nucleo: this.props.user.nucleo,
              cpf: this.props.user.cpf,
              fone: this.props.user.fone,
              id: this.props.user.id,
              action: "editar"
            });
          }}
        >
          <Text style={this.props.style}>Editar Perfil</Text>
        </TouchableHighlight>
        {this.modal()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { height: "80%" },
  buttons: {
    flexDirection: "row"
  },
  button: {
    padding: 10
  },
  buttonSend: {
    backgroundColor: config.colors.primary,
    height: 50
  },
  title: {
    fontSize: config.fontSize.title
  },
  addTag: {
    backgroundColor: config.colors.primary,
    paddingHorizontal: 10,
    position: "relative",
    left: width - 80,
    top: -45
  },
  addResposta: {
    backgroundColor: config.colors.primary,
    paddingHorizontal: 10,
    position: "relative",
    left: width - 120,
    top: -45
  }
});
const mapStateToProps = state => {
  return {
    users: state.authReducer.users,
    user: state.authReducer.user
  };
};

export default connect(
  mapStateToProps,
  { get_Users, register, dellUser, update, currentUser }
)(EditUser);
