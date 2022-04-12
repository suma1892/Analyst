import React from 'react'
import { View, Text } from 'react-native';
import IconLib from '../../assets/IconLib';
import { StyleSheet } from 'react-native-auto-stylesheet'

const index = () => {
    return (
        <View style={s.wrapper}>
            <IconLib
                icon={'refresh'}
                size={'medium'}
                customStyle={{
                    tintColor:'#616161'
                }}
            />
            <Text style={s.fontRefresh}>Tarik ke bawah untuk Refresh</Text>
        </View>
    )
}

export default index

const s = StyleSheet.create({
    wrapper: {
        alignItems: "center",
        // justifyContent: "center",
        marginTop: "20%"
    },
    fontRefresh: {
        fontWeight: "400",
        fontSize: 14,
        marginTop: 20,
        color: '#6666',
        fontFamily: "Gotham-Medium-1"
    }
})