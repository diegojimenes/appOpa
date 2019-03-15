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

export const get_Aulas = () => {
  // alert(TOKEN);
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      var params = {
        headers: { Authorization: "bearer " + TOKEN }
      };
      axios
        .get(`${config.api}videos`, params)
        .then(response => {
          return dispatch({
            type: "GET_AULAS",
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

export const get_Aula = id => {
  // alert(TOKEN);
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      var params = {
        headers: { Authorization: "bearer " + TOKEN }
      };
      axios
        .get(`${config.api}videos/${id}`, params)
        .then(response => {
          return dispatch({
            type: "GET_AULA",
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

export const AddAula = (title, description, tags, thumbnail, url) => {
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "post",
        url: "videos",
        data: `title=${title}&description=${description}&tags=${tags}&thumbnail=${thumbnail}&url=${url}`
      })
        .then(response => {
          return dispatch({
            type: "NEW_AULA",
            payload: response.data.id
          });
        })
        .then(() => {})
        .catch(error => {
          alert(JSON.stringify(error));
        });
    });
  };
};

export const EditAula = (title, description, tags, id, thumbnail, url) => {
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "put",
        url: `videos/${id}`,
        data: `title=${title}&description=${description}&tags=${tags}&thumbnail=${thumbnail}&url=${url}`
      })
        .then(response => {})
        .then(() => {})
        .catch(error => {
          alert(error);
        });
    });
  };
};

export const dellAula = id => {
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "delete",
        url: `videos/${id}`
      })
        .then(response => {})
        .then(() => {})
        .catch(error => {
          alert(error);
        });
    });
  };
};

// perguntas

export const AddPergunta = (
  video_id,
  question,
  responseCorrect,
  valor,
  responses
) => {
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "post",
        url: "perguntas",
        data: `video_id=${video_id}&question=${question}&responseCorrect=${responseCorrect}&valor=${valor}&responses=${responses}`
      })
        .then(response => {
          // return dispatch({
          //   type: "NEW_AULA",
          //   payload: response.data
          // });
        })
        .then(() => {})
        .catch(error => {
          alert(JSON.stringify(error));
        });
    });
  };
};

export const dellPergunta = id => {
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "delete",
        url: `perguntas/${id}`
      })
        .then(response => {})
        .then(() => {})
        .catch(error => {
          alert(error);
        });
    });
  };
};

export const EditPergunta = (
  video_id,
  question,
  responseCorrect,
  valor,
  responses,
  id
) => {
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "put",
        url: `perguntas/${id}`,
        data: `video_id=${video_id}&question=${question}&responseCorrect=${responseCorrect}&valor=${valor}&responses=${responses}`
      })
        .then(response => {})
        .then(() => {})
        .catch(error => {
          alert(error);
        });
    });
  };
};

export const AddTime = (video_id, time) => {
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "post",
        url: "addTime",
        data: `video_id=${video_id}&time=${time}`
      })
        .then(response => {})
        .then(() => {})
        .catch(error => {
          alert(error);
        });
    });
  };
};

export const startQuiz = () => {
  return dispatch => {
    return dispatch({ type: "START_QUIZ", payload: new Date().getTime() });
  };
};

export const endQuiz = () => {
  return dispatch => {
    return dispatch({ type: "END_QUIZ", payload: new Date().getTime() });
  };
};
