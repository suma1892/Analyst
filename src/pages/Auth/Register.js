import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {StyleSheet} from 'react-native-auto-stylesheet';
import {mainColors, fontSizes} from '../../utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import {HeaderMainStack, CustomInput} from '../../components';
import DeviceInfo from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import {submitRegister} from '../../redux/actions';
import Alert from '../../utils/Alert';
import SimpleToast from 'react-native-simple-toast';

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const [Form, setForm] = useState({USER_ID: '', PASSWORD: ''});
  const [Loader, setLoader] = useState(false);
  useEffect(() => {
    // getDevice();
  }, []);

  const handleRegister = async () => {
    try {
      console.log('masjuik function = ');
      const device_name = await DeviceInfo?.getDeviceName();
      const uniq_id = await DeviceInfo?.getUniqueId();
      const os_version = await DeviceInfo?.getSystemVersion();
      const build_version = await DeviceInfo?.getBuildNumber();
      const device_model = await DeviceInfo?.getDeviceType();
      const ipAddress = await DeviceInfo?.getIpAddress();

      const config = {
        LOGIN: {
          ACTION: 'register_device',
          USER_ID: Form?.USER_ID,
          PASSWORD: Form?.PASSWORD,
          IP: ipAddress,
          DEVICE_ID: uniq_id,
          DEVICE_NAME: device_name,
          OS_VERSION: os_version,
          BUILD_VERSION: build_version,
          API_VERSION: '1243',
          DEVICE_MODEL: device_model,
        },
      };
      console.log('config = ', config);
      if (Form?.PASSWORD === '' || Form?.USER_ID === '') {
        Alert('Peringatan', 'Silahkan isi USER_ID dan PASSWORD');
        return 0;
      }
      setLoader(true);
      dispatch(
        submitRegister(
          config,
          res => {
            navigation.goBack();
            setLoader(false);
            SimpleToast.show(
              res || 'Berhasil Register',
              SimpleToast.LONG,
              SimpleToast.BOTTOM,
            );
          },
          () => {
            setLoader(false);
          },
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <HeaderMainStack title={'Daftar Device'} />
      <View style={s.mainWrapper}>
        <Icon name={'user-circle'} size={70} color={mainColors.youngblue} />
        <CustomInput
          placeholder={'user ID'}
          customStyle={{marginTop: '10%'}}
          value={Form?.USER_ID}
          onChangeText={v => setForm({...Form, ['USER_ID']: v})}
        />
        <CustomInput
          placeholder={'password'}
          customStyle={{marginTop: '5%'}}
          isPassword={true}
          value={Form?.PASSWORD}
          onChangeText={v => setForm({...Form, ['PASSWORD']: v})}
        />
        <TouchableOpacity
          disabled={Loader}
          onPress={handleRegister}
          style={s.button}>
          {Loader ? (
            <ActivityIndicator color={'#fff'} size={'small'} />
          ) : (
            <Text style={s.fontLogin}>Daftar Device?</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

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
  input: {
    marginTop: '10%',
    borderBottomColor: mainColors.youngblue,
    width: '50%',
    borderBottomWidth: 1,
    height: 30,
    padding: 0,
    fontSize: fontSizes.medium,
    fontWeight: '500',
    color: '#bababa',
    textAlign: 'center',
  },
});
