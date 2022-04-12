import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-auto-stylesheet'
import IconLib from '../../assets/IconLib';
const index = ({ navigation, title, isRegister, isGrey, zIndex }) => {
    return (
        <View style={s.wrapper}>
            <IconLib
                icon={'karvelo'}
                size={'karvelo'}
            />
            <View style={s.wrapperIcon}>
                <TouchableOpacity onPress={() => navigation.navigate('MainStack', { screen: 'notifikasi' })}>
                    <IconLib
                        icon={'notif'}
                        size={'medium'}
                        customStyle={{
                            height: 30,
                            width: 30
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('MainStack', { screen: 'customer-service' })}>
                    <IconLib
                        icon={'cs'}
                        size={'medium'}
                        customStyle={{
                            height: 30,
                            width: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default index;

const s = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        paddingRight: 30,
        paddingLeft: 10,
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    wrapperIcon: {
        flexDirection: "row",
        alignItems: "center",
        width: '20%',
        justifyContent: "space-between"
    },
    fontTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: "#8a8a8a"
    },
    nullView: {
        width: '5%'
    }
})