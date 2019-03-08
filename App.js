import { createDrawerNavigator, createAppContainer } from "react-navigation";

import loadScreen from "./views/loadScreen";
import main from "./views/main";
import login from "./views/login";
import post from "./views/post";
import aulas from "./views/aulas";
import aula from "./views/aula";
import video from "./views/video";
import quiz from "./views/quiz";
import done from "./views/congratulations";
import GerenciarAulas from "./views/gerenciarAulas";

import drawer from "./components/drawer";

const AppNavigator = createDrawerNavigator(
  {
    loadScreen: {
      screen: loadScreen,
      navigationOptions: { drawerLockMode: "locked-closed" }
    },
    login: {
      screen: login,
      navigationOptions: { drawerLockMode: "locked-closed" }
    },
    main: {
      screen: main
    },
    post: {
      screen: post
    },
    aulas: {
      screen: aulas
    },
    aula: {
      screen: aula
    },
    video: {
      screen: video
    },
    quiz: {
      screen: quiz
    },
    done: {
      screen: done
    },
    gerenciarAulas: {
      screen: GerenciarAulas
    }
  },
  {
    drawerPosition: "right",
    initialRouteName: "loadScreen",
    contentComponent: drawer,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

const App = createAppContainer(AppNavigator);

import React, { Component } from "react";

import { Provider } from "react-redux";
import configStore from "./redux/storeConfig";
const store = configStore();

export default class Apps extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
