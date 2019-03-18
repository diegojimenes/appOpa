import React, { Component } from "react";
import { View, Text, Modal, TouchableHighlight } from "react-native";
import { Thumbnail, Icon } from "native-base";
import { connect } from "react-redux";
import { config } from "../../config";

import { get_Ranking } from "../../redux/actions/auth";

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  componentDidMount() {
    this.props.get_Ranking();
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  ItemRanking(pontos, username, img, id, videos, i) {
    return (
      <View
        style={{
          width: 90,
          height: 150,
          alignItems: "center"
        }}
        key={id}
      >
        <Text style={{ fontSize: config.fontSize.title }}>{i}°</Text>
        <Thumbnail source={{ uri: img }} />
        <Text>{username}</Text>
        <Text>Pontos: {pontos}</Text>
        <Text>Questões: {videos.length}</Text>
      </View>
    );
  }
  formModal() {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        {this.props.ranking.map(({ pontos, username, img, id, videos }, i) => {
          return this.ItemRanking(pontos, username, img, id, videos, i + 1);
        })}
      </View>
    );
  }
  modal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}
      >
        <View
          style={{
            height: "100%"
          }}
        >
          <View
            style={{
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <TouchableHighlight
              style={{ marginLeft: 10 }}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Icon type="FontAwesome" name="times" />
            </TouchableHighlight>
            <Text
              style={{
                fontSize: config.fontSize.title,
                marginLeft: 10
              }}
            >
              Ranking
            </Text>
          </View>
          {this.formModal()}
        </View>
      </Modal>
    );
  }
  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={() => this.setModalVisible(!this.state.modalVisible)}
        >
          <Text style={this.props.style}>Ranking</Text>
        </TouchableHighlight>
        {this.modal()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ranking: state.authReducer.ranking
  };
};

export default connect(
  mapStateToProps,
  { get_Ranking }
)(Ranking);
