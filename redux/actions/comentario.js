import { config } from "../../config";
import { AsyncStorage, Alert } from "react-native";
import axios from "axios";

export const send = (content, userId, videoId) => {
  // alert(TOKEN);
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      axios({
        method: "post",
        url: `${config.api}comentario`,
        headers: { Authorization: "bearer " + TOKEN },
        data: {
          video_id: videoId,
          user_id: userId,
          conteudo: content
        }
      })
        .then(response => {
          return dispatch({
            type: "SEND_COMMENT",
            payload: response.data.id
          });
        })
        .catch(error => {
          Alert.alert(error);
          return dispatch({
            type: "SEND_COMMENT",
            payload: false
          });
        });
    });
  };
};
