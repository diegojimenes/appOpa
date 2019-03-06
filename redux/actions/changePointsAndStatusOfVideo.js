import { config } from "../../config";
import { AsyncStorage } from "react-native";
import axios from "axios";
const api = axios.create({
  baseURL: config.api,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json"
  }
});

export const finalizarAula = (points, uid, vid) => {
  return dispatch => {
    Promise.all([
      changePoints(points, dispatch),
      changeStatus(uid, vid, dispatch)
    ]).then(() => {});
  };
};

const changePoints = (points, dispatch) => {
  AsyncStorage.getItem("userToken", (err, TOKEN) => {
    api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
    api({
      method: "post",
      url: "changePoints",
      data: `pontos=${parseInt(points)}`
    })
      .then(response => {})
      .then(() => {})
      .catch(error => {
        alert(error);
      });
  });
};

const changeStatus = (uid, vid, dispatch) => {
  AsyncStorage.getItem("userToken", (err, TOKEN) => {
    api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
    api({
      method: "post",
      url: "visualizado",
      data: `video_id=${vid}&user_id=${uid}&visualizado=${true}`
    })
      .then(response => {})
      .then(() => {})
      .catch(error => {
        alert(error);
      });
  });
};
