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

export default function Grafico3() {
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

    const chartConfig = {
        backgroundColor: "#e1f5e3",
        backgroundGradientFrom: "#e1f5e3",
        backgroundGradientTo: "#9ef0a4",
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
        <BarChart
            
            data={data}
            width={Dimensions.get("window").width}
            height={280}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
        />
    );
}


