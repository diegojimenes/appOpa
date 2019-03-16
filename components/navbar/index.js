import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";
import { BackHandler } from "react-native";
import { config } from "../../config";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.backButtonListener = null;
    this.state = {};
  }
  componentDidMount() {
    this.backButtonListener = BackHandler.addEventListener(
      "hardwareBackPress",
      () => this.props.navigation.navigate(this.props.back)
    );
  }
  componentWillUnmount() {
    this.backButtonListener.remove();
  }

  render() {
    const statusNotifications = this.props.navigation.getParam(
      "notifications",
      false
    );
    return (
      <Header
        androidStatusBarColor={config.colors.primary}
        style={{ backgroundColor: config.colors.primary }}
      >
        {this.props.backActive ? (
          <Left>
            <Button
              transparent
              accessibilityLabel="Voltar para ultima pagina"
              onPress={() => this.props.navigation.navigate(this.props.back)}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
        ) : null}
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Icon name="menu" />
          </Button>
          <Button
            transparent
            accessibilityLabel="Abrir menu lateral"
            onPress={() =>
              this.props.navigation.setParams({
                notifications: !statusNotifications
              })
            }
          >
            <Icon type="FontAwesome" name="bell" />
          </Button>
        </Right>
      </Header>
    );
  }
}
