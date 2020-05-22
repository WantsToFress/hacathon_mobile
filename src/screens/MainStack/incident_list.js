import React from "react";
import {TextInput, StyleSheet, TouchableOpacity, View, Text, FlatList} from "react-native"
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {DARK_PRIMARY_COLOR, PRIMARY_COLOR} from "../../constants/colors";
import Icon from 'react-native-vector-icons/Entypo'
import {getIncidents, getProfile, postRegister} from "../../redux/actions";
import moment from "moment";

const mapStateToProps = state => ({
    incidents: state.incidents,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    getIncidents: (id) => dispatch(getIncidents({creator_id: id}))
});

class IncidentListScreen extends React.Component {
    constructor() {
        super();
    }

    componentDidMount(): void {
        this.props.getIncidents(this.props.auth.id)
    }

    render() {
        return (
            <LinearGradient colors={['#272727', '#272727']} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <FlatList data={this.props.incidents}
                          style={{
                              paddingTop: 60,
                              width: '100%'
                          }}
                          renderItem={({item, index}) => {
                              let color;
                              switch (item.priority) {
                                  case 'none_priority':
                                      color = {backgroundColor: '#ffffff'}
                                      break
                                  case 'low':
                                      color = {backgroundColor: '#3CAEA3'}
                                      break
                                  case 'medium':
                                      color = {backgroundColor: '#F6D55C'}
                                      break
                                  case 'high':
                                      color = {backgroundColor: '#ED553B'}
                                      break
                              }
                              return (
                                  <View style={[styles.item, color]}>
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
                              )
                          }}/>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flex: 1}}>
                        <Icon name={'chevron-left'} color={'#ffffff'} size={32}/>
                    </TouchableOpacity>
                    <View style={{flex: 5}}/>
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('IncidentScreen')}>
                        <Text style={{fontSize: 40, color: '#ffffff', textAlign: 'right'}}>+</Text>
                    </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(IncidentListScreen)
