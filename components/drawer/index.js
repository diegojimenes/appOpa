import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Icon, Button } from "native-base";
import { config } from "../../config";

import { connect } from "react-redux";
import { logout, currentUser } from "../../redux/actions/auth";
class loadScreen extends React.Component {
  componentWillMount() {
    this.props.currentUser();
  }
  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Button
            transparent
            onPress={() => this.props.navigation.closeDrawer()}
          >
            <Icon type="FontAwesome" name="times" style={styles.icon} />
          </Button>
          <Text style={styles.title}>Profile</Text>
        </View>
        {/* Perfil */}
        <View style={styles.profile}>
          <View style={styles.name}>
            <Text style={styles.username}>
              {this.props.user.username ? this.props.user.username : "username"}
            </Text>
          </View>
          <View style={styles.profileData}>
            <View style={styles.activit}>
              <Text>Atividades</Text>
              <Text>25%</Text>
            </View>
            <Image
              style={styles.photo}
              source={{
                uri: this.props.user.img
                  ? this.props.user.img
                  : "data:image/png;base64,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"
              }}
            />
            <View style={styles.score}>
              <Text>Pontos</Text>
              <Text>158</Text>
            </View>
          </View>
        </View>
        {/* Menu */}
        <View style={styles.menu}>
          <Text
            style={styles.itemMenu}
            onPress={() => this.props.navigation.navigate("aulas")}
          >
            Aulas
          </Text>
          <Text style={styles.itemMenu} onPress={() => alert("2")}>
            Editar perfil
          </Text>
          <Text
            style={styles.itemMenu}
            onPress={() => {
              this.props.logout(this.props.navigation);
            }}
          >
            Sair
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: config.colors.background
  },
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: config.fontSize.title,
    color: config.colors.white
  },
  icon: {
    color: config.colors.white
  },
  profile: {
    backgroundColor: config.colors.white,
    width: "90%",
    marginLeft: "5%",
    borderRadius: 15
  },
  profileData: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 10
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 150,
    marginBottom: -30,
    marginLeft: -25,
    borderColor: "#fff",

    borderWidth: 5
  },
  name: {
    marginTop: 10,
    alignItems: "center"
  },
  username: {
    fontSize: config.fontSize.title2
  },
  activit: {
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10
  },
  score: {
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10
  },
  menu: {
    marginTop: 50,
    alignItems: "center"
  },
  itemMenu: {
    fontSize: config.fontSize.menu,
    color: config.colors.white,
    marginVertical: 10
  }
});

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

export default connect(
  mapStateToProps,
  { logout, currentUser }
)(loadScreen);
