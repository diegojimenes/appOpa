import React, { Component } from "react";
import { Left, Body, Right, Text, ListItem, Icon } from "native-base";
import { StyleSheet, ScrollView, View } from "react-native";
import { config } from "../../config";
export default class NavBar extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Notificações</Text>
        </View>
        <ListItem avatar style={styles.list}>
          <Left>
            <Icon type="FontAwesome" name="bell" />
          </Left>
          <Body>
            <Text>Kumar Pratik</Text>
            <Text note>Doing what you like will </Text>
          </Body>
          <Right>
            <Text note>3:43 pm</Text>
          </Right>
        </ListItem>
        <ListItem avatar avatar style={styles.list}>
          <Left>
            <Icon type="FontAwesome" name="bell" />
          </Left>
          <Body>
            <Text>Kumar Pratik</Text>
            <Text note>Doing what you like will </Text>
          </Body>
          <Right>
            <Text note>3:43 pm</Text>
          </Right>
        </ListItem>
        <ListItem avatar avatar style={styles.list}>
          <Left>
            <Icon type="FontAwesome" name="bell" />
          </Left>
          <Body>
            <Text>Kumar Pratik</Text>
            <Text note>Doing what you like will </Text>
          </Body>
          <Right>
            <Text note>3:43 pm</Text>
          </Right>
        </ListItem>
        <ListItem avatar avatar style={styles.list}>
          <Left>
            <Icon type="FontAwesome" name="bell" />
          </Left>
          <Body>
            <Text>Kumar Pratik</Text>
            <Text note>Doing what you like will </Text>
          </Body>
          <Right>
            <Text note>3:43 pm</Text>
          </Right>
        </ListItem>
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
  list: {
    backgroundColor: "#fff"
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
