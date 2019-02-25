import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import NavBar from "../../components/navbar";
import PostDestaque from "../../components/postDestaque";
import Post from "../../components/post";
import { config } from "../../config";

import Notification from "../../components/notifications";
export default class Home extends React.Component {
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
          <PostDestaque
            id={1}
            navigation={this.props.navigation}
            img="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            title="test"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy..."
          />
          <Post
            id={1}
            navigation={this.props.navigation}
            img="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            title="test"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry..."
          />
          <Post
            id={1}
            navigation={this.props.navigation}
            img="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            title="test"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry..."
          />
          <Post
            id={1}
            navigation={this.props.navigation}
            img="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            title="test"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry..."
          />
          <Post
            id={1}
            navigation={this.props.navigation}
            img="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            title="test"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry..."
          />
          <Post
            id={1}
            navigation={this.props.navigation}
            img="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            title="test"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry..."
          />
        </ScrollView>
      </View>
    );
  }
}
