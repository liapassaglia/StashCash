import firebase from 'firebase/app';
import { Alert } from 'react-native';
import { firestore, auth } from '../config/firebase';
// const db = firebase.firestore();

export function addNewUser(uid) {
  try {
    //const db = firebase.firestore();
    const db = firestore;
    // Create new doc that will store all of the user's data
    db.collection('users').doc(uid).set({ weeklyBudget: 0 });

    // Create budget-statistics collection and initialize fields to 0
    let budgetStatsCollectionRef = db
      .collection('users')
      .doc(uid)
      .collection('budget-statistics');
    budgetStatsCollectionRef.doc('points').set({ currentPoints: 0 });
    budgetStatsCollectionRef.doc('streaks').set({ weekStreak: 0 });

    // Create notification-settings collection and set default settings
    let notificationSettingsRef = db
      .collection('users')
      .doc(uid)
      .collection('notification-settings');
    notificationSettingsRef
      .doc('notification-frequency')
      .set({ frequency: 'daily' });
  } catch (err) {
    console.log(
      'Inside firestoreMethods.js, printing error!',
      err,
      err.message
    );
    Alert.alert('Error in user registration!', err.message);
  }
}

export async function getBudgetStats() {
  try {
    const db = firestore;
    const uid = auth.currentUser.uid;

    let budgetStatsResponse = {};
    // Create budget-statistics collection ref
    let budgetStatsCollectionRef = db
      .collection('users')
      .doc(uid)
      .collection('budget-statistics');

    await budgetStatsCollectionRef
      .doc('points')
      .get()
      .then((doc) => {
        budgetStatsResponse.points = doc.data().currentPoints;
      });
    await budgetStatsCollectionRef
      .doc('streaks')
      .get()
      .then((doc) => {
        budgetStatsResponse.streak = doc.data().weekStreak;
      });
    return budgetStatsResponse;
  } catch (err) {
    console.log(
      'Inside firestoreMethods.js, printing error!',
      err,
      err.message
    );
    Alert.alert('Error in getting budget stats!', err.message);
  }
}

export function editBudgetStatistics(newStats) {
  try {
    const db = firestore;
    const uid = auth.currentUser.uid;

    let budgetStatsCollectionRef = db
      .collection('users')
      .doc(uid)
      .collection('budget-statistics');
    console.log(
      'inside editBudgetStatistics(), printing newStats params:',
      newStats
    );
    if (newStats.type == 'points') {
      budgetStatsCollectionRef
        .doc('points')
        .set({ currentPoints: newStats.currentPoints });
    } else {
      budgetStatsCollectionRef
        .doc('streaks')
        .set({ weekStreak: newStats.weekStreak });
    }
  } catch (err) {
    console.log(
      'Inside firestoreMethods.js, printing error!',
      err,
      err.message
    );
    Alert.alert('Error occured when adding editing budget stats!', err.message);
  }
}

export function addClaimedReward(rewardInfo) {
  try {
    const db = firestore;
    const uid = auth.currentUser.uid;

    // Create claimed-rewards collection
    let claimedRewardsCollectionRef = db
      .collection('users')
      .doc(uid)
      .collection('claimed-rewards');

    claimedRewardsCollectionRef.doc(rewardInfo.name).set({
      name: rewardInfo.name,
      points: rewardInfo.points,
      description: rewardInfo.description,
      url: rewardInfo.url,
    });

    // TODO: decrement currentPoints from budgetStatsCollection
  } catch (err) {
    console.log(
      'Inside firestoreMethods.js, printing error!',
      err,
      err.message
    );
    Alert.alert('Error occured when adding claimed reward!', err.message);
  }
}

export async function getClaimedRewards() {
  try {
    const db = firestore;
    const uid = auth.currentUser.uid;

    let claimedRewardsArray = [];
    let claimedRewardsCollectionRef = db
      .collection('users')
      .doc(uid)
      .collection('claimed-rewards');

    await claimedRewardsCollectionRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        claimedRewardsArray.push(doc.data());
      });
    });

    return claimedRewardsArray;
  } catch (err) {
    console.log(
      'Inside firestoreMethods.js, printing error!',
      err,
      err.message
    );
    Alert.alert('Error occured when getting claimed rewards!', err.message);
  }
}
export function addNewJar(newJarInfo) {
  try {
    const db = firestore;
    const uid = auth.currentUser.uid;

    // Create jar collection ref
    let jarCollectionRef = db.collection('users').doc(uid).collection('jars');

    jarCollectionRef.doc(newJarInfo.name).set({
      name: newJarInfo.name,
      goal: parseFloat(newJarInfo.goal),
      savings: 0,
    });
  } catch (err) {
    console.log(
      'Inside firestoreMethods.js, printing error!',
      err,
      err.message
    );
    Alert.alert('Error occured when adding new jar!', err.message);
  }
}

