import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Modal,
  Alert,
  TouchableHighlight
} from "react-native";
import {
  List,
  ListItem,
  Body,
  Right,
  Button,
  Icon,
  Form,
  Item,
  Label,
  Input,
  Textarea
} from "native-base";
import { connect } from "react-redux";
import { config } from "../../config";

import NavBar from "../../components/navbar";
import Notification from "../../components/notifications";

import { get_Aulas } from "../../redux/actions/aulas";
class GerenciarAulas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentWillMount() {
    this.props.get_Aulas();
  }
  listaDeAulas() {
    return this.props.aulas.map(
      ({ title, description, tags, id, thumbnail, url, comentarios }) => {
        return (
          <ListItem key={id}>
            <Body>
              <Text style={styles.title}>{title}</Text>
              <Text note numberOfLines={1}>
                {description}
              </Text>
            </Body>
            <Right style={styles.buttons}>
              <Button
                info
                style={styles.button}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              >
                <Text>
                  <Icon type="FontAwesome" name="edit" />
                </Text>
              </Button>
              <Button
                danger
                style={styles.button}
                onPress={() =>
                  Alert.alert(
                    "Deletar aula",
                    "Você tem certeza disso?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: true }
                  )
                }
              >
                <Text>
                  <Icon type="FontAwesome" name="trash" />
                </Text>
              </Button>
            </Right>
          </ListItem>
        );
      }
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
        <View>
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
              Editar Aula
            </Text>
          </View>
          <ScrollView>
            <Form>
              <Item floatingLabel>
                <Label>title</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>description</Label>
                <Textarea rowSpan={5} />
              </Item>
            </Form>
          </ScrollView>
        </View>
      </Modal>
    );
  }
  render() {
    const statusNotifications = this.props.navigation.getParam(
      "notifications",
      false
    );

    return (
      <View>
        {this.modal()}
        <NavBar
          title={"Gerenciar aulas"}
          backActive={true}
          back="main"
          navigation={this.props.navigation}
        />

        <ScrollView style={styles.container}>
          {statusNotifications ? <Notification /> : null}
          <List>{this.listaDeAulas()}</List>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { height: "90%" },
  buttons: {
    flexDirection: "row"
  },
  button: {
    padding: 10
  },
  title: {
    fontSize: config.fontSize.title
  }
});
const mapStateToProps = state => {
  return {
    aulas: state.aulasReducer.aulas,
    user: state.authReducer.user
  };
};
export default connect(
  mapStateToProps,
  { get_Aulas }
)(GerenciarAulas);
