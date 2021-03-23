import React, {useEffect, useState, useRef} from 'react';
import { SafeAreaView, Dimensions, ScrollView, StyleSheet, Text, View, Image, Modal} from 'react-native';
import { List, Button, Switch, Card, Title, Paragraph, IconButton, TextInput, ToggleButton } from 'react-native-paper';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const allData = [
  { name: 'Gas', alotted: 80, spent: 50, remaining: 30, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Groceries', alotted: 200, spent: 120, remaining: 80, population: 2800000, color: '#000', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Clothes', alotted: 80, spent: 10, remaining: 70, population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Venmo', alotted: 35, spent: 5, remaining: 30, population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Other', alotted: 85, spent: 22, remaining: 63, population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
]

export default class DashboardScr extends React.Component{

  constructor(props){
    super(props);
    this.userData = [];
    this.dataOverview = [
      {
        name: "Coffee",
        population: 6,
        color: "#46A84A",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Going Out",
        population: 30,
        color: "#74D795",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Gas",
        population: 15,
        color: "#24C545",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Eating Out",
        population: 10,
        color: "#819C71",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Remaining",
        population: 34,
        color: "#D0D0D0",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
    ];
    this.dataCategories = [
      {
        category: 'Coffee',
        remaining: 4,
        spent: 6,
        alloted: 10
      },
      {
        category: 'Going Out',
        remaining: 0,
        spent: 30,
        alloted: 30
      },
      {
        category: 'Gas',
        remaining: 20,
        spent: 15,
        alloted: 35
      },
      {
        category: 'Eating Out',
        remaining: 10,
        spent: 25,
        alloted: 40
      }
    ]
    this.state = {
        screenHeight: 0,
        currentIndex: 0,
        data: [],
        inputModalVisible: false,
        category: '',
        amount: '',
    }
    //preserve inital states
    this.baseState = this.state
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({screenHeight: contentHeight});
  }

  onCancel = () => {
    this.setState(this.baseState)
  }

  componentDidMount() {
    this.setState({data: [...this.userData]})
  }

  setValue(value) {
    this.setState({value: value});
  }

  showModal = () => {
    this.setState({
      inputModalVisible: true,
    });
  }

  setCategory = (category) => {
    this.setState({
      category: category,
    })
  }

  setAmount = (amount) => {
    this.setState({
      amount: amount,
    })
  }

  render(){
  const {inputModalVisible,category,amount} = this.state;
  const scrollEnabled = this.state.screenHeight > height;
 
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView 
      style={{flex:1}}
      contentContainerStyle={{flexGrow:1}}
      scrollEnabled={true}
      onContentSizeChange={this.onContentSizeChange}
      bounces={false}
    >
      <View style={styles.dashboardView}>
        <View style={styles.row}>
          <Text style={styles.titleText}>Spending Overview</Text>
          <IconButton
            icon="cash-plus"
            color={'#ffffff'}
            size={40}
            style={{marginTop: 10}}
            onPress={()=>this.showModal()}
          />
        </View>
        <View style={styles.weeklyOverview}>
          <Text style={{alignSelf:'center',fontSize:25,margin:10}}>Weekly Status</Text>
          <PieChart
            data={this.dataOverview}
            width={Dimensions.get('window').width - 20}
            height={220}
            chartConfig={{
              backgroundColor: '#F9F9F9',
              backgroundGradientFrom: '#F9F9F9',
              backgroundGradientTo: '#F9F9F9',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(70, 168, 74, ${opacity})`,
              style: {
                borderRadius: 10,
              },
            }}
            accessor={"population"}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              alignSelf:'center',
              backgroundColor: '#F9F9F9'
            }}
          />
        </View>
        <Text style={{alignSelf:'center',fontSize:25,margin:10}}>Categories</Text>
        <View style={{width, height:200, marginRight:10, marginLeft:10}}>
                  <ScrollView
                    pagingEnabled horizontal style={{width:355,height}} centerContent
                  >
                    {
                      this.dataCategories.map((image,index)=>(
                        <Card style={styles.card}>
                          <Card.Content style={styles.cardContent}>
                            <Text style={{alignSelf:'center',fontSize:25,marginTop:20}}>{image.category}</Text>
                            <View style={{flexDirection:'row'}}>
                            <ProgressChart
                              data={[image.spent/100]}
                              width={Dimensions.get('window').width/2}
                              height={125}
                              strokeWidth={16}
                              radius={30}
                              chartConfig={{
                                backgroundColor: '#F9F9F9',
                                backgroundGradientFrom: '#F9F9F9',
                                backgroundGradientTo: '#F9F9F9',
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(70, 168, 74, ${opacity})`,
                              }}
                              hideLegend={true}
                              accessor={"population"}
                              style={{
                                borderRadius: 16,
                                alignSelf:'center',
                              }}
                            />
                            <View style={{marginTop:20,marginLeft:-20}}>
                              <Text style={{fontSize:17,margin:5,fontWeight:'bold',alignSelf:'center'}}>
                                Remaining: ${image.remaining}
                              </Text>
                              <Text style={{fontSize:17,margin:5,alignSelf:'center'}}>
                                Total Spent: ${image.spent}
                              </Text>
                              <Text style={{fontSize:17,margin:5,alignSelf:'center'}}>
                                Budget Alloted: ${image.alloted}
                              </Text>
                            </View>
                            </View>
                          </Card.Content>
                        </Card>
                      ))
                    }
                  </ScrollView>
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
                    value={category}
                    onChangeText={this.setCategory}
                    style={styles.inputBox}
                    theme={{ colors: { primary: '#5B5B5B' } }}
                  />
                  <TextInput
                    label="Amount"
                    value={amount}
                    onChangeText={this.setAmount}
                    style={styles.inputBox}
                    theme={{ colors: { primary: '#5B5B5B' } }}
                  />
                  <Button
                    mode="contained"
                    uppercase={false}
                    style={styles.modalButton}
                    onPress={() => this.updatePurchases()}
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
  container: {
    flex: 1,
  },
  dashboardView:{
    flexGrow:1,
    backgroundColor:'#D0E2D0'
  },
  row:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#4B674C',
    paddingBottom: 10
  },
  weekyOverview:{
    padding: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleText:{
    marginTop: 35,
    fontSize: 30,
    marginLeft: 10,
    color: '#ffffff'
  },
  settingsButton:{
    height:35,
    width: 125,
    backgroundColor: '#D0E2D0',
    fontSize: 20,
    marginTop: 20,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginRight: 10,
  },
  streak:{
    padding: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  streakText:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  points:{
    marginLeft: 25,
    marginRight: 25,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F9F9F9'
  },
  pointText:{
    alignSelf: 'center',
    fontSize: 20,
  },
  pointNumber:{
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 10
  },
  userRewardsButton:{
    height:35,
    width: 200,
    backgroundColor: '#9FB48F',
    fontSize: 20,
    alignSelf: 'center',
    marginTop:20,
    marginBottom:20,
  },
  userRewards:{
    padding: 20,
    justifyContent: 'center',
  },
  userRewardsText:{
    marginLeft:16,
    fontSize: 17,
  },
  card:{
    height: 200,
    width: 355,
    backgroundColor: '#F9F9F9'
  },
  cardContent:{
    justifyContent: 'center',
  },
  cardImageView:{
    alignSelf: 'flex-end',
  },
  cardButton:{
    height:35,
    width: 125,
    backgroundColor: '#9FB48F',
    fontSize: 20,
    marginLeft:20,
    marginBottom:20,
  },
  swiperTitle:{
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
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
    width: '90%',
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
  modalText: {
    padding: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: "center"
  },
  modalButton:{
    height:35,
    width: 200,
    backgroundColor: '#ffffff',
    margin: 30,
    fontSize: 20
  },
  modalButtonText: {
      color: '#5B5B5B',
      fontSize: 15,
      textAlign: "center"
  },
  cardModal:{
    height: 600,
    width: 300,
    backgroundColor: '#F9F9F9'
  },
  cardButtonModal:{
    height:35,
    width: 75,
    backgroundColor: '#9FB48F',
    fontSize: 20,
    marginLeft:20,
    marginBottom:20,
  },
  inputBox:{
    height: 50,
    width: 250,
    backgroundColor: '#ffffff',
    marginBottom: 25,
    alignSelf: 'center',
    fontSize: 20,
  },
  category:{
    backgroundColor: '#F9F9F9',
    width: 300,
    justifyContent: 'center',
    flexDirection: 'row',
  }
});
