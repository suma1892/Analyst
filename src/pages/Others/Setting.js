import { CommonActions } from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderMainStack} from '../../components';
import {changeServerAddress, submitLogout} from '../../redux/actions';
import {fontSizes} from '../../utils';

export default function Setting({route, navigation}) {
  const dispatch = useDispatch();
  const [URL, setURL] = useState('');
  const userData = useSelector(state => state.loginData?.userProfile);

  const handleLogout = () => {
    if (route?.params?.login) {
      dispatch(changeServerAddress(URL));
      SimpleToast.show('Server berhasil dirubah');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Auth'}],
        }),
      );
      return 0;
    }
    console.log(userData);
    const config = {
      LOGIN: {
        ACTION: 'unregister_device',
        DEVICE_ID: userData?.[0]?.DEVICE_ID,
        USER_ID: userData?.[0]?.USER_ID,
      },
    };
    dispatch(
      submitLogout(
        config,
        res => {
          dispatch(changeServerAddress(URL));
          SimpleToast.show('Server berhasil dirubah');
        },
        () => {},
      ),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <HeaderMainStack title={'Setting'} />
      <View
        style={{
          margin: 10,
        }}>
        <Text>Alamat untuk server API</Text>
        <TextInput
          placeholder={'int***.com'}
          style={s.input}
          onChangeText={v => setURL(v)}
        />

        {/* <TouchableOpacity style={s.button}>
          <Text style={s.fontButton}>check koneksi ke server</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => {
            if (URL === '') {
              Alert.alert('Peringatan', 'Isi url terlebih dahulu');
              return 0;
            }
            handleLogout();
          }}
          style={[s.button, {backgroundColor: 'green'}]}>
          <Text style={s.fontButton}>perbarui alamat server</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  input: {
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1,
    padding: 0,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 15,
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  fontButton: {
    fontSize: fontSizes.medium,
    color: '#fff',
    fontWeight: '700',
  },
})