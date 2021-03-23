import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { addSavingsToJar } from "../../util/firestoreMethods";

export default class MoneyJar extends Component {
  constructor(props) {
    super(props);
    const { label, goal, savings } = this.props;
    this.state = {
      total: savings,
      inputModalVisible: false,
      input: 0,
    };
  }
  showModal = () => {
    this.setState({
      inputModalVisible: true,
    });
  };
  setInput = (text) => {
    this.setState({
      input: Number(text).toFixed(2),
    });
  };
  updateTotal = () => {
    this.setState({
      total: (Number(this.state.total) + Number(this.state.input)).toFixed(2),
      inputModalVisible: false,
    });
    let finalTotal = (
      Number(this.state.total) + Number(this.state.input)
    ).toFixed(2);
    // update total of this jar in firestore
    addSavingsToJar({ name: this.props.label, savingsTotal: finalTotal });
  };
  render() {
    const { label, goal, savings } = this.props;
    const { total, inputModalVisible, text } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.jar} onPress={this.showModal}>
            <ImageBackground
              source={require("../images/MoneyJar.png")}
              style={styles.img}
            >
              <View style={styles.labelView}>
                <Text style={styles.labelText}>{label}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View style={styles.totalContainer}>
            <Text style={styles.text}>Goal: ${goal}</Text>
            <Text style={styles.text}>Savings: ${total}</Text>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={inputModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setState({ inputModalVisible: false });
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add savings to jar!</Text>
              <TextInput
                label="Amount"
                value={text}
                onChangeText={this.setInput}
                style={styles.inputBox}
                theme={{ colors: { primary: "#5B5B5B" } }}
              />
              <Button
                mode="contained"
                uppercase={false}
                style={styles.modalButton}
                onPress={() => this.updateTotal()}
              >
                <Text style={styles.modalButtonText}>Add to Jar</Text>
              </Button>
              <Button
                mode="contained"
                uppercase={false}
                style={styles.modalButton}
                onPress={() => this.setState({ inputModalVisible: false })}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  jar: {
    backgroundColor: "white",
    margin: 0,
  },
  totalContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 50,
    flex: 1,
  },
  img: {
    height: 200,
    width: 200,
  },
  labelView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    backgroundColor: "white",
    padding: 5,
    fontSize: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  text: {
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#7AA47A",
    borderRadius: 20,
    height: "50%",
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 10,
    margin: 5,
    backgroundColor: "#ffffff",
  },
  buttonText: {
    color: "#5B5B5B",
    fontSize: 20,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 20,
    padding: 15,
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  inputBox: {
    height: 50,
    width: 250,
    backgroundColor: "#ffffff",
    marginBottom: 35,
  },
  modalButton: {
    height: 35,
    width: 200,
    backgroundColor: "#ffffff",
    margin: 15,
    fontSize: 20,
  },
  modalButtonText: {
    color: "#5B5B5B",
    fontSize: 15,
    textAlign: "center",
  },
});
