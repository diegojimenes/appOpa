import { config } from "../../config";
import { AsyncStorage, Alert } from "react-native";
import axios from "axios";

const api = axios.create({
  baseURL: config.api,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json"
  }
});

export const get_Posts = id => {
  // alert(TOKEN);
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      var params = {
        headers: { Authorization: "bearer " + TOKEN }
      };
      axios
        .get(`${config.api}post`, params)
        .then(response => {
          return dispatch({
            type: "GET_POSTS",
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

export const get_Post = id => {
  // alert(TOKEN);
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      var params = {
        headers: { Authorization: "bearer " + TOKEN }
      };
      axios
        .get(`${config.api}post/${id}`, params)
        .then(response => {
          return dispatch({
            type: "GET_POST",
            payload: response.data
          });
        })
        .catch(error => {
          Alert.alert(JSON.stringify(error));
          return dispatch({
            type: "NAO_AUTORIZADO",
            payload: "Você não tem permição para estar aqui"
          });
        });
    });
  };
};

export const AddPost = (title, content, img) => {
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "post",
        url: "post",
        data: `title=${title}&content=${content}&img=${img}`
      })
        .then(response => {
          return dispatch({
            type: "NEW_POST",
            payload: response.data
          });
        })
        .then(() => {})
        .catch(error => {
          alert(error);
        });
    });
  };
};

export const EditPost = (title, content, img) => {
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "put",
        url: `post/${id}`,
        data: `title=${title}&content=${content}&img=${img}`
      })
        .then(response => {})
        .then(() => {})
        .catch(error => {
          alert(error);
        });
    });
  };
};

export const dellPost = id => {
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "delete",
        url: `post/${id}`
      })
        .then(response => {})
        .then(() => {})
        .catch(error => {
          alert(error);
        });
    });
  };
};
