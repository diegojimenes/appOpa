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

/**
 * @description Função de login executa uma requisição POST em uma api externa passando email e password de um usuraio retornando um token JWT e o salvando no local storage.
 * @async
 * @param {string} email - Email do usuario.
 * @param {string} password - Senha do usuario.
 * @category auth
 * @example this.props.login(this.state.email,this.state.password)
 *.then(() => redirect('home'))
 *.catch(() => this.setState({error: 'não foi possiver fazer login'})) **/

export const auth = (email, password, navigation) => {
  return dispatch => {
    api({
      method: "post",
      url: "authenticate",
      data: `email=${email}&password=${password}`
    })
      .then(response => {
        AsyncStorage.setItem("userToken", response.data.token);

        dispatch({
          type: "ERROR",
          payload: true
        });
      })
      .then(() => navigation.navigate("main"))
      .catch(error => {
        alert(error);
        dispatch({
          type: "ERROR",
          payload: false
        });
      });
  };
};

export const register = (
  username,
  email,
  img,
  password,
  isAdmin,
  polo,
  nucleo,
  cpf,
  fone
) => {
  return dispatch => {
    api({
      method: "post",
      url: "register",
      data: `username=${username}&email=${email}&img=${img}&password=${password}&isAdmin=${isAdmin}&polo=${polo}&nucleo=${nucleo}&cpf=${cpf}&fone=${fone}`
    })
      .then(response => {
        dispatch({
          type: "NEW_USER",
          payload: response.data
        });
      })
      .then(() => {})
      .catch(error => {
        alert(error);
        dispatch({
          type: "ERROR",
          payload: false
        });
      });
  };
};

export const update = (username, img, isAdmin, polo, nucleo, cpf, fone, id) => {
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "put",
        url: `editUser/${id}`,
        data: `username=${username}&&img=${img}&isAdmin=${isAdmin}&polo=${polo}&nucleo=${nucleo}&cpf=${cpf}&fone=${fone}`
      })
        .then(response => {})
        .then(() => {})
        .catch(error => {
          alert(error);
        });
    });
  };
};

export const get_Users = () => {
  // alert(TOKEN);
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      var params = {
        headers: { Authorization: "bearer " + TOKEN }
      };
      axios
        .get(`${config.api}listUsers`, params)
        .then(response => {
          // var json = JSON.stringify(response.data);
          // var par = JSON.parse(json);
          // alert(par.username);
          return dispatch({
            type: "GET_USERS",
            payload: response.data
          });
        })
        .catch(error => {
          dispatch({
            type: "ERROR",
            payload: error
          });
        });
    });
  };
};

export const dellUser = id => {
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      api.defaults.headers.common["Authorization"] = "bearer " + TOKEN;
      api({
        method: "delete",
        url: `deleteUser/${id}`
      })
        .then(response => {})
        .then(() => {})
        .catch(error => {
          alert(error);
        });
    });
  };
};

/**
 * @description Função de currentUser verifica se existe um token JWT no local storage, caso exista ela faz uma requisição GET em uma api externa e retorna os dados do usurio logado.
 * @async
 * @category auth
 */

export const currentUser = () => {
  // alert(TOKEN);
  return dispatch => {
    AsyncStorage.getItem("userToken", (err, TOKEN) => {
      var params = {
        headers: { Authorization: "bearer " + TOKEN }
      };
      axios
        .get(`${config.api}verificateUser`, params)
        .then(response => {
          var json = JSON.stringify(response.data);
          var par = JSON.parse(json);
          // alert(par.username);
          return dispatch({
            type: "USER",
            payload: par
          });
        })
        .catch(error => {
          dispatch({
            type: "ERROR",
            payload: error
          });
        });
    });
  };
};

/**
 * @description Função de logout apaga o token JWT do local storage
 * @async
 * @category auth
 */
export const logout = navigation => {
  return dispatch => {
    AsyncStorage.removeItem("userToken").then(() =>
      navigation.navigate("login")
    );
  };
};
