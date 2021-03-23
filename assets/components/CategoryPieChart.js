import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native'
const screenWidth = Dimensions.get('window').width

export default class CategoryPieChart extends Component {
    constructor(props) {
        super(props);
        const {
            info
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
        const { info } = this.props;
        const data = [
            { name: 'Spent', number: info.spent, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Remaining', number: info.remaining, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 }
        ]
        const { total, inputModalVisible, text } = this.state;
        const chartConfig = {
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
        }
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.category}</Text>
                <Text style={styles.text}>Goal: ${this.props.goal}</Text>
                <View>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={180}
                        chartConfig={chartConfig}
                        accessor="number"
                        backgroundColor="transparent"
                        paddingLeft="0"
                        style={styles.piechart}
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
    piechart: {
        flexDirection: 'column'
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
    }
});