import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {AlertAction} from '../../redux/actions';
import { mainColors } from '../../utils';

const index = () => {
  const alertData = useSelector(state => state.alert);
  const dispatch = useDispatch();

  const closeAlert = () => {
    dispatch(AlertAction('', '', []));
  };

  return (
    <Modal animationType="fade" transparent={true} visible={alertData?.isShow}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            allowFontScaling={false}
            style={[
              styles.modalText,
              {
                fontSize: 20,
                color: '#000',
                fontFamily: 'Roboto-Bold',
              },
            ]}>
            {alertData?.title}
          </Text>

          {typeof alertData?.desc === 'object' ? (
            Object.keys(alertData?.desc).map((res, i) => (
              <Text
                allowFontScaling={false}
                style={[styles.modalText, {color: '#AFAFAF', fontSize: 12}]}>
                {`${res} : ${alertData?.desc[res]}`}
              </Text>
            ))
          ) : (
            <Text
              allowFontScaling={false}
              style={[styles.modalText, {color: '#AFAFAF', fontSize: 12}]}>
              {alertData?.desc}
            </Text>
          )}

          <View
            style={{
              flexDirection: alertData?.buttons ? 'row' : 'column',
              justifyContent: 'space-between',
            }}>
            <Pressable
              style={[
                styles.button,
                styles.buttonOpen,
                {alignSelf: 'flex-end'},
              ]}
              onPress={closeAlert}>
              {alertData?.buttons ? (
                <Text
                  allowFontScaling={false}
                  style={[styles.textStyle, {color: '#C4C4C4'}]}>
                  {alertData?.buttons[0]?.text || 'Cancel'}
                </Text>
              ) : (
                <Text
                  allowFontScaling={false}
                  style={[styles.textStyle, {color: '#C4C4C4'}]}>
                  {'Oke'}
                </Text>
              )}
            </Pressable>
            {alertData?.buttons && (
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  closeAlert();
                  alertData?.buttons[1]?.onPress();
                }}>
                <Text allowFontScaling={false} style={[styles.textStyle]}>
                  YA
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default index;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  button: {
    borderRadius: 10,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: mainColors.youngblue,
    marginTop: 12,
    width: '48%',
  },
  buttonOpen: {
    backgroundColor: '#fff',
    marginTop: 12,
    // width: '52%',
    width: '48%',
    borderColor: '#C4C4C4',
    borderWidth: 1,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    fontSize: 14,
  },
  modalText: {
    marginBottom: 8,
    // textAlign: 'center',
    fontSize: 16,
    // fontFamily:'Roboto-Bold',
  },
});
