import React, { Fragment } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import NavBar from "../../components/navbar";
import PostDestaque from "../../components/postDestaque";
import Post from "../../components/post";
import { config } from "../../config";

import Notification from "../../components/notifications";

import { connect } from "react-redux";
import { get_Posts, get_Post } from "../../redux/actions/posts";
class Home extends React.Component {
  componentDidMount() {
    this.props.get_Posts();
  }
  // title, content,img,id
  renderPosts() {
    return this.props.posts.map((e, i) => {
      return (
        <Fragment key={e.id + "post"}>
          {i <= 0 ? (
            <PostDestaque
              id={e.id}
              navigation={this.props.navigation}
              img={e.img}
              title={e.title}
              content={e.content}
              action={() => this.props.get_Post(e.id)}
            />
          ) : (
            <Post
              id={e.id}
              navigation={this.props.navigation}
              img={e.img}
              title={e.title}
              content={e.content}
              action={() => this.props.get_Post(e.id)}
            />
          )}
        </Fragment>
      );
    });
  }
  render() {
    const statusNotifications = this.props.navigation.getParam(
      "notifications",
      false
    );
    return (
      <View>
        <NavBar
          title={config.name}
          backActive={false}
          navigation={this.props.navigation}
        />
        <ScrollView
          style={{ height: "90%" }}
          navigation={this.props.navigation}
        >
          {statusNotifications ? <Notification /> : null}
          {this.props.posts.length ? (
            this.renderPosts()
          ) : (
            <ActivityIndicator size="large" color={config.colors.primary} />
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsReducer.posts
  };
};

export default connect(
  mapStateToProps,
  { get_Posts, get_Post }
)(Home);
