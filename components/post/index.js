import React from "react";
import {
  View,
  // Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Text } from "native-base";
import { config } from "../../config";
export default class Post extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.action();
          this.props.navigation.navigate("post", { id: this.props.id });
        }}
      >
        <Image
          style={{ width: 76, height: 76 }}
          source={{ uri: this.props.img }}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.text} note numberOfLines={3}>
            {this.props.content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row"
  },
  content: {
    width: "80%",
    marginLeft: 10,
    marginTop: -10
  },
  title: {
    fontSize: config.fontSize.title,
    color: config.colors.text,
    fontWeight: "bold"
  },
  text: {
    fontSize: config.fontSize.paragraph,
    color: config.colors.text
  }
});
