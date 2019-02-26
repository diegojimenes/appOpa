import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { config } from "../../config";

class Cabecalho extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.description}>{this.props.description}</Text>
        <View style={styles.continerListTags}>
          {this.props.tags.map(e => {
            return (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{e}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  title: {
    fontSize: config.fontSize.title2,
    color: config.colors.text
  },
  description: {
    fontSize: config.fontSize.paragraph,
    color: config.colors.text
  },
  continerListTags: {
    marginTop: 10,
    flexDirection: "row"
  },
  tag: {
    height: 30,
    backgroundColor: config.colors.secondary,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  tagText: {
    color: "#fff"
  }
});
const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  null
)(Cabecalho);
