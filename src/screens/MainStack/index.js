import React from "react";
import {connect} from "react-redux";
//import {} from "../../redux/actions";
//import {} from "../../constants/colors";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

class MainStack extends React.Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="LoadingContainer" mode='modal'>

            </Stack.Navigator>
        )
    }
}

export default MainStack;
