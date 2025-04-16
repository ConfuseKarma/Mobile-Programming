
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaPessoas from './telas/pessoa/index';
import CadastroPessoa from './telas/pessoa/form';


const telas = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <telas.Navigator initialRouteName="ListaPessoas">
        <telas.Screen name="ListaPessoas" component={ListaPessoas} options={{ headerShown: false, title: '', animation: 'fade' }} />
        <telas.Screen name="CadastroPessoa" component={CadastroPessoa} options={{ headerShown: false, title: '', animation: 'slide_from_bottom'  }} />
      </telas.Navigator>
    </NavigationContainer>
  );
}

