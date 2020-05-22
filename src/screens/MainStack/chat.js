import React from "react";
import {View, StyleSheet, Text, Image, TouchableOpacity, FlatList, TextInput, ScrollView} from "react-native"
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {DARK_PRIMARY_COLOR, PRIMARY_COLOR} from "../../constants/colors";
import Icon from 'react-native-vector-icons/Entypo'
import moment from "moment";
import {findNarrows} from "../../lib/API/chat_bot";

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

        this.state = {
            data: [],
            hints: []
        }

        this.renderItem = this.renderItem.bind(this)
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if (nextState.lastMessage !== this.state.lastMessage) {
            this.sendMessage('Я Вас плохо понял, спросите что-нибудь другое')
        }
        return true
    }

    render() {
        return (
            <LinearGradient colors={['#272727', '#272727']} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.header}>
                    <View style={{flex: 1}}/>
                    <Image source={require('../../constants/images/logo_long.png')} style={{flex: 5, height: 60, resizeMode: 'stretch'}}/>
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                        <View style={styles.icon}>
                            <Icon name={'user'} size={30} style={{padding: 0, margin: 0}}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList style={
                    {
                        marginTop: 70,
                        width: '100%',
                        height: '100%',
                        paddingBottom: 10
                    }}
                          contentContainerStyle={{ flexGrow: 1 }}
                          data={this.state.data}
                          inverted={true}
                        ListEmptyComponent={() => (
                            <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 24, color: '#dddddd',
                                        fontStyle: 'italic', fontWeight: '600'}}>
                                    No messages for now
                                </Text>
                            </View>
                        )}
                        renderItem={this.renderItem}/>
                <FlatList style={styles.hints} horizontal showsHorizontalScrollIndicator={false}
                          data={this.state.hints}
                            contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
                            renderItem={({item, index}) => (
                                <TouchableOpacity key={index} style={styles.hint} onPress={() => item.action(this.props.navigation, this.sendMessage)}>
                                    <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: '600'}}>{item.message}</Text>
                                </TouchableOpacity>
                            )}/>
                <View style={styles.footer}>
                    <TextInput onChangeText={text => {
                        let x = findNarrows(text)
                        this.setState({message: text, hints: x})
                    }}
                               ref={ref => this.input = ref}
                               style={styles.input}/>
                    <TouchableOpacity style={{flex: 1}} onPress={() => {
                        this.input.clear()
                        this.setState({data: [{message: this.state.message, sender: 'user', time: moment()}, ...this.state.data]},
                            () => setTimeout(() => this.setState({lastMessage: this.state.message}), 500))
                    }}>
                        <Icon name={'direction'} size={25}/>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        )
    }

    sendMessage(message) {
        this.setState({data: [{message: message, sender: 'bot', time: moment()}, ...this.state.data]})
    }

    renderItem = ({item, index, separators}) => {
        let owner = item.sender === 'user' ?
            {alignSelf: 'flex-end', borderBottomRightRadius: 5, borderTopRightRadius: 5} :
            {borderBottomLeftRadius: 5, borderTopLeftRadius: 5}
        let ownerText = item.sender === 'user' ?
            {textAlign: 'right'} :
            {}
        return (
            <View style={[styles.messages, owner]} key={index}>
                <Text style={[styles.message, ownerText]}>{item.message}</Text>
                <Text style={[styles.message, {fontSize: 12, color: '#AAB2BD'}, ownerText]}>{moment(item.time).format('HH:mm:ss')}</Text>
            </View>)
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2b2b2b',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    small_text: {
        color: '#ffffff',
        fontSize: 14,
    },
    icon: {
        borderRadius: 20,
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 1,
        padding: 0,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: '100%',
        borderRadius: 15,
        borderColor: PRIMARY_COLOR,
        borderWidth: 1,
        margin: 3
    },
    input: {
        flex: 7,
        marginHorizontal: 10,
        marginBottom: 3,
        borderBottomWidth: 0.5,
        paddingVertical: 5,
        fontSize: 20
    },
    messages: {
        maxWidth: '70%',
        flex: 1,
        backgroundColor: '#F5F7FA',
        height: 'auto',
        margin: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },
    message: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600'
    },
    hints: {
        width: '100%',
        minHeight: 60,
        marginVertical: 10,
        paddingHorizontal: 5
    },
    hint: {
        height: 50,
        marginRight: 10,
        paddingHorizontal: 10,
        backgroundColor: '#173F5F',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer)
