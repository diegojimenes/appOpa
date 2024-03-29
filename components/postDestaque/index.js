import React from "react";
import { config } from "../../config";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
// buscar parametros da rota
// this.props.navigation.getParam("id", "defaultValue")
import { Text } from "native-base";
export default class PostDestaque extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.action();
          this.props.navigation.navigate("post", { id: this.props.id });
        }}
      >
        <Image
          style={{ width: "100%", height: 200 }}
          source={{
            uri: this.props.img
          }}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.text} note numberOfLines={2}>
            {this.props.content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: config.fontSize.title2,
    fontWeight: "bold",
    color: config.colors.text
  },
  text: {
    fontSize: config.fontSize.paragraph,
    color: config.colors.text
  },
  content: {
    paddingHorizontal: 20
  }
});
