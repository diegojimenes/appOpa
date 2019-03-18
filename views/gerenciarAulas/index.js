import React, { Component, Fragment } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Modal,
  Alert,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator
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
  Card,
  CardItem,
  Footer,
  FooterTab
} from "native-base";
import { connect } from "react-redux";
import { config } from "../../config";

import NavBar from "../../components/navbar";
import Notification from "../../components/notifications";

import {
  get_Aulas,
  get_Aula,
  AddAula,
  EditAula,
  dellAula,
  AddPergunta,
  dellPergunta,
  EditPergunta
} from "../../redux/actions/aulas";
import { sendNotification } from "../../redux/actions/notificate";
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
      modalPerguntasVisible: false,
      edicaoDePerguntas: false,
      tags: [],
      tag: "",
      title: "",
      desc: "",
      videoAtual: "",
      thumbAtual: "",
      action: "",
      perguntas: [],
      respostas: [],
      id: 0,
      formModal: true,
      respostaSelecionada: 1,
      respostaLastId: 1
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentWillMount() {
    this.props.get_Aulas();
  }
  listaDeAulas() {
    return this.props.aulas.map(
      ({ title, description, tags, id, thumbnail, url, perguntas }) => {
        return (
          <ListItem key={id}>
            <Body>
              <Text style={styles.title}>{title}</Text>
              <Text note numberOfLines={1}>
                {description}
              </Text>
            </Body>
            <Right style={styles.buttons}>
              <Button
                info
                style={styles.button}
                onPress={() => {
                  this.setState({
                    tags: tags.tags,
                    title,
                    desc: description,
                    videoAtual: url,
                    thumbAtual: thumbnail,
                    perguntas: perguntas,
                    id: id,
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
                          Promise.all([this.props.dellAula(id)]).then(() =>
                            this.props.get_Aulas()
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

  perguntas() {
    return (
      <View>
        <Form>
          <Item floatingLabel>
            <Label>Pergunta</Label>
            <Input
              onChangeText={pergunta => this.setState({ pergunta })}
              value={this.state.pergunta}
            />
          </Item>

          <Item floatingLabel>
            <Label>Valor</Label>
            <Input
              keyboardType={"numeric"}
              onChangeText={valor => this.setState({ valor })}
              value={this.state.valor}
            />
          </Item>

          <Item floatingLabel>
            <Label>Respostas</Label>
            <Input
              onChangeText={resposta => this.setState({ resposta })}
              value={this.state.resposta}
            />
          </Item>

          <Button
            style={styles.addResposta}
            onPress={() => {
              if (this.state.resposta != "") {
                this.setState({
                  respostas: [
                    ...this.state.respostas,
                    {
                      id: this.state.respostaLastId,
                      text: this.state.resposta
                    }
                  ],
                  respostaLastId: this.state.respostaLastId + 1,
                  resposta: ""
                });
              }
            }}
          >
            <Text style={{ color: "#fff" }}>Add Resposta</Text>
          </Button>
          {this.state.respostas.length >= 1 ? (
            <Text
              style={{
                color: "#000",
                fontSize: config.fontSize.paragraph,
                alignSelf: "center"
              }}
            >
              Selecione a resposta correta
            </Text>
          ) : null}
          {this.state.respostas.map(({ id, text }) => {
            return (
              <View
                key={id + "res"}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  marginVertical: 25
                }}
              >
                <TouchableHighlight
                  onPress={() => {
                    if (this.state.respostaSelecionada != id) {
                      this.setState({ respostaSelecionada: id });
                    }
                  }}
                >
                  <Text style={{ fontSize: 20 }}>
                    {text}
                    {this.state.respostaSelecionada === id ? (
                      <Icon
                        type="FontAwesome"
                        name="check"
                        style={{ color: config.colors.checked, fontSize: 20 }}
                      />
                    ) : null}
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    var remove = this.state.respostas.filter((e, index) => {
                      return e.id != id;
                    });
                    this.setState({ respostas: remove });
                  }}
                >
                  <Icon
                    type="FontAwesome"
                    name="times"
                    style={{ color: config.colors.unChecked, fontSize: 25 }}
                  />
                </TouchableHighlight>
              </View>
            );
          })}
          <View style={{ flexDirection: "row" }}>
            <Button
              onPress={() => {
                if (this.state.edicaoDePerguntas) {
                  Promise.all([
                    this.props.EditPergunta(
                      this.state.id,
                      this.state.pergunta,
                      `${this.state.respostaSelecionada}`,
                      parseInt(this.state.valor),
                      JSON.stringify(this.state.respostas),
                      parseInt(this.state.idPerguntaAtiva)
                    ),
                    this.props.get_Aula(this.state.id)
                  ]).then(() => {
                    this.setState({ enviandoPergunta: true });
                    setTimeout(() => {
                      this.setState({
                        pergunta: "",
                        valor: "",
                        respostas: [],
                        respostaSelecionada: 1,
                        perguntas: this.props.aula.perguntas,
                        enviandoPergunta: false
                      });
                    }, 3000);
                  });
                } else {
                  Promise.all([
                    this.props.AddPergunta(
                      this.state.id,
                      this.state.pergunta,
                      `${this.state.respostaSelecionada}`,
                      parseInt(this.state.valor),
                      JSON.stringify(this.state.respostas)
                    ),
                    this.props.get_Aula(this.state.id)
                  ]).then(() => {
                    this.setState({ enviandoPergunta: true });
                    setTimeout(() => {
                      this.setState({
                        pergunta: "",
                        valor: "",
                        respostas: [],
                        respostaSelecionada: 1,
                        perguntas: this.props.aula.perguntas,
                        enviandoPergunta: false
                      });
                    }, 3000);
                  });
                }
              }}
              style={{
                backgroundColor: config.colors.primary,
                margin: 10
              }}
            >
              <Text
                style={{
                  color: config.colors.white,
                  marginHorizontal: 20
                }}
              >
                {this.state.edicaoDePerguntas
                  ? "Editar Pergunta"
                  : "Adicionar Pergunta"}
              </Text>
            </Button>
            {this.state.enviandoPergunta ? (
              <ActivityIndicator size="large" color={config.colors.primary} />
            ) : null}
          </View>
        </Form>
        <View>
          {this.state.perguntas
            .reverse()
            .map(({ question, responseCorrect, responses, valor, id }) => {
              var respostas = Object.values(responses);
              return (
                <Card key={`perguntas${id}`}>
                  <TouchableHighlight
                    onPress={() => {
                      if (this.state.respostaAtiva === id) {
                        this.setState({
                          respostaAtiva: -1
                        });
                      } else {
                        this.setState({
                          respostaAtiva: id
                        });
                      }
                    }}
                  >
                    <CardItem header bordered>
                      <Text
                        style={{
                          fontSize: config.fontSize.title,
                          color: config.colors.secondary
                        }}
                      >
                        {question}
                      </Text>
                      {this.state.deleletandoPergunta &&
                      this.state.respostaDeletada === id ? (
                        <View
                          style={{
                            flexDirection: "row"
                          }}
                        >
                          <ActivityIndicator
                            size="small"
                            color={config.colors.primary}
                          />
                          <Text style={{ fontSize: config.fontSize.title }}>
                            Excluindo Pergunta
                          </Text>
                        </View>
                      ) : null}
                    </CardItem>
                  </TouchableHighlight>
                  <CardItem bordered>
                    <Body style={{ flexDirection: "column" }}>
                      {this.state.respostaAtiva === id ? (
                        <Fragment>
                          <Text style={{ fontSize: config.fontSize.paragraph }}>
                            Valor: {valor}
                          </Text>
                          <Text style={{ fontSize: config.fontSize.paragraph }}>
                            Resposta correta: {responseCorrect}
                          </Text>
                          {respostas.map(({ id, text }) => {
                            return (
                              <Text
                                style={{ fontSize: config.fontSize.paragraph }}
                                key={`respostas${id}`}
                              >
                                Resposta {id}: {text}
                              </Text>
                            );
                          })}
                        </Fragment>
                      ) : null}
                    </Body>
                  </CardItem>

                  <CardItem footer bordered>
                    <TouchableHighlight
                      style={{ marginRight: 50 }}
                      onPress={() => {
                        this.setState({
                          pergunta: question,
                          valor: `${valor}`,
                          edicaoDePerguntas: true,
                          respostas: respostas,
                          idPerguntaAtiva: id,
                          respostaSelecionada: parseInt(responseCorrect)
                        });
                      }}
                    >
                      <Text
                        style={{
                          fontSize: config.fontSize.paragraph,
                          color: config.colors.secondary
                        }}
                      >
                        Editar
                      </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => {
                        Promise.all([
                          this.setState({ respostaDeletada: id }),
                          this.props.dellPergunta(id),
                          this.props.get_Aula(this.state.id)
                        ]).then(() => {
                          this.setState({ deleletandoPergunta: true });
                          setTimeout(() => {
                            this.setState({
                              perguntas: this.props.aula.perguntas,
                              deleletandoPergunta: false
                            });
                          }, 3000);
                        });
                      }}
                    >
                      <Text
                        style={{
                          fontSize: config.fontSize.paragraph,
                          color: config.colors.secondary
                        }}
                      >
                        excluir
                      </Text>
                    </TouchableHighlight>
                  </CardItem>
                </Card>
              );
            })}
        </View>
      </View>
    );
  }
  formModal() {
    return (
      <Form>
        <Item floatingLabel>
          <Label>title</Label>
          <Input
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
        </Item>
        <Item floatingLabel>
          <Label>description</Label>
          <Input
            onChangeText={desc => this.setState({ desc })}
            value={this.state.desc}
          />
        </Item>

        <Item floatingLabel>
          <Label>Tags</Label>
          <Input
            onChangeText={tag => this.setState({ tag })}
            value={this.state.tag}
          />
        </Item>

        <Button
          style={styles.addTag}
          onPress={() => {
            this.setState({
              tags: [...this.state.tags, this.state.tag],
              tag: ""
            });
          }}
        >
          <Text style={{ color: "#fff" }}>Add tag</Text>
        </Button>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 15,
            marginBottom: 20
          }}
        >
          {this.state.tags.map((e, i) => {
            return (
              <TouchableHighlight
                key={i}
                onPress={() => {
                  var remove = this.state.tags.filter((e, index) => {
                    return index != i;
                  });
                  this.setState({ tags: remove });
                }}
              >
                <Badge
                  primary
                  style={{
                    backgroundColor: config.colors.primary,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 5
                  }}
                >
                  <Text style={{ color: "white" }}>{e} </Text>
                  <Icon
                    type="FontAwesome"
                    name="times"
                    style={{ color: "white", fontSize: 10 }}
                  />
                </Badge>
              </TouchableHighlight>
            );
          })}
        </View>

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
              Carregar Thumbnail
            </Text>
          </Button>
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
            <Icon type="FontAwesome" name="file" />
            <Text
              style={{
                color: config.colors.white,
                marginRight: 20
              }}
            >
              Carregar video
            </Text>
          </Button>
          {/* {this.state.formModal ? (
            <Button
              style={{
                backgroundColor: config.colors.primary,
                marginVertical: 10
              }}
              onPress={() =>
                this.setState({ formModal: !this.state.formModal })
              }
            >
              <Text
                style={{
                  color: config.colors.white,
                  marginHorizontal: 20
                }}
              >
                {this.state.action === "editar"
                  ? "Editar perguntas"
                  : "Adicionar peguntas"}
              </Text>
            </Button>
          ) : null} */}
        </Item>
      </Form>
    );
  }
  renderizarConteudoModal() {
    return this.state.formModal ? this.formModal() : this.perguntas();
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
            {this.state.formModal ? (
              <TouchableHighlight
                style={{ marginLeft: 10 }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Icon type="FontAwesome" name="times" />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                style={{ marginLeft: 10 }}
                onPress={() =>
                  this.setState({ formModal: !this.state.formModal })
                }
              >
                <Icon type="FontAwesome" name="arrow-left" />
              </TouchableHighlight>
            )}
            <Text
              style={{
                fontSize: config.fontSize.title,
                marginLeft: 10
              }}
            >
              {this.state.action === "editar"
                ? "Editar Aula"
                : "Adicionar Aula"}
            </Text>
          </View>
          <ScrollView>{this.renderizarConteudoModal()}</ScrollView>
          {this.state.formModal ? (
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
                {this.state.action === "editar" ? (
                  <Button
                    onPress={() =>
                      this.setState({ formModal: !this.state.formModal })
                    }
                  >
                    <Text
                      style={{
                        color: config.colors.white,
                        marginHorizontal: 20
                      }}
                    >
                      {this.state.action === "editar"
                        ? "Editar perguntas"
                        : "Adicionar peguntas"}
                    </Text>
                  </Button>
                ) : null}
                {this.state.enviandoPergunta ? (
                  <ActivityIndicator
                    size="large"
                    color={config.colors.primary}
                  />
                ) : null}
                <Button
                  // block
                  // vertical
                  // style={styles.buttonSend}
                  onPress={() => {
                    if (this.state.action === "editar") {
                      Promise.all([
                        this.props.EditAula(
                          this.state.title,
                          this.state.desc,
                          this.state.tags,
                          this.state.id,
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIc8W7-NLyEXZXp6JQ82JvoWx6RjANHDBxVzzU61lupNGynQV",
                          "https://vjs.zencdn.net/v/oceans.mp4"
                        ),
                        this.setModalVisible(!this.state.modalVisible)
                      ]).then(() => this.props.get_Aulas());
                    } else {
                      Promise.all([
                        this.props.AddAula(
                          this.state.title,
                          this.state.desc,
                          this.state.tags,
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIc8W7-NLyEXZXp6JQ82JvoWx6RjANHDBxVzzU61lupNGynQV",
                          "https://vjs.zencdn.net/v/oceans.mp4"
                        ),
                        setTimeout(() => {
                          this.props.sendNotification(
                            "Nova aula",
                            this.state.title,
                            { id: this.props.newQuestionId }
                          );
                          this.setState({
                            id: this.props.newQuestionId,
                            formModal: !this.state.formModal
                          });
                        }, 2000)
                      ]).then(() => {
                        this.props.get_Aulas();
                        this.setState({ enviandoPergunta: false });
                      });
                    }
                  }}
                >
                  <Text style={{ color: "#fff" }}>Enviar</Text>
                </Button>
              </FooterTab>
            </Footer>
          ) : null}
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
          title={"Gerenciar aulas"}
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
          <Text style={{ color: "#fff" }}>Adicionar Aula</Text>
        </Button>
        <ScrollView style={styles.container}>
          {statusNotifications ? (
            <Notification navigation={this.props.navigation} />
          ) : null}
          <List>
            {this.props.aulas.length ? (
              this.listaDeAulas()
            ) : (
              <ActivityIndicator size="large" color={config.colors.primary} />
            )}
          </List>
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
    user: state.authReducer.user,
    newQuestionId: state.aulasReducer.NewQuestionId
  };
};
export default connect(
  mapStateToProps,
  {
    get_Aulas,
    get_Aula,
    AddAula,
    EditAula,
    dellAula,
    AddPergunta,
    dellPergunta,
    EditPergunta,
    sendNotification
  }
)(GerenciarAulas);