export async function getJars() {
  try {
    const db = firestore;
    const uid = auth.currentUser.uid;

    let userJars = [];
    let jarCollectionRef = db.collection('users').doc(uid).collection('jars');
    await jarCollectionRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        userJars.push(doc.data());
      });
    });
    return userJars;
  } catch (err) {
    console.log('inside firestoreMethods, getting jars info error');
    Alert.alert('Error occured when getting your jars!', err.message);
  }
}

export function addSavingsToJar(editJarInfo) {
  try {
    const db = firestore;
    const uid = auth.currentUser.uid;
    // Create jar collection ref
    let jarCollectionRef = db.collection('users').doc(uid).collection('jars');

    jarCollectionRef
      .doc(editJarInfo.name)
      .update({ savings: parseFloat(editJarInfo.savingsTotal) });
  } catch (err) {
    console.log(
      'Inside firestoreMethods.js, printing error!',
      err,
      err.message
    );
    Alert.alert('Error occured when adding savings to a jar!', err.message);
  }
}

export function addRecurringMonthlyPayments(uid, newRecPayment) {
  try {
    // Create monthly-recurring-payments collection ref
    let monthlyRecurringPaymentsCollection = db
      .collection('users')
      .doc(uid)
      .collection('monthly-recurring-payments');

    monthlyRecurringPaymentsCollection.doc(newRecPayment.name).set({
      amount: newRecPayment.amount,
      name: newRecPayment.name,
      nextPayment: newRecPayment.nextPayment,
    });
  } catch (err) {
    console.log(
      'Inside firestoreMethods.js, printing error!',
      err,
      err.message
    );
    Alert.alert(
      'Error occured when adding adding recurring monthly payment!',
      err.message
    );
  }
}

export async function getNotificationSettings() {
  try {
    const db = firestore;
    const uid = auth.currentUser.uid;

    let frequency = {};
    let notificationSettingsRef = db
      .collection('users')
      .doc(uid)
      .collection('notification-settings')
      .doc('notification-frequency');

    await notificationSettingsRef.get().then((doc) => {
      console.log('inside getNotifications, printing doc.data()', doc.data());
      frequency = doc.data();
    });
    return frequency;
  } catch (err) {
    console.log('inside firestoreMethods, getting notif setting error');
    Alert.alert('Error occured when getting your notif settings!', err.message);
  }
}

export function editNotificationSettings(newNotifSettings) {
  try {
    const db = firestore;
    const uid = auth.currentUser.uid;

    let notificationSettingsRef = db
      .collection('users')
      .doc(uid)
      .collection('notification-settings');

    notificationSettingsRef.doc('notification-frequency').set(newNotifSettings);
  } catch (err) {
    console.log(
      'Inside firestoreMethods.js, printing error!',
      err,
      err.message
    );
    Alert.alert(
      'Error occured when adding editing notification settings!',
      err.message
    );
  }
}

export function addSpendingCategory(uid, newSpendingCatInfo) {
  try {
    // Create spending-categories collection
    let spendingCategoryCollectionRef = db
      .collection('users')
      .doc(uid)
      .collection('spending-category');

    spendingCategoryCollectionRef.doc(newSpendingCatInfo.name).set({
      maxBudget: newSpendingCatInfo.maxBudget,
      moneySpent: newSpendingCatInfo.moneySpent,
      name: newSpendingCatInfo.name,
    });
  } catch (err) {
    console.log(
      'Inside firestoreMethods.js, printing error!',
      err,
      err.message
    );
    Alert.alert(
      'Error occured when adding new spending category!',
      err.message
    );
  }
}

export function editPassword(newPassword) {
  let user = firebase.auth().currentUser;

  user
    .updatePassword(newPassword)
    .then(function () {
      Alert.alert('Password successfully updated');
      console.log('Password successfully updated');
    })
    .catch(function (error) {
      Alert.alert('Error editing email');
      console.log(error.message);
    });

  console.log('Updated User: ', firebase.auth().currentUser);
}

export function editEmail(newEmail) {
  let user = firebase.auth().currentUser;
  console.log('newEmail: ', newEmail);

  user
    .updateEmail(newEmail)
    .then(() => {
      console.log('Email successfully updated');
    })
    .catch((error) => {
      Alert.alert('Error editing password');
      console.log(error.message);
    });
}