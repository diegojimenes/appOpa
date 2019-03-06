import React, { Component } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import NavBar from "../../components/navbar";
import Notification from "../../components/notifications";
import VideThumb from "../../components/videoThumb";
import CabecalhoAula from "../../components/cabecalhoAula";
import AddComentario from "../../components/addComentario";
import ListaDeComentarios from "../../components/listaDeComentarios";
import { get_Aula } from "../../redux/actions/aulas";
class Aula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vId: this.props.navigation.getParam("id"),
      fullscreen: false
    };
  }
  componentWillMount() {
    this.props.get_Aula(this.props.navigation.getParam("id"));
  }
  verificarVizualizacao(id) {
    var check = this.props.user.videos.filter(e => {
      return e.video_id === id ? true : false;
    });
    return check;
  }
  render() {
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
      id
    } = this.props.aula;
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
          />
          <CabecalhoAula
            title={title ? title : "title"}
            description={description ? description : null}
            tags={[tags ? tags.tags : ["Tag"]]}
            check={check.length >= 1 ? true : false}
          />
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
