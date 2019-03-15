import React, { Component, Fragment } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";

import NavBar from "../../components/navbar";
import Notification from "../../components/notifications";
import VideThumb from "../../components/videoThumb";
import CabecalhoAula from "../../components/cabecalhoAula";
import AddComentario from "../../components/addComentario";
import ListaDeComentarios from "../../components/listaDeComentarios";

import { get_Aula } from "../../redux/actions/aulas";
import { config } from "../../config";
class Aula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vId: this.props.navigation.getParam("id"),
      lastVId: -1,
      fullscreen: false
    };
  }
  // componentWillMount() {}
  verificarVizualizacao(id) {
    var check = this.props.user.videos.filter(e => {
      return e.video_id === id ? true : false;
    });
    return check;
  }
  getData() {
    this.props.get_Aula(this.props.navigation.getParam("id"));
    this.setState({
      vId: this.props.navigation.getParam("id"),
      lastVId: this.props.navigation.getParam("id")
    });
  }

  render() {
    if (this.props.navigation.getParam("id") != this.state.lastVId) {
      this.getData();
    }
    const statusNotifications = this.props.navigation.getParam(
      "notifications",
      false
    );
    const {
      title,
      description,
      tags,
      thumbnail,
      url,
      comentarios,
      id,
      tempo
    } = this.props.aula;
    // Media de Conclusão
    var total = 0;
    var arr = tempo ? tempo : [];
    arr.map(({ time }) => {
      total = total + time;
    });
    var results = total / arr.length;
    // end Media de Conclusão
    var check = this.verificarVizualizacao(id);
    return (
      <View>
        <NavBar
          title={"Aula"}
          backActive={true}
          back="aulas"
          navigation={this.props.navigation}
        />

        <ScrollView style={styles.container}>
          {statusNotifications ? <Notification /> : null}
          <VideThumb
            navigation={this.props.navigation}
            id={this.state.vId}
            url={thumbnail}
            video={url}
            check={check.length >= 1 ? true : false}
          />
          <CabecalhoAula
            title={title ? title : "title"}
            description={description ? description : null}
            tags={[tags ? tags.tags : ["Tag"]]}
            check={check.length >= 1 ? true : false}
          />
          {this.props.user.isAdmin ? (
            <Fragment>
              <Text style={{ fontSize: config.fontSize.menu, marginLeft: 10 }}>
                <Text style={{ color: config.colors.text, fontWeight: "bold" }}>
                  Media de Conclusão:{" "}
                </Text>
                {results.toFixed(3)}s
              </Text>
              <Text style={{ fontSize: config.fontSize.menu, marginLeft: 10 }}>
                <Text style={{ color: config.colors.text, fontWeight: "bold" }}>
                  Conclusões:{" "}
                </Text>
                {arr.length}
              </Text>
            </Fragment>
          ) : null}
          <AddComentario
            id={this.state.vId}
            navigation={this.props.navigation}
          />
          <ListaDeComentarios comments={comentarios ? comentarios : false} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { height: "90%" }
});
const mapStateToProps = state => {
  return {
    aula: state.aulasReducer.aula,
    user: state.authReducer.user
  };
};
export default connect(
  mapStateToProps,
  { get_Aula }
)(Aula);
