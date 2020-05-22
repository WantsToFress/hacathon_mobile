import React from "react";
import {TextInput, StyleSheet, TouchableOpacity, View, Text} from "react-native"
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {DARK_PRIMARY_COLOR, PRIMARY_COLOR} from "../../constants/colors";
import {getProfile, postLogin, postRegister} from "../../redux/actions";

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    login: (login, password) => dispatch(postLogin(login, password)),
    getProfile: () => dispatch(getProfile())
});

class ProfileScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            login: '',
            password: ''
        }
    }

    componentDidMount(): void {
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if (nextProps !== this.props && nextProps.auth && nextProps.auth.token)
            this.props.getProfile()
        if (nextProps !== this.props && nextProps.login)
            this.props.navigation.replace('MainStack')

        return true
    }

    render() {
        return (
            <LinearGradient colors={['#272727', '#272727']} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#ffffff',
        margin: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        width: "60%",
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15
    },
    small_text: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '600'
    },
    login: {
        backgroundColor: '#656D78',
        height: 40,
        borderRadius: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
