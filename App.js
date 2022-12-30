import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./components/auth/Landing";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRoute="Landing">
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerMode: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
