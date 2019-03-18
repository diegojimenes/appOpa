import React, { Fragment } from "react";
import OneSignal from "react-native-onesignal";
import {
  View,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  Alert
} from "react-native";
import NavBar from "../../components/navbar";
import PostDestaque from "../../components/postDestaque";
import Post from "../../components/post";
import { config } from "../../config";

import Notification from "../../components/notifications";

import { connect } from "react-redux";
import { get_Posts, get_Post } from "../../redux/actions/posts";
// import { addNotify } from "../../redux/actions/notificate";
import axios from "axios";
const api = axios.create({
  baseURL: config.api,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json"
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    OneSignal.init("926a3a46-03e2-48d7-9db4-a11c7a663d87");
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    // OneSignal.removeEventListener("ids", this.onIds);
  }
  onReceived(notification) {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "post",
        url: "notify",
        data: `title=${notification.payload.title}&body=${
          notification.payload.body
        }&data=${JSON.stringify(notification.payload.additionalData)}`
      })
        .then(response => {})
        .then(() => {})
        .catch(error => {
          alert(JSON.stringify(error));
        });
    });
    // this.props.addNotify(
    //   notification.payload.title,
    //   notification.payload.body,
    //   "51/454/464"
    // );
  }
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
          {statusNotifications ? (
            <Notification navigation={this.props.navigation} />
          ) : null}
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
