import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Modal,
  TouchableHighlight
} from "react-native";
import {
  Button,
  Icon,
  Form,
  Item,
  Label,
  Input,
  Footer,
  FooterTab
} from "native-base";
import { connect } from "react-redux";
import { config } from "../../config";
import ImagePicker from "react-native-image-picker";

import { AddPost, get_Posts } from "../../redux/actions/posts";

const options = {
  title: "Select Video",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
class ListaDeComentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  formModal() {
    return (
      <Form>
        <Item floatingLabel>
          <Label>title</Label>
          <Input
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
        </Item>
        <Item floatingLabel>
          <Label>Content</Label>
          <Input
            onChangeText={content => this.setState({ content })}
            value={this.state.content}
          />
        </Item>

        <Item
          style={{
            flexDirection: "column"
          }}
        >
          <Button
            style={{
              backgroundColor: config.colors.primary,
              marginVertical: 10
            }}
            onPress={() =>
              ImagePicker.launchImageLibrary(options, response => {
                console.log("Response = ", response);

                if (response.didCancel) {
                  console.log("User cancelled image picker");
                } else if (response.error) {
                  console.log("ImagePicker Error: ", response.error);
                } else if (response.customButton) {
                  console.log(
                    "User tapped custom button: ",
                    response.customButton
                  );
                } else {
                  const source = { uri: response.uri };

                  // You can also display the image using data:
                  // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                  this.setState({
                    avatarSource: source
                  });
                }
              })
            }
          >
            <Icon type="FontAwesome" name="camera" />
            <Text
              style={{
                color: config.colors.white,
                marginRight: 20
              }}
            >
              Carregar Thumbnail
            </Text>
          </Button>
        </Item>
      </Form>
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
              Nova Publicação
            </Text>
          </View>
          <ScrollView>{this.formModal()}</ScrollView>
          <Footer
            style={{
              flexDirection: "row"
            }}
          >
            <FooterTab
              style={{
                backgroundColor: config.colors.primary
                // marginVertical: 10
              }}
            >
              <Button
                onPress={() => {
                  Promise.all([
                    this.props.AddPost(
                      this.state.title,
                      `${this.state.content}`,
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsgoAQDnFwxvtZ-5_4A5dm4gu4hJi03-IUVALXph1hZe5VxkLg"
                    ),
                    this.setModalVisible(!this.state.modalVisible)
                  ]).then(() => this.props.get_Posts());
                }}
              >
                <Text style={{ color: "#fff" }}>Enviar</Text>
              </Button>
            </FooterTab>
          </Footer>
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
          <Text style={this.props.style}>Nova publicação</Text>
        </TouchableHighlight>
        {this.modal()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    // lastId: state.comentario.lastId
  };
};

export default connect(
  mapStateToProps,
  { AddPost, get_Posts }
)(ListaDeComentarios);
