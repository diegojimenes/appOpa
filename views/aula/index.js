import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground
} from "react-native";
import { Icon } from "native-base";
import { connect } from "react-redux";

import { config } from "../../config";

import NavBar from "../../components/navbar";
import Notification from "../../components/notifications";
import VideThumb from "../../components/videoThumb";
import CabecalhoAula from "../../components/cabecalhoAula";
import AddComentario from "../../components/addComentario";
import ListaDeComentarios from "../../components/listaDeComentarios";
class Aula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false
    };
  }
  render() {
    const statusNotifications = this.props.navigation.getParam(
      "notifications",
      false
    );
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
            id={1}
            url="https://ichef.bbci.co.uk/news/660/cpsprodpb/143B/production/_103197150_classroom.jpg"
          />
          <CabecalhoAula
            title="teste"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
            tags={["tag", "tag", "tag", "tag", "tag"]}
          />
          <AddComentario />
          <ListaDeComentarios />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { height: "90%" }
});
const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  null
)(Aula);
