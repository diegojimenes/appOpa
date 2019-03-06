import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { config } from "../../config";
export default class ItemAula extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("aula", {
            id: this.props.id,
            check: this.props.check,
            title: this.props.title,
            content: this.props.content,
            tags: this.props.tags,
            thumbnail: this.props.thumbnail,
            url: this.props.url,
            comentarios: this.props.comentarios
          })
        }
        style={styles.container}
      >
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: this.props.check
              ? config.colors.checked
              : config.colors.unChecked,
            borderRadius: 40,
            marginLeft: -20
          }}
        >
          {this.props.check ? (
            <Icon
              type="FontAwesome"
              name="check"
              style={{ color: config.colors.white }}
            />
          ) : null}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.text}>{this.props.content}</Text>
          <View style={styles.tags}>
            {this.props.tags.map(tag => {
              return (
                <View style={styles.tag} key={tag + Math.random()}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 20
  },
  content: {
    marginLeft: 10
  },
  title: {
    fontSize: config.fontSize.title,
    color: config.colors.text
  },
  text: {
    fontSize: config.fontSize.paragraph,
    color: config.colors.text
  },
  tags: {
    flexDirection: "row"
  },
  tag: {
    height: 25,
    backgroundColor: config.colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginRight: 10,
    borderRadius: 5
  },
  tagText: {
    color: config.colors.white
  }
});
