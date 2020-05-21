import React from "react";
import {Image, Dimensions} from "react-native"
import {connect} from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import LinearGradient from "react-native-linear-gradient";
import {DARK_PRIMARY_COLOR, PRIMARY_COLOR} from "../constants/colors";
import {getI, register} from "../lib/API";

const mapStateToProps = state => ({
    //auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    /*getUserProfile: async (id, callback) => {
        await dispatch(getUserProfileAndForward(id));
    },
    setData: (data) => dispatch(setData(data)),*/
});

class LoadingContainer extends React.Component {
    constructor() {
        super();

        this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    }

    componentDidMount(): void {
       /* if (!this.props.auth || !this.props.auth.user || !this.props.auth.user.id) {
            this.props.navigation.navigate('LoadStack', {screen: 'logIn'})
        } else {
            this.props.getUserProfile(this.props.auth.user.id, () => {
                this.props.navigation.navigate('MainStack', {screen: ''})
            })
        }*/
        getI()
        //register('Kodonomo', 'Koko donomo', '123456Q', 'kukareku@mail.ru')
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
