import React, { Component, Fragment } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Modal,
  Alert,
  TouchableHighlight,
  Dimensions
} from "react-native";
import {
  List,
  ListItem,
  Body,
  Right,
  Button,
  Icon,
  Form,
  Item,
  Label,
  Input,
  // Textarea,
  Badge,
  Footer,
  FooterTab
} from "native-base";
import { connect } from "react-redux";
import { config } from "../../config";

import NavBar from "../../components/navbar";
import Notification from "../../components/notifications";

import {
  get_Users,
  register,
  dellUser,
  update
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
class GerenciarAulas extends Component {
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
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentWillMount() {
    this.props.get_Users();
  }
  listaDeAlunos() {
    return this.props.users.map(
      ({ username, email, img, isAdmin, polo, nucleo, cpf, fone, id }) => {
        return (
          <ListItem key={id}>
            <Body>
              <Text style={styles.title}>{username}</Text>
              <Text note numberOfLines={1}>
                {email}
              </Text>
            </Body>
            <Right style={styles.buttons}>
              <Button
                info
                style={styles.button}
                onPress={() => {
                  this.setState({
                    username,
                    email,
                    img,
                    isAdmin: `${isAdmin}`,
                    polo,
                    nucleo,
                    cpf,
                    fone,
                    id,
                    action: "editar"
                  });
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>
                  <Icon type="FontAwesome" name="edit" />
                </Text>
              </Button>
              <Button
                danger
                style={styles.button}
                onPress={() =>
                  Alert.alert(
                    "Deletar aula",
                    "Você tem certeza disso?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          Promise.all([this.props.dellUser(id)]).then(() =>
                            this.props.get_Users()
                          );
                        }
                      }
                    ],
                    { cancelable: true }
                  )
                }
              >
                <Text>
                  <Icon type="FontAwesome" name="trash" />
                </Text>
              </Button>
            </Right>
          </ListItem>
        );
      }
    );
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
  renderizarConteudoModal() {
    return this.formModal();
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
              {this.state.action === "editar"
                ? "Editar Aluno"
                : "Cadastrar Aluno"}
            </Text>
          </View>
          <ScrollView>{this.renderizarConteudoModal()}</ScrollView>
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
                        false,
                        this.state.polo,
                        this.state.nucleo,
                        this.state.cpf,
                        this.state.fone,
                        this.state.id
                      ),
                      this.setModalVisible(!this.state.modalVisible)
                    ]).then(() => this.props.get_Users());
                  } else {
                    Promise.all([
                      this.props.register(
                        this.state.username,
                        this.state.email,
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIc8W7-NLyEXZXp6JQ82JvoWx6RjANHDBxVzzU61lupNGynQV",
                        this.state.password,
                        false,
                        this.state.polo,
                        this.state.nucleo,
                        this.state.cpf,
                        this.state.fone
                      ),
                      this.setModalVisible(!this.state.modalVisible)
                    ]).then(() => this.props.get_Users());
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
    const statusNotifications = this.props.navigation.getParam(
      "notifications",
      false
    );

    return (
      <View>
        {this.modal()}
        <NavBar
          title={"Gerenciar alunos"}
          backActive={true}
          back="main"
          navigation={this.props.navigation}
        />
        <Button
          full
          style={{
            backgroundColor: config.colors.primary,
            position: "relative",
            bottom: 0
          }}
          onPress={() => {
            this.setState({
              tags: [],
              title: "",
              desc: "",
              videoAtual: "",
              thumbAtual: "",
              action: "criar"
            });
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <Text style={{ color: "#fff" }}>Cadastrar Aluno</Text>
        </Button>
        <ScrollView style={styles.container}>
          {statusNotifications ? <Notification /> : null}
          <List>{this.listaDeAlunos()}</List>
        </ScrollView>
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
    aulas: state.aulasReducer.aulas,
    aula: state.aulasReducer.aula,
    users: state.authReducer.users,
    newQuestionId: state.aulasReducer.NewQuestionId
  };
};
export default connect(
  mapStateToProps,
  {
    get_Users,
    register,
    dellUser,
    update
  }
)(GerenciarAulas);
