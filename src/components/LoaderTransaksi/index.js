

import React, { useState, useEffect } from 'react'
import { View, Text, Modal, ActivityIndicator, Pressable } from 'react-native';
import { StyleSheet } from 'react-native-auto-stylesheet';
// import { useSelector } from 'react-redux';

export default function index({ loader, setLoader }) {
    const [timer, setTimer] = useState(false);

    useEffect(() => {
        if (loader) {
            setTimeout(() => {
                setTimer(true);
            }, 1000);
        }
    }, [loader]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={loader}
            onRequestClose={() => {
                setLoader(!modalVisible);
            }}
        >
            <View style={s.centeredView}>
                <View style={s.modalView}>
                    <ActivityIndicator size={'large'} color={'#2987D2'} />
                    <Text style={[s.fontPayment, s.fontGotham, { marginHorizontal: 0, textAlign: "center" }]}>Transaksi Anda Sedang di Proses</Text>
                    {timer && <Pressable
                        style={[s.button, s.buttonOpen, { alignSelf: "flex-end" }]}
                        onPress={() => setLoader(false)}
                    >
                        <Text allowFontScaling={false} style={[s.textStyle, { color: '#C4C4C4' }]}>{'Oke'}</Text>
                    </Pressable>}
                </View>

            </View>


        </Modal>
    )
}

const s = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        width: '80%'
    },
    fontTitle: {
        fontWeight: "700",
        fontSize: 18
    },
    fontPayment: {
        fontWeight: '500',
        fontSize: 11,
        marginHorizontal: 15,
        marginTop: 15
    },
    fontGotham: {
        fontFamily: "Gotham-Medium-1",
        color: '#616161'
    },
    button: {
        borderRadius: 10,
        padding: 7,
    },
    buttonOpen: {
        backgroundColor: '#fff',
        marginTop: 12,
        // width: '52%',
        width: '28%',
        borderColor: '#C4C4C4',
        borderWidth: 1,
    },
    textStyle: {
        color: 'white',
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        fontSize: 14
    },
})