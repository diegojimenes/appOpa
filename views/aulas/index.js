import React, { Component } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { config } from "../../config";

import NavBar from "../../components/navbar";
import Notification from "../../components/notifications";
import ItemAula from "../../components/itemAula";
class Aulas extends Component {
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
          <ItemAula
            title="teste"
            check={true}
            navigation={this.props.navigation}
            content="Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI"
            tags={["tag1", "tag2", "tag3", "tag4"]}
            id={1}
          />
          <ItemAula
            title="teste"
            check={true}
            navigation={this.props.navigation}
            content="Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI"
            tags={["tag1", "tag2"]}
            id={2}
          />
          <ItemAula
            title="teste"
            check={false}
            navigation={this.props.navigation}
            content="Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI"
            tags={["tag1"]}
            id={3}
          />
          <ItemAula
            title="teste"
            check={false}
            navigation={this.props.navigation}
            content="Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI"
            tags={["tag1", "tag2", "tag3", "tag4"]}
            id={4}
          />
          <ItemAula
            title="teste"
            check={false}
            navigation={this.props.navigation}
            content="Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI"
            tags={["tag1", "tag2", "tag3", "tag4"]}
            id={4}
          />
          <ItemAula
            title="teste"
            check={false}
            navigation={this.props.navigation}
            content="Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI"
            tags={["tag1", "tag2", "tag3", "tag4"]}
            id={4}
          />
          <ItemAula
            title="teste"
            check={false}
            navigation={this.props.navigation}
            content="Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI"
            tags={["tag1", "tag2", "tag3", "tag4"]}
            id={4}
          />
          <ItemAula
            title="teste"
            check={false}
            navigation={this.props.navigation}
            content="Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI"
            tags={["tag1", "tag2", "tag3", "tag4"]}
            id={4}
          />
          <ItemAula
            title="teste"
            check={false}
            navigation={this.props.navigation}
            content="Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI"
            tags={["tag1", "tag2", "tag3", "tag4"]}
            id={4}
          />
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
  return {};
};
export default connect(
  mapStateToProps,
  null
)(Aulas);
