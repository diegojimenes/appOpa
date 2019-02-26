import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";

import { config } from "../../config";

import NavBar from "../../components/navbar";
import Notification from "../../components/notifications";
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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("video")}
          >
            <View style={styles.video}>
              <Text>Video</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { height: "90%" },
  video: {
    width: "100%",
    height: 200,
    backgroundColor: "#899"
  }
});
const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  null
)(Aula);
