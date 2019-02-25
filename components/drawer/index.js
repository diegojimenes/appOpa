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
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/tourbrazil-41fbe.appspot.com/o/userImg%2F15107380_1100866243367062_3389386727923589738_n.jpg?alt=media&token=969da9ba-8744-4caf-a54a-1f1a4abd1a59"
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
