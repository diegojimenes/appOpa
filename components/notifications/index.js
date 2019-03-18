import React, { Component } from "react";
import { Left, Body, Right, Text, ListItem, Icon } from "native-base";
import { StyleSheet, ScrollView, View } from "react-native";
import { config } from "../../config";
import { connect } from "react-redux";
import {
  getNotify,
  marcar_como_visualizado
} from "../../redux/actions/notificate";
class NavBar extends Component {
  componentWillMount() {
    this.props.getNotify();
  }
  verificarVizualizacao(id) {
    var check = this.props.user.notificacoes.filter(e => {
      return e.notificate_id === id ? true : false;
    });
    return check;
  }
  renderNotificate() {
    return this.props.notify.map(({ title, body, created_at, data, id }) => {
      var check = this.verificarVizualizacao(id);
      var vizualizado = check.length >= 1 ? true : false;
      return (
        <ListItem
          key={id + "notify"}
          avatar
          onPress={() => {
            Promise.all([this.props.marcar_como_visualizado(id)]).then(() => {
              this.props.navigation.navigate("aula", { id: data.id });
            });
          }}
        >
          <Left>
            <Icon
              type="FontAwesome"
              name="bell"
              style={{
                color: vizualizado
                  ? config.colors.unChecked
                  : config.colors.checked
              }}
            />
          </Left>
          <Body>
            <Text>{title}</Text>
            <Text note>{body} </Text>
          </Body>
          <Right>
            <Text note>{created_at}</Text>
          </Right>
        </ListItem>
      );
    });
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Notificações</Text>
        </View>
        {this.renderNotificate()}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 50,
    alignSelf: "flex-end"
  },
  header: {
    backgroundColor: config.colors.secondary,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "#fff"
  }
});

const mapStateToProps = state => {
  return {
    notify: state.notification.notify,
    user: state.authReducer.user
  };
};

export default connect(
  mapStateToProps,
  { getNotify, marcar_como_visualizado }
)(NavBar);
