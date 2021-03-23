import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Modal,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native'
const screenWidth = Dimensions.get('window').width
import { TextInput, Button } from 'react-native-paper';

export default class CategoryPieChart extends Component {
    constructor(props) {
        super(props);
        const {
            category, goal, spent, remaining
        } = this.props;
        this.state = {
            total: 0,
            inputModalVisible: false,
            input: 0
        }
    }
    showModal = () => {
        this.setState({
            inputModalVisible: true,
        });
    }
    setInput = (text) => {
        this.setState({
            input: Number(text).toFixed(2)
        })
    }
    updateTotal = () => {
        this.setState({
            total: (Number(this.state.total) + Number(this.state.input)).toFixed(2),
            inputModalVisible: false
        });
    }


    render() {
        const { category, goal, spent, remaining } = this.props;
        const data = [
            { name: 'Spent', population: spent, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Remaining', population: remaining, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 }
        ]
        const { total, inputModalVisible, text } = this.state;
        const chartConfig = {
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
        }
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{category}</Text>
                <Text style={styles.text}>Goal: ${goal}</Text>
                <View>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
    },
    jar: {
        backgroundColor: "white",
        margin: 0,
    },
    totalContainer: {
        alignItems: "center",
        justifyContent: 'center',
        marginRight: 50,
        flex: 1,
    },
    img: {
        height: 200,
        width: 200,
    },
    labelView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelText: {
        backgroundColor: 'white',
        padding: 5,
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 1
    },
    text: {
        fontSize: 20,
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
        height: '50%',
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
        height: 50,
        width: 250,
        backgroundColor: '#ffffff',
        marginBottom: 35,
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
    },
});