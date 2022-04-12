import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-auto-stylesheet'
import IconLib from '../../assets/IconLib';
const index = ({ navigation, title, isRegister, isGrey, zIndex }) => {
    return (
        <View style={s.wrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <IconLib icon={'arrow-left'} size={'smallMed'} />
            </TouchableOpacity>
            <Text style={s.fontTitle}>{title}</Text>
            {isRegister? <IconLib icon={'cs'} size={'medium'} />:<View style={s.nullView} />}
        </View>
    )
}

export default index;

const s = StyleSheet.create({
    wrapper:{ 
        flexDirection: 'row',
        paddingHorizontal:14,
        justifyContent: "space-between", 
        alignItems: 'center',
        backgroundColor:'#fff' 
    },
    fontTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: "#8a8a8a"
    },
    nullView:{
        width:'5%'
    }
})