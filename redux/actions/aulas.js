import { config } from "../../config";
import { AsyncStorage, Alert } from "react-native";
import axios from "axios";

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
