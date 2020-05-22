import React from "react";
import {FlatList, StyleSheet, TouchableOpacity, View, Text} from "react-native"
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {DARK_PRIMARY_COLOR, PRIMARY_COLOR} from "../../constants/colors";
import {getIncidents, getProfile, postLogin, postRegister} from "../../redux/actions";
import moment from "moment";
import Icon from "react-native-vector-icons/Entypo";

const mapStateToProps = state => ({
    auth: state.auth,
    incidents: state.incidents
});

const mapDispatchToProps = dispatch => ({
    getIncidents: () => dispatch(getIncidents({requires_user_approval: true}))
});

class ProfileScreen extends React.Component {
    constructor() {
        super();

        this.state = {
        }
    }

    componentDidMount(): void {
        this.props.getIncidents()
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        return true
    }

    render() {
        alert(JSON.stringify(this.props.incidents))
        return (
            <LinearGradient colors={['#272727', '#272727']} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{paddingTop: 60, fontSize: 20, color: '#FFFFFF'}}>{this.props.auth.full_name}</Text>
                <Text style={{paddingTop: 10, fontSize: 20, color: '#FFFFFF'}}>{this.props.auth.login}</Text>
                <Text style={{paddingTop: 10, fontSize: 20, color: '#FFFFFF'}}>{this.props.auth.email}</Text>
                <FlatList data={this.props.incidents}
                          contentContainerStyle={{ flexGrow: 1 , paddingTop: 20}}
                          ListEmptyComponent={() => (
                              <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                  <Text style={{fontSize: 24, color: '#dddddd',
                                      fontStyle: 'italic', fontWeight: '600'}}>
                                      No tasks for approve
                                  </Text>
                              </View>
                          )}
                          renderItem={({item, index}) => (
                                <View style={[styles.item]}>
                                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                                        {item.description}
                                    </Text>
                                    <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 8}}>
                                        {item.comment}
                                    </Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                        <Text style={{fontSize: 20, fontWeight: '600', fontStyle: 'italic'}}>
                                            {moment(item.resolved_at ? item.resolved_at : item.deadline).format("DD.MM.YYYY-HH:mm")}
                                        </Text>
                                        <Text status={{fontSize: 20, fontWeight: '600', fontStyle: 'italic'}}>
                                            {item.status}
                                        </Text>
                                    </View>
                                </View>
                            )}/>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flex: 1}}>
                        <Icon name={'chevron-left'} color={'#ffffff'} size={32}/>
                    </TouchableOpacity>
                    <View style={{flex: 6}}/>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
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
    },
    item: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
