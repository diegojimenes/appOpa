import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { config } from "../../config";
import { Icon } from "native-base";

class Congratulations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    setTimeout(() => {
      this.props.navigation.navigate("aula");
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animatable.View
          animation="slideInDown"
          iterationCount={3}
          direction="alternate"
        >
          <View style={styles.medalha}>
            <View style={styles.lacoEsquerdo} />
            <View style={styles.lacoDireito} />
            <View style={styles.circuloExterno}>
              <View style={styles.circuloInterno}>
                <Animatable.View
                  animation="pulse"
                  iterationCount={10}
                  easing="ease-out"
                >
                  <Icon type="FontAwesome" name="check" style={styles.check} />
                </Animatable.View>
              </View>
            </View>
          </View>
        </Animatable.View>
        <Animatable.View
          animation="slideInUp"
          iterationCount={3}
          direction="alternate"
        >
          <Text style={styles.congratulations}>Parabéns</Text>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  medalha: {
    position: "absolute",
    left: 90
  },
  container: {
    backgroundColor: config.colors.secondary,
    width: "100%",
    height: "100%"
  },
  lacoEsquerdo: {
    width: 80.4,
    height: 400.83,
    position: "absolute",
    zIndex: 1,
    top: -20,
    backgroundColor: "#28E5D2",
    transform: [{ rotate: "-15deg" }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21
  },
  lacoDireito: {
    width: 80.4,
    height: 400.83,
    position: "absolute",
    zIndex: 0,
    top: -20,
    left: 90,
    backgroundColor: "#29BBAC",
    transform: [{ rotate: "15deg" }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21
  },
  circuloExterno: {
    width: 200,
    height: 200,
    borderRadius: 220,
    position: "absolute",
    zIndex: 2,
    top: 200,
    left: -20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21
  },
  circuloInterno: {
    width: 170,
    height: 170,
    borderRadius: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21
  },
  check: {
    color: config.colors.primary,
    fontSize: 100
  },
  congratulations: {
    position: "absolute",
    left: 85,
    top: 450,
    color: config.colors.white,
    fontSize: 40
  }
});

export default Congratulations;
