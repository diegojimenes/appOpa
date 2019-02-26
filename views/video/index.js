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
    return (
      <View
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        {this.state.end ? (
          <Button style={styles.next} onPress={() => alert("cu")}>
            <Text style={styles.nextText}>
              Realizar quiz <Icon active name="right" />
            </Text>
          </Button>
        ) : null}
        <VideoPlayer
          style={styles.container}
          seekColor="#fff"
          source={{ uri: "https://vjs.zencdn.net/v/oceans.mp4" }}
          navigator={this.props.navigator}
          onEnd={() => this.setState({ end: !this.state.end })}
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
