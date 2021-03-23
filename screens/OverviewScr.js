import React from 'react';
import { Dimensions, StyleSheet, SafeAreaView, ScrollView, Text, View, FlatList, Modal } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import PieChartCard from '../assets/components/PieChartCard';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default class OverviewScr extends React.Component {
  constructor(props) {
    super(props);
    this.categoryList = []
    this.state = {
      screenHeight: 0,
      categories: [],
      inputModalVisible: false,
      label: '',
      goal: '',
    }
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  }

  createJar = () => {
    const jar = {
      label: this.state.label,
      goal: this.state.goal,
    }
    this.categoryList.push(jar);
    this.setState({ categories: [...this.categoryList], inputModalVisible: false });
    this.setState({ label: '', goal: '' })
  }

  componentDidMount() {
    this.setState({ categories: [...this.categoryList] })
  }

  showModal = () => {
    this.setState({
      inputModalVisible: true,
    });
  }

  setLabel = (label) => {
    this.setState({
      label: label,
    })
  }

  setGoal = (goal) => {
    this.setState({
      goal: goal,
    })
  }

  render() {
    const { navigation } = this.props;
    const { categories, inputModalVisible, label, goal } = this.state;
    const scrollEnabled = this.state.screenHeight > height;
    const renderItem = ({ item }) => {
      return (
        <PieChartCard label={item.label} goal={item.goal} />
      );
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
          bounces={false}
        >
          <View style={styles.pichartview}>
            <View style={styles.row}>
              <Text style={styles.titleText}>Overview</Text>
              <Button
                mode="contained"
                uppercase={false}
                style={styles.createButton}
                onPress={() => this.showModal()}
              >
                <Text style={{ color: '#4B674C' }}>Log Payment</Text>
              </Button>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white' }}>
              <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={item => item.label}
              />
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
                  <Text style={styles.modalText}>Log Purchase</Text>
                  {/* TODO: change to dropdown menu from categories */}
                  <TextInput
                    label="Category"
                    value={label}
                    onChangeText={this.setLabel}
                    style={styles.inputBox}
                    theme={{ colors: { primary: '#5B5B5B' } }}
                  />
                  <TextInput
                    label="Amount"
                    value={goal}
                    onChangeText={this.setGoal}
                    style={styles.inputBox}
                    theme={{ colors: { primary: '#5B5B5B' } }}
                  />
                  <Button
                    mode="contained"
                    uppercase={false}
                    style={styles.modalButton}
                    onPress={() => this.createJar()}
                  >
                    <Text style={styles.modalButtonText}>Submit</Text>
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  pichartview: {
    flexGrow: 1,
    backgroundColor: '#D0E2D0'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#4B674C',
    paddingBottom: 10
  },
  img: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    marginTop: 35,
    fontSize: 30,
    marginLeft: 10,
    color: '#ffffff'
  },
  createButton: {
    height: 35,
    width: 125,
    backgroundColor: '#fafafa',
    fontSize: 20,
    marginTop: 20,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginRight: 10,
  },
  jar: {
    justifyContent: 'center',
    height: 250
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#7AA47A',
    borderRadius: 20,
    height: '60%',
    width: '80%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 10,
    margin: 5,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    color: '#5B5B5B',
    fontSize: 20,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 20,
    padding: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: "center"
  },
  inputBox: {
    height: 45,
    width: 250,
    backgroundColor: '#ffffff',
    marginBottom: 25,
  },
  modalButton: {
    height: 35,
    width: 200,
    backgroundColor: '#ffffff',
    margin: 15,
    fontSize: 20
  },
  modalButtonText: {
    color: '#5B5B5B',
    fontSize: 15,
    textAlign: "center"
  }
});
