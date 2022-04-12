import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {StyleSheet} from 'react-native-auto-stylesheet';
import {mainColors, fontSizes} from '../../utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import {generateClientKey, submitLogin} from '../../redux/actions';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [Loader, setLoader] = useState(false);
  const handleLogin = () => {
    setLoader(true);
    const uniqueId = DeviceInfo.getUniqueId();
    const config = {
      LOGIN: {
        ACTION: 'status_device',
        DEVICE_ID: uniqueId,
        // DEVICE_ID: '12314141',
      },
    };
    dispatch(submitLogin(config, () => setLoader(false)));
    dispatch(generateClientKey());
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Text style={[s.fontTitle, {color: '#096BC2'}]}>Approval System</Text>
      <View style={s.mainWrapper}>
        <Icon name={'user-circle'} size={70} color={mainColors.youngblue} />
        <TouchableOpacity
          disabled={Loader}
          onPress={handleLogin}
          style={s.button}>
          {Loader ? (
            <ActivityIndicator color={'#fff'} size={'small'} />
          ) : (
            <Text style={s.fontLogin}>Login</Text>
          )}
        </TouchableOpacity>

        <Text
          onPress={() => navigation.navigate('register')}
          style={s.fontRegister}>
          Daftarkan Device anda?
        </Text>
      </View>
      <Text
        onPress={() => navigation.navigate('setting', {login: true})}
        style={[
          s.fontRegister,
          {
            position: 'absolute',
            bottom: 30,
            alignSelf: 'center',
          },
        ]}>
        Daftarkan Device anda?
      </Text>
    </View>
  );
};

export default Login;

const s = StyleSheet.create({
  mainWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30%',
  },
  button: {
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: mainColors.youngblue,
    marginTop: '10%',
  },
  fontLogin: {
    fontSize: fontSizes.small,
    color: '#fff',
    fontWeight: '700',
  },
  fontTitle: {
    color: '#616161',
    fontSize: fontSizes.large + 10,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '20%',
  },
  fontRegister: {
    fontSize: fontSizes.medium,
    marginTop: '5%',
    color: mainColors.youngblue,
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
});
