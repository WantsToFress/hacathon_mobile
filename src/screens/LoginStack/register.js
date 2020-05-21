import React from "react";
import {TextInput, StyleSheet, TouchableOpacity, View, Text} from "react-native"
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {DARK_PRIMARY_COLOR, PRIMARY_COLOR} from "../../constants/colors";
import Icon from 'react-native-vector-icons/Entypo'
import {postRegister} from "../../redux/actions";

const mapStateToProps = state => ({
    //auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    register: (login, full_name, password, email) => dispatch(postRegister(login, full_name, password, email)),
});

class RegisterScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            fio: '',
            login: '',
            password: '',
            repeat_password: '',
            email: ''
        }

        this.register = this.register.bind(this)
    }

    componentDidMount(): void {
    }

    render() {
        return (
            <LinearGradient colors={['#272727', '#272727']} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flex: 1}}>
                        <Icon name={'chevron-left'} color={'#ffffff'} size={29}/>
                    </TouchableOpacity>
                    <View style={{flex: 6}}/>
                </View>
                <TextInput onChangeText={(text) => this.setState({full_name: text})}
                           placeholder={'Full name'} style={styles.input}/>
                <TextInput onChangeText={(text) => this.setState({login: text})}
                           placeholder={'Login'} style={styles.input}/>
                <TextInput onChangeText={(text) => this.setState({password: text})}
                           placeholder={'Password'} style={styles.input}
                           secureTextEntry={true}/>
                <TextInput onChangeText={(text) => this.setState({repeat_password: text})}
                           placeholder={'Repeat password'} style={styles.input}
                           secureTextEntry={true}/>
                <TextInput onChangeText={(text) => this.setState({email: text})}
                           placeholder={'Email'} style={styles.input}/>
                <View style={{flexDirection: 'row', width: '60%', marginTop: 20}}>
                    <TouchableOpacity style={[styles.login]} onPress={this.register}>
                        <Text style={styles.small_text}>Register</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        )
    }

    register() {
        if (!!this.state.fio && !!this.state.login && !!this.state.email && !!this.state.password && this.state.password === this.state.repeat_password) {
            this.props.register(this.state.login, this.state.full_name, this.state.password, this.state.email)
        }
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#ffffff',
        margin: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        width: "80%",
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15
    },
    header: {
        backgroundColor: '#2b2b2b',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
