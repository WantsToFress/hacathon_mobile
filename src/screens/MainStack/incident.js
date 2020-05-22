import React from "react";
import {TextInput, StyleSheet, TouchableOpacity, View, Text} from "react-native"
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {DARK_PRIMARY_COLOR, PRIMARY_COLOR} from "../../constants/colors";
import Icon from 'react-native-vector-icons/Entypo'
import {sendIncident, sendIncidentEquipment, setData} from "../../redux/actions";
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

const mapStateToProps = state => ({
    operative_id: state.operative_id
});

const mapDispatchToProps = dispatch => ({
    setData: (data) => dispatch(setData(data)),
    sendIncidentEquipment: async (title, description, deadline, priority, id, callback) => {
        await dispatch(sendIncidentEquipment(title, description, deadline, priority, id))
        await callback()
    },
    sendIncident: async (title, description, deadline, priority, callback) => {
        await dispatch(sendIncident(title, description, deadline, priority))
        await callback()
    }
});

class IncidentScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            show: false,
            mode: 'date',
            description: '',
            title: '',
            priority: 'none_priority',
            deadline: new Date(),
            visibleError: false,
            textError: ''
        }

        this.sendData = this.sendData.bind(this)
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        return true
    }

    render() {
        return (
            <LinearGradient colors={['#272727', '#272727']} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        this.props.setData({operative_id: -1})
                        this.props.navigation.goBack()
                    }} style={{flex: 1}}>
                        <Icon name={'chevron-left'} color={'#ffffff'} size={29}/>
                    </TouchableOpacity>
                    <View style={{flex: 5}}>
                        <Text style={{fontSize: 30, fontWeight: '600', color: '#ffffff', textAlign: 'center'}}>Create</Text>
                    </View>
                    <View style={{flex: 1}}/>
                </View>
                <TextInput onChangeText={(text) => this.setState({title: text})}
                           placeholder={'Title'} style={styles.input}/>
                <TextInput onChangeText={(text) => this.setState({description: text})}
                           placeholder={'Description'} style={styles.input}/>
                <Text style={{width: '80%', fontSize: 13, color: '#BDBDBD', paddingLeft: 5, marginTop: 5}}>Choose priority</Text>
                <Picker
                    selectedValue={this.state.priority}
                    mode={'dropdown'}
                    style={{height: 50, width: '80%', color: '#FFFFFF', marginBottom: 5}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({priority: itemValue})
                    }>
                    <Picker.Item label="None" value="none_priority" />
                    <Picker.Item label="Low" value="low" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="High" value="high" />
                </Picker>
                <Text style={{width: '80%', fontSize: 13, color: '#BDBDBD', paddingLeft: 5, marginTop: 5}}>
                    {this.props.operative_id ? "Choose equipment's date of return" : "Choose deadline for issue"}
                </Text>
                <TouchableOpacity onPress={() => this.setState({show: !this.state.show})} style={styles.input} >
                    <TextInput editable={false}>
                        {moment(this.state.deadline).format('DD.MM.YYYY; HH:mm')}
                    </TextInput>
                </TouchableOpacity>
                {this.state.show &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={this.state.deadline}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={(value) => {
                            if (this.state.mode === 'date')
                                this.setState({mode: 'time', show: true,
                                    deadline: moment(value.nativeEvent.timestamp).startOf('day').toDate()})
                            else
                                this.setState({mode: 'date', show: false,
                                deadline: moment(this.state.deadline).add(moment.duration(moment().startOf('day').diff(moment(value.nativeEvent.timestamp))))})
                        }}
                    />
                }
                {this.state.visibleError && <Text style={[styles.small_text, {color: '#ED5565'}]}>{this.state.textError}</Text>}
                <View style={{flexDirection: 'row', width: '60%', marginTop: 20}}>
                    <TouchableOpacity style={[styles.login]} onPress={this.sendData}>
                        <Text style={styles.small_text}>Send data</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        )
    }

    sendData() {
        if (!this.state.title || !this.state.description || !this.state.deadline || !this.state.priority) {
            this.setState({visibleError: true, textError: 'Write all data'})
            setTimeout(() => this.setState({visibleError: false}), 5000)
        } else {
            if(this.props.operative_id)
                this.props.sendIncidentEquipment(this.state.title, this.state.description, this.state.deadline, this.state.priority, this.props.operative_id,
                    () => this.props.navigation.navigate('ChatScreen'))
            else
                this.props.sendIncident(this.state.title, this.state.description, this.state.deadline, this.state.priority,
                    () => this.props.navigation.navigate('ChatScreen'))
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

export default connect(mapStateToProps, mapDispatchToProps)(IncidentScreen)
