import React, { Component } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { connect } from "react-redux";

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
      fullscreen: false,
      comentarios: [
        {
          img:
            "https://osegredo.com.br/wp-content/uploads/2017/09/O-que-as-pessoas-felizes-t%C3%AAm-em-comum-site-830x450.jpg",
          name: "Jennifer",
          comment: "Doing what you like will always keep you happy . .",
          data: "3:43 pm"
        },
        {
          img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIc8W7-NLyEXZXp6JQ82JvoWx6RjANHDBxVzzU61lupNGynQV",
          name: "Jhon",
          comment: "Doing what you like will always keep you happy . .",
          data: "3:43 pm"
        },
        {
          img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLdSDIFMOMa_9nZH5vA49Fn0J4zUwMSnehznsCiKXGxChDGWkLuA",
          name: "Mario",
          comment: "Doing what you like will always keep you happy . .",
          data: "3:43 pm"
        }
      ]
    };
  }
  render() {
    const statusNotifications = this.props.navigation.getParam(
      "notifications",
      false
    );
    const id = this.props.navigation.getParam("id");
    const title = this.props.navigation.getParam("title");
    const content = this.props.navigation.getParam("content");
    const tags = this.props.navigation.getParam("tags");
    const thumbnail = this.props.navigation.getParam("thumbnail");
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
            url={thumbnail}
          />
          <CabecalhoAula title={title} description={content} tags={tags} />
          <AddComentario />
          <ListaDeComentarios comments={this.state.comentarios} />
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
