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

import { connect } from "react-redux";

class ListaDeComentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Content style={{ marginTop: 20 }}>
        <List>
          {this.props.comments.map(({ comment, img, data, name }) => {
            return (
              <ListItem avatar>
                <Left>
                  <Thumbnail
                    source={{
                      uri: img
                    }}
                  />
                </Left>
                <Body>
                  <Text>{name}</Text>
                  <Text note>{comment}</Text>
                </Body>
                <Right>
                  <Text note>{data}</Text>
                </Right>
              </ListItem>
            );
          })}
        </List>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  null
)(ListaDeComentarios);
