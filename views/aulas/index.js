import React, { Component } from "react";
import { ScrollView, View, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import { config } from "../../config";

import NavBar from "../../components/navbar";
import Notification from "../../components/notifications";
import ItemAula from "../../components/itemAula";

import { get_Aulas } from "../../redux/actions/aulas";
class Aulas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadContent: true
    };
  }
  componentWillMount() {
    this.props.get_Aulas();
  }
  verificarVizualizacao(id) {
    var check = this.props.user.videos.filter(e => {
      return e.video_id === id ? true : false;
    });
    return check;
  }
  listaDeAulas() {
    return this.props.aulas.map(
      ({ title, description, tags, id, thumbnail, url, comentarios }) => {
        var check = this.verificarVizualizacao(id);

        return (
          <ItemAula
            key={id}
            thumbnail={thumbnail}
            title={title}
            url={url}
            check={check.length >= 1 ? true : false}
            navigation={this.props.navigation}
            content={description}
            tags={tags.tags}
            id={id}
            comentarios={comentarios}
          />
        );
      }
    );
  }
  render() {
    const statusNotifications = this.props.navigation.getParam(
      "notifications",
      false
    );

    return (
      <View>
        <NavBar
          title={"Aulas"}
          backActive={true}
          back="main"
          navigation={this.props.navigation}
        />
        <ScrollView style={styles.container}>
          {statusNotifications ? <Notification /> : null}
          <View style={styles.timeLine} />
          {/* {this.state.loadContent ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null} */}

          {this.props.aulas.length ? (
            this.listaDeAulas()
          ) : (
            <ActivityIndicator size="large" color={config.colors.primary} />
          )}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: "90%"
  },
  timeLine: {
    width: 3,
    height: "100%",
    backgroundColor: config.colors.primary,
    position: "absolute",
    top: 0,
    left: 20
  }
});
const mapStateToProps = state => {
  return {
    aulas: state.aulasReducer.aulas,
    user: state.authReducer.user
  };
};
export default connect(
  mapStateToProps,
  { get_Aulas }
)(Aulas);
