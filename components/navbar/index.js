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
import { config } from "../../config";

export default class NavBar extends Component {
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
