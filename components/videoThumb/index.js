import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground
} from "react-native";
import { Icon } from "native-base";
import { connect } from "react-redux";

class VideoThumb extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("video", {
            video: this.props.video,
            id: this.props.id,
            check: this.props.check
          })
        }
      >
        <ImageBackground
          source={{
            uri: this.props.url
          }}
          style={styles.video}
        >
          <View style={styles.overlay}>
            <Icon type="FontAwesome" name="play" style={styles.playbutton} />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 200,
    backgroundColor: "#899"
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center"
  },
  playbutton: {
    color: "#fff"
  }
});
const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  null
)(VideoThumb);
