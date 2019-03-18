import { config } from "../../config";
import { AsyncStorage, Alert } from "react-native";
import OneSignal from "react-native-onesignal";
import axios from "axios";
const api = axios.create({
  baseURL: config.api,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json"
  }
});
export const getNotify = () => {
  // alert(TOKEN);
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      var params = {
        headers: { Authorization: "bearer " + TOKEN }
      };
      axios
        .get(`${config.api}notify`, params)
        .then(response => {
          return dispatch({
            type: "GET_NOTIFY",
            payload: response.data
          });
        })
        .catch(error => {
          Alert.alert(error);
          return dispatch({
            type: "NAO_AUTORIZADO",
            payload: "Você não tem permição para estar aqui"
          });
        });
    });
  };
};

export const sendNotification = (titulo, content, dados) => {
  return dispatch => {
    const method = "POST";
    const headers = {
      "Content-type": "application/json",
      Authorization: "Basic NzgwYzlkYWEtM2MwYS00Nzk1LWJmNzUtNDBlZTM3ZmQ0OTE3"
    };

    const body = JSON.stringify({
      app_id: "926a3a46-03e2-48d7-9db4-a11c7a663d87",
      // contents: { en: title },
      included_segments: ["Active Users", "Inactive Users"],
      contents: {
        en: content
      },
      headings: {
        en: titulo
      },
      data: dados
    });

    return fetch("https://onesignal.com/api/v1/notifications", {
      method,
      headers,
      body
    })
      .then(result => {})
      .catch(err => {});
  };
};

export const marcar_como_visualizado = notificate_id => {
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "post",
        url: "notificacao_visualizada",
        data: `notificate_id=${notificate_id}&visualizado=${true}`
      })
        .then(response => {})
        .then(() => {})
        .catch(error => {
          alert(error);
        });
    });
  };
};
