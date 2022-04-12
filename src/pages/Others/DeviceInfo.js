import React, {useEffect, useState} from 'react';
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
import DeviceInfo from 'react-native-device-info';

export default function DeviceInformation() {
  const [Info, setInfo] = useState({});
  
  useEffect(() => {
    getInfos();
  }, []);

  const getInfos=async()=>{
    const device_name = await DeviceInfo?.getDeviceName();
    const uniq_id = await DeviceInfo?.getUniqueId();
    const os_version = await DeviceInfo?.getSystemVersion();
    const build_version = await DeviceInfo?.getBuildNumber();
    const device_model = await DeviceInfo?.getDeviceType();
    const ipAddress = await DeviceInfo?.getIpAddress();

    setInfo({
      device_name,
      // uniq_id,
      os_version,
      build_version,
      device_model,
      ipAddress,
    });
  };

  useEffect(() => {
    console.log(Info);
  }, [Info]);

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
        <RowView keys={'Device Name'} value={Info?.device_name} />
        <RowView keys={'OS Version'} value={Info?.os_version} />
        <RowView keys={'Build Version'} value={Info?.build_version} />
        <RowView keys={'Device Model'} value={Info?.device_model} />
        <RowView keys={'IP Address'} value={Info?.ipAddress} />
      </View>
    </View>
  );
}

const RowView = ({keys, value}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    }}>
    <Text style={s.fontKeys}>{keys}</Text>
    <Text style={s.fontValue}>{value}</Text>
  </View>
);

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
  fontKeys: {
    fontSize: 14,
    color: '#616161',
    fontWeight: 'bold',
  },
  fontValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
})