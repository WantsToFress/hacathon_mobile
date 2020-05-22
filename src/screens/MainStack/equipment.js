import React from "react";
import {FlatList, StyleSheet, TouchableOpacity, View, Text} from "react-native"
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {DARK_PRIMARY_COLOR, PRIMARY_COLOR} from "../../constants/colors";
import {getEquipment, setData} from "../../redux/actions";
import Icon from "react-native-vector-icons/Entypo";

const mapStateToProps = state => ({
    auth: state.auth,
    equipment: state.equipment
});

const mapDispatchToProps = dispatch => ({
    setData: (data) => dispatch(setData(data)),
    getEquipment: () => dispatch(getEquipment())
});

class EquipmentScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            login: '',
            password: ''
        }
    }

    componentDidMount(): void {
        this.props.getEquipment()
    }

    render() {
        return (
            <LinearGradient colors={['#272727', '#272727']} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <FlatList data={this.props.equipment}
                          style={{
                              paddingTop: 60,
                              width: '100%'
                          }}
                          renderItem={({item, index}) => (
                    <View style={styles.item}>
                        <View>
                            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                                {item.name}
                            </Text>
                            <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 8}}>
                                {item.description}
                            </Text>
                            <Text style={{fontSize: 20, fontWeight: '600', fontStyle: 'italic'}}>
                                ${item.price}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.round} onPress={() => {
                            this.props.setData({operative_id: item.id})
                            this.props.navigation.navigate('IncidentScreen')
                        }}>
                            <Text style={{fontSize: 50}}>+</Text>
                        </TouchableOpacity>
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
    item: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    round: {
        borderRadius: 25,
        width: 50,
        height: 50,
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        marginRight: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentScreen)
