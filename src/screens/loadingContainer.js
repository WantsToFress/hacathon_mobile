import React from "react";
import {Image, Dimensions} from "react-native"
import {connect} from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import LinearGradient from "react-native-linear-gradient";
import {DARK_PRIMARY_COLOR, PRIMARY_COLOR} from "../constants/colors";
import {getEquipment, getI, register} from "../lib/API";

const mapStateToProps = state => ({
    //auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    getI: async (callback) => {
        await dispatch(getI())
        await callback()
    }
});

class LoadingContainer extends React.Component {
    constructor() {
        super();

        this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    }

    componentDidMount(): void {
        if (!this.props.auth || !this.props.auth.login) {
            this.props.navigation.replace('LoginStack')
        } else {
            this.props.getI(() => {
                this.props.navigation.replace('MainStack')
            })
        }
    }

    handleConnectivityChange(connectionInfo) {
        /*this.props.setData({
            online: connectionInfo.type !== 'none'
        })*/
    }

    checkConnection() {
        NetInfo.fetch().then((connectionInfo) => {
            this.handleConnectivityChange(connectionInfo)
        });
    }

    render() {
        return (
            <LinearGradient colors={[PRIMARY_COLOR, PRIMARY_COLOR]} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../constants/images/logo_1.png')}
                       style={{height: Dimensions.get('window').width * 0.7, width: Dimensions.get('window').width * 0.7}}/>
            </LinearGradient>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer)
