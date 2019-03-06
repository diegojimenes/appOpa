import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import {
  Button,
  Icon,
  Card,
  CardItem,
  Body,
  List,
  ListItem,
  Left,
  Right,
  Footer,
  FooterTab
} from "native-base";
import { connect } from "react-redux";

import HeaderQuestion from "../../components/headerQuestion";
import { config } from "../../config";
import { currentUser } from "../../redux/actions/auth";
import { finalizarAula } from "../../redux/actions/changePointsAndStatusOfVideo";
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respostaCerta: 0,
      respostaSelecionada: -1,
      tentativas: 0,
      dataAtual: new Date().getTime(),
      perguntaAtiva: 0
    };
  }
  // componentWillMount() {
  //   this.props.get_Aula(this.props.navigation.getParam("id"));
  // }
  render() {
    const statusNotifications = this.props.navigation.getParam(
      "notifications",
      false
    );

    var novaData = new Date(this.state.dataAtual + 10086400);
    var proximaTentativa = `${novaData.getDate()}/${novaData.getMonth() +
      1}/${novaData.getFullYear()}`;
    var pergunta = this.state.perguntaAtiva;
    var {
      question,
      responseCorrect,
      responses,
      valor
    } = this.props.aula.perguntas[pergunta];
    var numeroDePerguntas = this.props.aula.perguntas.length - 1;
    var respostas = Object.values(responses);
    var valorTotal = this.props.aula.perguntas.reduce((soma, numero) => {
      return soma + numero.valor;
    }, 0);
    return (
      <View>
        <View style={styles.container}>
          <HeaderQuestion
            userImg={this.props.user.img}
            user={this.props.user.username}
            userPontos={156}
            valor={valor}
            conteudo={question}
          />
          <View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: config.fontSize.title,
                marginTop: 20
              }}
            >
              {this.state.tentativas >= 1
                ? parseInt(responseCorrect) === this.state.respostaSelecionada
                  ? `Parabéns 😁`
                  : `Não foi dessa vez 😔`
                : null}
            </Text>
            <ScrollView>
              <List>
                {respostas.map(({ id, text }) => {
                  return (
                    <ListItem
                      key={id}
                      disabled={this.state.tentativas >= 1 ? true : false}
                      onPress={() => {
                        if (this.state.tentativas < 1) {
                          this.setState({
                            respostaSelecionada: id,
                            tentativas: this.state.tentativas + 1
                          });
                        }
                      }}
                    >
                      <Left>
                        <Text
                          style={{
                            color: config.colors.text,
                            fontSize: config.fontSize.paragraph
                          }}
                        >
                          {text}
                        </Text>
                      </Left>
                      <Right>
                        {id === this.state.respostaSelecionada ? (
                          parseInt(responseCorrect) ===
                          this.state.respostaSelecionada ? (
                            <Icon
                              type="FontAwesome"
                              name="check"
                              style={{
                                color: config.colors.checked,
                                fontSize: config.fontSize.menu
                              }}
                            />
                          ) : (
                            <Icon
                              type="FontAwesome"
                              name="times"
                              style={{
                                color: config.colors.error,
                                fontSize: config.fontSize.menu
                              }}
                            />
                          )
                        ) : null}
                      </Right>
                    </ListItem>
                  );
                })}
              </List>
            </ScrollView>
          </View>
        </View>
        <Footer>
          <FooterTab>
            <Button
              active
              onPress={() => {
                this.setState({
                  total: 0,
                  tentativas: 0,
                  respostaSelecionada: -1,
                  perguntaAtiva: 0
                });
                this.props.navigation.navigate("aula");
              }}
            >
              <Text style={styles.footerText}>Sair </Text>
              <Icon active name="arrow-back" />
            </Button>

            {this.state.perguntaAtiva >= numeroDePerguntas ? (
              parseInt(responseCorrect) === this.state.respostaSelecionada ? (
                <Button
                  active
                  onPress={() => {
                    var pontos = valorTotal + this.props.user.pontos;
                    Promise.all([
                      this.props.finalizarAula(
                        pontos,
                        this.props.user.id,
                        this.props.aula.id
                      ),
                      this.setState({
                        tentativas: 0,
                        respostaSelecionada: -1,
                        perguntaAtiva: 0
                      }),
                      this.props.currentUser()
                    ]).then(() => this.props.navigation.navigate("aula"));
                  }}
                >
                  <Text style={styles.footerText}>Concluir </Text>
                  <Icon type="FontAwesome" name="check" />
                </Button>
              ) : (
                <Button
                  active={true}
                  onPress={() => {
                    this.setState({
                      tentativas: 0,
                      respostaSelecionada: -1,
                      perguntaAtiva: 0
                    });
                  }}
                >
                  <Text style={styles.footerText}>Reiniciar </Text>
                  <Icon type="FontAwesome" name="undo" />
                </Button>
              )
            ) : parseInt(responseCorrect) === this.state.respostaSelecionada ? (
              <Button
                active={
                  parseInt(responseCorrect) === this.state.respostaSelecionada
                    ? true
                    : false
                }
                onPress={() => {
                  if (
                    parseInt(responseCorrect) === this.state.respostaSelecionada
                  ) {
                    this.setState({
                      tentativas: 0,
                      respostaSelecionada: -1,
                      perguntaAtiva:
                        this.state.perguntaAtiva >= numeroDePerguntas
                          ? numeroDePerguntas
                          : this.state.perguntaAtiva + 1
                    });
                  }
                }}
              >
                <Text style={styles.footerText}>Proxima pergunta </Text>
                <Icon type="FontAwesome" name="arrow-forward" />
              </Button>
            ) : (
              <Button
                active={true}
                onPress={() => {
                  this.setState({
                    tentativas: 0,
                    respostaSelecionada: -1,
                    perguntaAtiva: 0
                  });
                }}
              >
                <Text style={styles.footerText}>Reiniciar </Text>
                <Icon type="FontAwesome" name="undo" />
              </Button>
            )}
          </FooterTab>
        </Footer>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { height: "90.4%" },
  footerText: {
    color: "#fff"
  }
});
const mapStateToProps = state => {
  return {
    aula: state.aulasReducer.aula,
    user: state.authReducer.user
  };
};
export default connect(
  mapStateToProps,
  { finalizarAula, currentUser }
)(Quiz);
