import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import { Icon } from "native-base";
import NavBar from "../../components/navbar";
import { config } from "../../config";

import Notification from "../../components/notifications";
import { connect } from "react-redux";
import { dellPost, get_Posts } from "../../redux/actions/posts";
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { carregando: false };
  }
  render() {
    const statusNotifications = this.props.navigation.getParam(
      "notifications",
      false
    );
    return (
      <View>
        <NavBar
          title={"Post"}
          backActive={true}
          back="main"
          navigation={this.props.navigation}
        />
        <ScrollView
          style={{ height: "90%" }}
          navigation={this.props.navigation}
        >
          {statusNotifications ? <Notification /> : null}
          <Image
            style={{ width: "100%", height: 200 }}
            source={{
              uri: this.props.post ? this.props.post.img : ""
            }}
          />
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <Text style={styles.title}>
                {this.props.post ? this.props.post.title : ""}
              </Text>
              {this.props.user.isAdmin ? (
                <View style={{ flexDirection: "row", padding: 10 }}>
                  <TouchableOpacity style={{ marginRight: 20 }}>
                    <Icon type="FontAwesome" name="edit" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Promise.all([
                        this.props.dellPost(this.props.post.id),
                        this.props.get_Posts()
                      ]).then(() => {
                        this.setState({ carregando: true });
                        setTimeout(() => {
                          this.setState({
                            carregando: false
                          });
                          this.props.navigation.navigate("main");
                        }, 3000);
                      });
                    }}
                  >
                    <Icon type="FontAwesome" name="trash" />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>

            <Text style={styles.text}>
              {this.props.post ? this.props.post.content : ""}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: config.fontSize.title2,
    fontWeight: "bold",
    color: config.colors.text
  },
  text: {
    fontSize: config.fontSize.paragraph,
    color: config.colors.text
  },
  content: {
    paddingHorizontal: 20
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
const mapStateToProps = state => {
  return {
    post: state.postsReducer.post,
    user: state.authReducer.user
  };
};

export default connect(
  mapStateToProps,
  { dellPost, get_Posts }
)(Post);
