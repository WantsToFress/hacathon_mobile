import React from "react";
import {TextInput, StyleSheet, TouchableOpacity, View, Text} from "react-native"
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {DARK_PRIMARY_COLOR, PRIMARY_COLOR} from "../../constants/colors";
import {postLogin} from "../../redux/actions";

const mapStateToProps = state => ({
    //auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    login: (login, password) => dispatch(postLogin(login, password)),
});

class LoginScreen extends React.Component {
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
        if (nextProps.auth && nextProps.auth.token)
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'MainStack' }],
            })
    }

    render() {
        return (
            <LinearGradient colors={['#272727', '#272727']} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput onChangeText={(text) => this.setState({login: text})}
                           placeholder={'Login'} style={styles.input}/>
                <TextInput onChangeText={(text) => this.setState({password: text})}
                           placeholder={'Password'} style={styles.input}
                           secureTextEntry={true}/>
                <View style={{flexDirection: 'row', width: '60%', marginTop: 20}}>
                    <TouchableOpacity style={[styles.login]} onPress={() => this.props.login(this.state.login, this.state.password)}>
                        <Text style={styles.small_text}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.login, {backgroundColor: 'transparent'}]}
                                      onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                        <Text style={styles.small_text}>Register</Text>
                    </TouchableOpacity>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
