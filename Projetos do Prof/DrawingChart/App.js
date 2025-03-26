//https://www.npmjs.com/package/react-native-chart-kit
//npx expo install react-native-chart-kit


/* pacotes para instalar para a parte de navegção entre telas

npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-navigation/native-stack
*/

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from "react-native";
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './Telas/Home';
import Grafico1 from './Telas/Grafico1';
import Grafico2 from './Telas/Grafico2';
import Grafico3 from './Telas/Grafico3';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}  />
        <Stack.Screen name="Grafico1" component={Grafico1}  />
        <Stack.Screen name="Grafico2" component={Grafico2}  />
        <Stack.Screen name="Grafico3" component={Grafico3}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
}



