import React, { Component } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { config } from "../../config";

import NavBar from "../../components/navbar";
import Notification from "../../components/notifications";
class Aula extends Component {
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
