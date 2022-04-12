import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {StyleSheet} from 'react-native-auto-stylesheet';
const index = ({
  navigation,
  isVisible,
  setIsVisible,
  onPress,
  onChangeText,
  header,
  desc,
  Pin,
}) => {
  // const [isConfirm, setisConfirm] = useState(isVisible);
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        // setModalVisible(!modalVisible);
      }}>
      <View style={[s.centeredView]}>
        <View style={[s.modalView, {justifyContent: 'space-between'}]}>
          <View style={s.p20}>
            <Text style={s.modalText}>{header}</Text>
            <Text style={s.fontPin}>{desc}</Text>
            <TextInput
              // keyboardType={'phone-pad'}
              placeholder={"Tambahkan komentar atau langsung 'YA'"}
              style={s.TextInput}
              onChangeText={v => onChangeText(v)}
              value={Pin}
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={s.buttonConfirm}>
              <Text style={s.fontConfirm}>BATAL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                onPress
                  ? () => {
                      setIsVisible(false);
                      onPress();
                      // navigation.navigate('pembayaran-sukses')
                      // navigation.navigate('pembayaran-gagal')
                    }
                  : () => {
                      setIsVisible(false);
                      navigation.navigate('konfirmasi-pembayaran');
                    }
              }
              style={[s.buttonConfirm, s.buttonConfirm2]}>
              <Text style={s.fontConfirm}>YA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default index;

const s = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 200,
    // padding: 20,
    marginTop: 190,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3882C4',
  },
  TextInput: {
    backgroundColor: '#F1F3F6',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 14,
  },
  buttonConfirm: {
    width: '50%',
    backgroundColor: '#C4C4C4',
    height: 50,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontConfirm: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  fontPin: {
    fontWeight: '500',
    fontSize: 12,
    color: '#999797',
  },
  fontDropdown: {
    fontWeight: '400',
    fontSize: 12,
    color: '#8a8a8a',
  },
  p20: {padding: 20},
  buttonConfirm2: {
    backgroundColor: '#2FAB2D',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
  },
});
