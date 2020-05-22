import React from "react";
import {connect} from "react-redux";
//import {} from "../../redux/actions";
//import {} from "../../constants/colors";
import {createStackNavigator} from "@react-navigation/stack";
import ChatScreen from "./chat";
import EquipmentScreen from './equipment'
import IncidentScreen from './incident'
import IncidentListScreen from './incident_list'
import ProfileScreen from './profile'

const Stack = createStackNavigator();

class MainStack extends React.Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="LoadingContainer" mode='modal'>
                <Stack.Screen name="ChatScreen" component={ChatScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name="EquipmentScreen" component={EquipmentScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name="IncidentScreen" component={IncidentScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name="IncidentListScreen" component={IncidentListScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name="ProfileScreen" component={ProfileScreen}
                              options={{headerShown: false}}/>
            </Stack.Navigator>
        )
    }
}

export default MainStack;
