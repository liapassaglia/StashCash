import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
import { TextInput, Button } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import CategoryPieChart from './CategoryPieChart';

export default class PieChartCard extends Component {
    constructor(props) {
        super(props);
        const {
            categories
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
         const renderItem = ({ item, index }) => {
            return (
                <View
                    style={{
                        backgroundColor: '#DFDDDD',
                        borderRadius: 5,
                        height: 250,
                        padding: 50,
                        marginLeft: 25,
                        marginRight: 25,
                    }}>
                    <CategoryPieChart info={item}></CategoryPieChart>
                </View>
            );
        };
        const { categories } = this.props;
        const { total, inputModalVisible, text } = this.state;
        const chartConfig = {
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            style: {
                borderRadius: 16
            }
        }
        return (
            <View style={styles.container}>
                <View>
                <PieChart
                    data={categories}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor="alotted"
                    backgroundColor="transparent"
                    paddingLeft="15"
                />
                </View>
                <View
                    //TODO: fix styling on the card view
                    style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <Carousel
                        layout={'default'}
                        ref={(ref) => (this.carousel = ref)}
                        data={categories}
                        sliderWidth={400}
                        itemWidth={400}
                        renderItem={renderItem}
                        onSnapToItem={(index) => this.setState({ activeIndex: index })}
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
    
    
    
});