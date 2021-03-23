import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
} from 'react-native';
import {
  List,
  Button,
  Switch,
  Card,
  Title,
  Paragraph,
  IconButton,
  TextInput,
} from 'react-native-paper';
import QRCode from '../assets/images/QR.png';
import {
  getNotificationSettings,
  editNotificationSettings,
  getBudgetStats,
  addClaimedReward,
  editBudgetStatistics,
  getClaimedRewards,
  changeEmail,
  editPassword,
  editEmail
} from '../util/firestoreMethods';
import { firestore, auth } from '../config/firebase';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const allRewards = [
  {
    name: 'Halo Donuts',
    description: 'Free donut',
    url:
      'https://static1.squarespace.com/static/5d890dc76001c32118d9c7f7/t/5e0143ae9bb1cd38ee77d5b1/1613515544775/?format=1500w',
    points: 120,
  },
  {
    name: 'Sweetberries',
    description: 'Free medium create your own icecream',
    url:
      'https://sweetberries.com/wp-content/uploads/2010/08/logo_oval2_big.png',
    points: 180,
  },
  {
    name: 'Social Restaurant',
    description: '$5 off your meal',
    url: 'http://thesocialgnv.com/wp-content/uploads/2016/10/logo.png',
    points: 140,
  },
  {
    name: 'Salty Dog',
    description: 'Free pint of our Dog Water beer',
    url:
      'https://lh3.googleusercontent.com/fNlfR27CeNWPi8gHTZduTj4dU-z-HjEyEZISe2vvoAwHe1BRpKekcxSh2MDbj5pH97QRarWlFKxndgRXCaqoXfS_kwVasFAapjMfOuZy=s340',
    points: 200,
  },
  {
    name: 'Opus Coffee',
    description: 'One free medium iced coffee',
    url:
      'https://static1.squarespace.com/static/55f862a7e4b09ee1e2fc39c4/t/57fb8461c534a5767ea97af7/1614283302053/',
    points: 100,
  },
];

