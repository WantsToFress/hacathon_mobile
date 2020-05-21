import React from "react";
import {connect} from "react-redux";
//import {} from "../../redux/actions";
//import {} from "../../constants/colors";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./login";
import RegisterScreen from "./register";

const Stack = createStackNavigator();

class LoginStack extends React.Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="LoginScreen" mode='modal'>
                <Stack.Screen name="LoginScreen" component={LoginScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen}
                              options={{headerShown: false}}/>
            </Stack.Navigator>
        )
    }
}

export default LoginStack;
