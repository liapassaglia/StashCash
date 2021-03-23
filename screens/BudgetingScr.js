import React from 'react';
import { SafeAreaView, Dimensions, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { Button, DataTable, TextInput } from 'react-native-paper';

const { height } = Dimensions.get('window');

export default class BudgetingScr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: 0,
      budgetInputValue: '',
      budgetValue: 0,
      categories: [],
      curCatNameInput: '',
      curCatAmntInput: '',
      totalExpense: 0
    }

    this.handleBudgetInput = this.handleBudgetInput.bind(this);
    this.handleCategoryNameInput = this.handleCategoryNameInput.bind(this);
    this.handleCategoryAmountInput = this.handleCategoryAmountInput.bind(this);
    this.saveBudgetValue = this.saveBudgetValue.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.removeCategory = this.removeCategory.bind(this);

    this.baseState = this.state
  }

  handleBudgetInput = (val) => {
    this.setState({
      budgetInputValue: val
    })
  }

  handleCategoryNameInput = (value) => {
    this.setState({
      curCatNameInput: value
    })
  }

  handleCategoryAmountInput = (value2) => {
    this.setState({
      curCatAmntInput: value2
    })
  }

  saveBudgetValue = () => {

    this.setState({
      budgetValue: this.state.budgetInputValue ? this.state.budgetInputValue : 0,
      budgetInputValue: ''
    })

    //Add backend stuff here, the budgetValue state is the true budgetValue where budgetInputValue is for front-end functionality
  }

  addCategory = () => {
    let catName = this.state.curCatNameInput;
    let catAmnt = this.state.curCatAmntInput ? this.state.curCatAmntInput : 0;
    let totalExpense = this.state.totalExpense;

    totalExpense += parseInt(catAmnt);
    if (totalExpense > this.state.budgetValue) {
      Alert.alert(
        "Spending Categories Exceeded Budget",
        "Please consider increasing your inputted budget amount.",
        [
          {
            text: "OK",
            style: "cancel"
          }
        ],
        {
          canceable: true,
        }
      )
      this.setState({
        curCatNameInput: '',
        curCatAmntInput: ''
      })
      return
    }

    if (catName == '' || catAmnt == '') {
      Alert.alert(
        "Invalid Spending Category",
        "Please enter a valid category name or amount.",
        [
          {
            text: "OK",
            style: "cancel"
          }
        ],
        {
          canceable: true,
        }
      );

      return
    }

    //Add backend stuff for categories here, the object below saves cate information or you can use either variable declares above.
    let category = {
      name: catName,
      amount: catAmnt
    }

    let categories = this.state.categories.concat(category);

    this.setState({
      categories: categories,
      curCatNameInput: '',
      curCatAmntInput: '',
      totalExpense: totalExpense
    })
  }

  removeCategory = i => e => {
    let categories = this.state.categories;
    let category = categories[i]

    let totalExpense = this.state.totalExpense;
    totalExpense -= category.amount;

    categories.splice(i, 1)

    this.setState({
      categories: categories,
      totalExpense: totalExpense
    })
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  }

  render() {
    const { budgetValue, budgetInputValue, categories, curCatNameInput, curCatAmntInput, totalExpense } = this.state;
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          onContentSizeChange={this.onContentSizeChange}
          scrollEnabled={scrollEnabled}
          bounces={false}
        >
          <View style={styles.dashboardView}>
            <View style={styles.row}>
              <Text style={styles.titleText}>Budget Calender</Text>
            </View>
            <View style={styles.budgetView}>
              <Text style={styles.headerText}>Current Weekly Budget: ${budgetValue}</Text>
            </View>
            <View style={styles.budgetInputView}>
              <Text style={{ fontSize: 14 }}>Set a new weekly total budget amount:</Text>
              <TextInput theme={{ colors: { primary: '#5B5B5B' } }} style={styles.budgetInput} onChangeText={this.handleBudgetInput} value={budgetInputValue} placeholder="$" keyboardType="numeric" />
            </View>
            <Button mode="contained" onPress={this.saveBudgetValue} uppercase={false} style={styles.saveBudgetButton}>Save Budget</Button>
            <View style={styles.hairline} />
            <View style={styles.budgetView}>
              <Text style={{ fontSize: 14 }}>Add a new spending category (amount per week):</Text>
            </View>
            <View style={styles.budgetView}>
              <TextInput theme={{ colors: { primary: '#5B5B5B' } }} onChangeText={this.handleCategoryNameInput} value={curCatNameInput} style={styles.categoryNameInput} placeholder="Category Name" />
              <TextInput theme={{ colors: { primary: '#5B5B5B' } }} onChangeText={this.handleCategoryAmountInput} value={curCatAmntInput} style={styles.categoryAmntInput} placeholder="$$$$" keyboardType="numeric" />
              <Button mode="contained" style={{ borderWidth: 1, marginLeft: "2%", backgroundColor: '#9FB48F'}} onPress={this.addCategory} compact={true} icon="plus-circle-outline"></Button>
            </View>
          </View>
          <View style={styles.budgetView}>
            <Text style={styles.headerText}>Current Spending Categories</Text>
          </View>
          <View style={categories.length == 0 ? { paddingTop: 5, alignSelf: 'center' } : styles.budgetView}>
            {categories.length == 0 ?
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#9FB48F' }}>No Categories Added</Text> :
              <DataTable>
                <DataTable.Header style={{ backgroundColor: '#9FB48F' }}>
                  <DataTable.Title style={{}}>Name</DataTable.Title>
                  <DataTable.Title numeric>Amount (per wk)</DataTable.Title>
                  <DataTable.Title></DataTable.Title>
                </DataTable.Header>
                {categories.map((category, i) => (
                  <DataTable.Row key={i}>
                    <DataTable.Cell>{category.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{category.amount}</DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: "flex-end" }}><Button mode="contained" compact={true} style={{ borderWidth: 1, backgroundColor: '#9FB48F' }} onPress={this.removeCategory(i)} icon="close"></Button></DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            }
          </View>
          <View style={styles.hairline} />
          <View style={styles.expenseView}>
            {this.state.categories.length == 0 ||
              <Text style={styles.expenseText}>Amount of Budget Not Allocated: ${budgetValue - totalExpense}</Text>
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0E2D0'
  },
  dashboardView: {
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#4B674C',
    paddingBottom: 10
  },
  saveBudgetButton: {
    height: 35,
    width: "35%",
    backgroundColor: '#9FB48F',
    fontSize: 15,
    alignSelf: 'flex-end',
    marginTop: -10,
    marginRight: 20
  },
  addCategoryButton: {
    margin: 5,
    backgroundColor: '#9FB48F',
  },
  delCategoryButton: {
    marginLeft: "25%",
    backgroundColor: '#9FB48F',
  },
  titleText: {
    marginTop: 35,
    fontSize: 30,
    marginLeft: 10,
    color: '#ffffff'
  },
  budgetInputView: {
    padding: 20,
    paddingLeft: 0,
    paddingTop: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  expenseView: {
    padding: 7,
    paddingLeft: 9,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  budgetView: {
    padding: 7,
    paddingLeft: 9,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  budgetInput: {
    height: 28,
    width: 70,
    marginLeft: 10,
  },
  categoryNameInput: {
    height: 28,
    width: "65%",
  },
  categoryAmntInput: {
    height: 28,
    marginLeft: "2%",
    width: "20%",
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 2,
    margin: 15,
    flexDirection: 'row',
    width: "90%",
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
});