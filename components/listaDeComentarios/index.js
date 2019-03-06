import React, { Component } from "react";
import {
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
import { ActivityIndicator } from "react-native";
import { connect } from "react-redux";

class ListaDeComentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "#fff"
    };
  }
  listComments() {
    return this.props.comments
      .reverse()
      .map(({ conteudo, created_at, user, id }) => {
        return (
          <ListItem
            avatar
            key={id + created_at}
            style={{
              backgroundColor: this.state.activeItem
            }}
          >
            <Left>
              <Thumbnail
                source={{
                  uri: user.img
                }}
              />
            </Left>
            <Body>
              <Text>{user.username}</Text>
              <Text note>{conteudo}</Text>
            </Body>
            <Right>
              <Text note>{created_at}</Text>
            </Right>
          </ListItem>
        );
      });
  }
  render() {
    // var comments = this.props.comments ? this.props.comments.reverse() : null;
    return (
      <Content style={{ marginTop: 20 }}>
        <List>
          {this.props.comments ? (
            this.listComments()
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </List>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    lastId: state.comentario.lastId
  };
};

export default connect(
  mapStateToProps,
  null
)(ListaDeComentarios);
