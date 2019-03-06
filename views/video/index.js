import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Toast, Icon } from "native-base";
import VideoPlayer from "react-native-video-controls";
import { connect } from "react-redux";
import { config } from "../../config";

class video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false,
      end: false,
      showToast: false
    };
  }

  render() {
    const video = this.props.navigation.getParam("video");
    const id = this.props.navigation.getParam("id");
    const check = this.props.navigation.getParam("check");
    return (
      <View
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <VideoPlayer
          style={styles.container}
          seekColor="#fff"
          source={{ uri: video }}
          navigator={this.props.navigator}
          onPressNext={() => this.props.navigation.navigate("quiz", { id })}
          showNext={this.state.end && !check ? this.state.end : false}
          nextColor={config.colors.primary}
          onStart={() => this.setState({ end: !this.state.end })}
          onEnd={() => this.setState({ end: !this.state.end })}
          nextContent={
            <Text style={styles.nextText}>
              Realizar quiz
              {/* <Icon active name="arrow-right" /> */}
            </Text>
          }
          onBack={() => this.props.navigation.navigate("aula")}
          onEnterFullscreen={() =>
            this.setState({ fullscreen: !this.state.fullscreen })
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  next: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    top: "50%"
  },
  nextText: {
    paddingHorizontal: 10,
    color: "#fff"
  }
});
const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  null
)(video);