export default class DashboardScr extends React.Component {
  constructor(props) {
    super(props);
    this.userRewards = [];
    this.state = {
      screenHeight: 0,
      currentIndex: 0,
      dailySwitch: false,
      weeklySwitch: false,
      monthlySwitch: false,
      userRewardsModalVisible: false,
      settingsModalVisible: false,
      QRModalVisible: false,
      rewards: [],
      points: 0,
      streak: 0,
      username: auth.currentUser.email,
      password: 'dummyPwd',
      initialLoad: true,
      changePassword: false,
      changeUsername: false,
    };
    //preserve inital states
    //this.baseState = this.state;
    this.baseState = null;
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  toggleDaily = () => {
    this.setState({
      dailySwitch: !this.state.dailySwitch,
    });
  };

  toggleWeekly = () => {
    this.setState({
      weeklySwitch: !this.state.weeklySwitch,
    });
  };

  toggleMonthly = () => {
    this.setState({
      monthlySwitch: !this.state.monthlySwitch,
    });
  };

  showuserRewardsModal = () => {
    this.setState({
      userRewardsModalVisible: true,
    });
  };

  showQRModal = () => {
    this.setState({
      QRModalVisible: true,
    });
  };

  showSettingsModal = () => {
    this.setState({
      settingsModalVisible: true,
    });
  };

  setUsername = (username) => {
    this.setState({
      username: username,
    });
  };

  setPassword = (password) => {
    this.setState({
      password: password,
    });
  };

  claimReward = (image) => {
    const reward = {
      name: image.name,
      description: image.description,
      url: image.url,
    };
    this.userRewards.push(reward);
    this.setState({
      rewards: [...this.userRewards],
      points: this.state.points - image.points,
      userRewardsModalVisible: false,
    });

    // add this claimed reward to firestore
    addClaimedReward({
      name: image.name,
      description: image.description,
      url: image.url,
      points: image.points,
    });

    // update the user's points in firestore
    editBudgetStatistics({
      type: 'points',
      currentPoints: this.state.points - image.points,
    });
  };

  onCancel = () => {
    this.setState(this.baseState);

    // reload budget stats and claimed rewards stats
    this.loadBudgetStats();
    this.loadClaimedRewards();

    this.setState({ settingsModalVisible: false });
  };

  onSubmitSettings = () => {
    // update notification settings in firestore
    editNotificationSettings({
      dailyFrequency: this.state.dailySwitch,
      weeklyFrequency: this.state.weeklySwitch,
      monthlyFrequency: this.state.monthlySwitch,
    });

    if (this.state.password !== 'dummyPwd') {
      editPassword(this.state.password);
    }
    //editEmail(this.state.username)
    

    this.baseState = this.state;
    this.setState({ settingsModalVisible: false });
  };

  loadNotifs() {
    getNotificationSettings().then((notifFrequency) => {
      if (notifFrequency.dailyFrequency) {
        this.setState({ dailySwitch: true });
      }
      if (notifFrequency.weeklyFrequency) {
        this.setState({ weeklySwitch: true });
      }
      if (notifFrequency.monthlyFrequency) {
        this.setState({ monthlySwitch: true });
      }

      this.baseState = this.state;
    });
  }

  loadBudgetStats() {
    getBudgetStats().then((stats) => {
      this.setState({ points: stats.points });
      this.setState({ streak: stats.streak });

      this.baseState = this.state;
    });
  }

  loadClaimedRewards() {
    getClaimedRewards().then((claimedRewardsArray) => {
      this.userRewards = claimedRewardsArray;
      this.setState({ rewards: [...this.userRewards] });
      this.baseState = this.state;
    });
  }

  componentDidMount() {
    // get user's default notifications settings (if any) from firestore
    this.loadNotifs();

    // get user's budget statistics (points and streaks) from firestore
    this.loadBudgetStats();

    // get user's claimed rewards from firestore
    this.loadClaimedRewards();
  }

  render() {
    const {
      dailySwitch,
      weeklySwitch,
      monthlySwitch,
      userRewardsModalVisible,
      settingsModalVisible,
      QRModalVisible,
      rewards,
      points,
      streak,
      username,
      password,
    } = this.state;
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
          bounces={false}
        >
          <View style={styles.dashboardView}>
            <View style={styles.row}>
              <Text style={styles.titleText}>User Dashboard</Text>
              <IconButton
                icon="cog"
                color={'#ffffff'}
                size={35}
                style={{ marginTop: 15 }}
                onPress={() => this.showSettingsModal()}
              />
            </View>
            <View style={styles.streak}>
              <Text style={styles.streakText}>
                Budget Goal Streak: {streak} weeks!
              </Text>
            </View>
            <View style={styles.points}>
              <Text style={styles.pointText}>Your Points:</Text>
              <Text style={styles.pointNumber}>{points}</Text>
            </View>
            <View>
              <Button
                mode="contained"
                uppercase={false}
                style={styles.userRewardsButton}
                onPress={() => this.showuserRewardsModal()}
              >
                <Text>Claim Rewards</Text>
              </Button>
            </View>
            <View
              style={{ width, height: 200, marginRight: 10, marginLeft: 10 }}
            >
              <Text style={styles.swiperTitle}>Your Rewards</Text>
              {rewards.length > 0 ? (
                <ScrollView
                  pagingEnabled
                  horizontal
                  style={{ width: 355, height }}
                  centerContent
                >
                  {rewards.map((image, index) => (
                    <Card style={styles.card}>
                      <Card.Content style={styles.cardContent}>
                        <View style={{ width: '50%' }}>
                          <Title style={{ fontSize: 25 }}>{image.name}</Title>
                          <Paragraph style={{ fontSize: 17 }}>
                            {image.description}
                          </Paragraph>
                        </View>
                        <View style={styles.cardImageView}>
                          <Button
                            mode="contained"
                            uppercase={false}
                            style={styles.cardButton}
                            onPress={() => this.showQRModal()}
                          >
                            <Text>Use Reward</Text>
                          </Button>
                          <Image
                            style={{
                              alignSelf: 'center',
                              height: 50,
                              width: 50,
                              borderWidth: 1,
                              borderRadius: 75,
                            }}
                            source={{ uri: image.url }}
                            resizeMode="stretch"
                          />
                        </View>
                      </Card.Content>
                    </Card>
                  ))}
                </ScrollView>
              ) : (
                <View style={{ margin: 20 }}>
                  <Text style={{ alignSelf: 'center', fontSize: 20 }}>
                    You haven't claimed any rewards yet
                  </Text>
                  <Text
                    style={{ alignSelf: 'center', fontSize: 20, marginTop: 10 }}
                  >
                    Hit budget goals, earn points, get rewards!
                  </Text>
                </View>
              )}
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={userRewardsModalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                this.setState({ userRewardsModalVisible: false });
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    You have {points} points!
                  </Text>
                  <View style={{ width, height: 200, marginLeft: 75 }}>
                    <ScrollView
                      pagingEnabled
                      horizontal
                      style={{ width: 300, height }}
                      centerContent
                    >
                      {allRewards.map((image, index) => (
                        <Card style={styles.cardModal}>
                          <Card.Content style={styles.cardContent}>
                            <View style={{ width: '60%' }}>
                              <Title style={{ fontSize: 25 }}>
                                {image.name}
                              </Title>
                              <Paragraph style={{ fontSize: 17 }}>
                                {image.description}
                              </Paragraph>
                            </View>
                            <View style={styles.cardImageView}>
                              {points >= image.points ? (
                                <Button
                                  mode="contained"
                                  uppercase={false}
                                  style={styles.cardButtonModal}
                                  onPress={() => this.claimReward(image)}
                                >
                                  <Text>Claim</Text>
                                </Button>
                              ) : (
                                <Button
                                  mode="contained"
                                  uppercase={false}
                                  style={[
                                    styles.cardButtonModal,
                                    { backgroundColor: '#F9F9F9' },
                                  ]}
                                ></Button>
                              )}
                              <Image
                                style={{
                                  alignSelf: 'center',
                                  height: 50,
                                  width: 50,
                                  borderWidth: 1,
                                  borderRadius: 75,
                                }}
                                source={{ uri: image.url }}
                                resizeMode="stretch"
                              />
                            </View>
                          </Card.Content>
                          <Paragraph
                            style={{
                              fontSize: 20,
                              marginTop: 10,
                              marginLeft: 20,
                            }}
                          >
                            Points Needed:
                          </Paragraph>
                          <Paragraph
                            style={{
                              fontSize: 20,
                              marginTop: 10,
                              marginLeft: 20,
                              fontWeight: 'bold',
                            }}
                          >
                            {image.points}
                          </Paragraph>
                        </Card>
                      ))}
                    </ScrollView>
                  </View>
                  <Button
                    mode="contained"
                    uppercase={false}
                    style={styles.modalButton}
                    onPress={() =>
                      this.setState({ userRewardsModalVisible: false })
                    }
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </Button>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={settingsModalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                this.setState({ settingsModalVisible: false });
              }}
            >
              <View style={styles.centeredView}>
                <View style={[styles.modalView, { height: '80%' }]}>
                  <Text style={styles.modalText}>Manage Settings</Text>
                  <View
                    style={{
                      paddingTop: 10,
                      width: '95%',
                      backgroundColor: 'white',
                    }}
                  >
                    <Paragraph
                      style={{
                        color: '#4B674C',
                        fontSize: 20,
                        marginLeft: 15,
                        fontWeight: 'bold',
                      }}
                    >
                      Account Info
                    </Paragraph>
                    <TextInput
                      label="Username"
                      value={username}
                      onChangeText={this.setUsername}
                      style={styles.inputBox}
                      theme={{ colors: { primary: '#5B5B5B' } }}
                    />
                    <TextInput
                      label="Password"
                      value={password}
                      onChangeText={this.setPassword}
                      style={styles.inputBox}
                      autoCorrect={false}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      theme={{ colors: { primary: '#5B5B5B' } }}
                    />
                    <Paragraph
                      style={{
                        color: '#4B674C',
                        fontSize: 20,
                        marginLeft: 15,
                        fontWeight: 'bold',
                      }}
                    >
                      Notifications
                    </Paragraph>
                    <List.Section>
                      <List.Item
                        title="Daily"
                        titleStyle={{ fontSize: 17 }}
                        style={{ backgroundColor: '#ffffff' }}
                        right={(props) => (
                          <Switch
                            value={dailySwitch}
                            onValueChange={this.toggleDaily}
                            color={'#4B674C'}
                          />
                        )}
                      />
                      <List.Item
                        title="Weekly"
                        titleStyle={{ fontSize: 17 }}
                        style={{ backgroundColor: '#ffffff' }}
                        right={(props) => (
                          <Switch
                            value={weeklySwitch}
                            onValueChange={this.toggleWeekly}
                            color={'#4B674C'}
                          />
                        )}
                      />
                      <List.Item
                        title="Monthly"
                        titleStyle={{ fontSize: 17 }}
                        style={{ backgroundColor: '#ffffff' }}
                        right={(props) => (
                          <Switch
                            value={monthlySwitch}
                            onValueChange={this.toggleMonthly}
                            color={'#4B674C'}
                          />
                        )}
                      />
                    </List.Section>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Button
                      mode="contained"
                      uppercase={false}
                      style={[
                        styles.modalButton,
                        { width: '40%', marginLeft: 50, marginRight: 20 },
                      ]}
                      onPress={() =>
                        this.setState(() => this.onSubmitSettings())
                      }
                    >
                      <Text style={styles.modalButtonText}>Submit</Text>
                    </Button>
                    <Button
                      mode="contained"
                      uppercase={false}
                      style={[
                        styles.modalButton,
                        { width: '40%', marginRight: 50, marginLeft: 20 },
                      ]}
                      onPress={() => this.onCancel()}
                    >
                      <Text style={styles.modalButtonText}>Cancel</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={QRModalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                this.setState({ QRModalVisible: false });
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Scan QR Code</Text>
                  <Image source={QRCode} style={{ width: 200, height: 200 }} />
                  <Text
                    style={[
                      styles.modalText,
                      { fontSize: 20, fontWeight: 'normal' },
                    ]}
                  >
                    Or Use Pin: AX7D32Q
                  </Text>
                  <Button
                    mode="contained"
                    uppercase={false}
                    style={[styles.modalButton, { margin: 10 }]}
                    onPress={() => this.setState({ QRModalVisible: false })}
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
  dashboardView: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: '#D0E2D0',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#4B674C',
    paddingBottom: 10,
  },
  titleText: {
    marginTop: 35,
    fontSize: 30,
    marginLeft: 10,
    color: '#ffffff',
  },
  settingsButton: {
    height: 35,
    width: 125,
    backgroundColor: '#D0E2D0',
    fontSize: 20,
    marginTop: 20,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginRight: 10,
  },
  streak: {
    padding: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  streakText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  points: {
    marginLeft: 25,
    marginRight: 25,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  pointText: {
    alignSelf: 'center',
    fontSize: 20,
  },
  pointNumber: {
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 10,
  },
  userRewardsButton: {
    height: 35,
    width: 200,
    backgroundColor: '#9FB48F',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  userRewards: {
    padding: 20,
    justifyContent: 'center',
  },
  userRewardsText: {
    marginLeft: 16,
    fontSize: 17,
  },
  card: {
    height: 150,
    width: 355,
    backgroundColor: '#F9F9F9',
  },
  cardContent: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cardImageView: {
    alignSelf: 'flex-end',
  },
  cardButton: {
    height: 35,
    width: 125,
    backgroundColor: '#9FB48F',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  swiperTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#7AA47A',
    borderRadius: 20,
    height: '60%',
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    padding: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  modalButton: {
    height: 35,
    width: 200,
    backgroundColor: '#ffffff',
    margin: 30,
    fontSize: 20,
  },
  modalButtonText: {
    color: '#5B5B5B',
    fontSize: 15,
    textAlign: 'center',
  },
  cardModal: {
    height: 600,
    width: 300,
    backgroundColor: '#F9F9F9',
  },
  cardButtonModal: {
    height: 35,
    width: 75,
    backgroundColor: '#9FB48F',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  inputBox: {
    height: 50,
    width: 250,
    backgroundColor: '#ffffff',
    marginBottom: 25,
    alignSelf: 'center',
    fontSize: 20,
  },
});
