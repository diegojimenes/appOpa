import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import { Button, Icon } from "native-base";
import { connect } from "react-redux";

import NavBar from "../../components/navbar";
import Notification from "../../components/notifications";
import { config } from "../../config";
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respostaCerta: 0,
      respostaSelecionada: -1,
      tentativas: 1,
      dataAtual: new Date().getTime(),
      respostas: [
        {
          id: 0,
          text:
            " Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing"
        },
        {
          id: 1,
          text: "Lorem Ipsum is simply dummy text of the printing"
        },
        {
          id: 2,
          text: "Lorem Ipsum is simply dummy text of the printing"
        },
        {
          id: 3,
          text: "Lorem Ipsum is simply dummy text of the printing"
        }
      ]
    };
  }
  render() {
    const statusNotifications = this.props.navigation.getParam(
      "notifications",
      false
    );

    var novaData = new Date(this.state.dataAtual + 10086400);
    var proximaTentativa = `${novaData.getDate()}/${novaData.getMonth() +
      1}/${novaData.getFullYear()}`;
    return (
      <View>
        <NavBar
          title={"Quiz"}
          backActive={true}
          back="video"
          navigation={this.props.navigation}
        />
        <ScrollView style={styles.container}>
          {statusNotifications ? <Notification /> : null}
          <View style={styles.question}>
            <Text style={styles.questionText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
          </View>
          <View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: config.fontSize.title,
                marginTop: 20
              }}
            >{this.state.tentativas > 5 ? null : `Tente outra vez 😉 - ${proximaTentativa}`}</Text>
            {this.state.respostas.map(({ id, text }) => {
              return (
                <TouchableOpacity
                  key={id}
                  disabled={this.state.tentativas > 5 ? true : false}
                  style={styles.resposta}
                  onPress={() => {
                    this.setState({
                      respostaSelecionada: id,
                      tentativas: this.state.tentativas + 1
                    });
                  }}
                >
                  {id === this.state.respostaSelecionada ? (
                    this.state.respostaCerta ===
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
                  <Text style={styles.respostaText}>{text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { height: "90%" },
  question: {
    width: "90%",
    marginLeft: "5%",
    padding: 5,
    paddingVertical: 20,
    marginTop: 20,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: config.colors.secondary
  },
  questionText: {
    fontSize: config.fontSize.paragraph
  },
  respostaText: {
    color: config.colors.white
  },
  resposta: {
    backgroundColor: config.colors.primary,
    width: "100%",
    marginTop: 20,
    padding: 10,
    alignItems: "center"
  }
});
const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  null
)(Quiz);
