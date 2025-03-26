import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from "react-native";
import styles from '../../styles';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

export default function Grafico2() {
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 5 // optional
            }
        ],
        legend: ["Rainy Days"] // optional
    };

    const chartConfig = {
        backgroundColor: "#f2f7f7",
        backgroundGradientFrom: "#f2f7f7",
        backgroundGradientTo: "#ceedf2",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
            strokeWidth: "2",
                stroke: "#000"
    }
}



return (
    <View style={styles.container}>
        <Text>Line Chart</Text>
        <LineChart
            data={data}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={chartConfig}
        />
    </View>
);
}


