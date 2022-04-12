/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native-auto-stylesheet';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
import ICIonicons from 'react-native-vector-icons/Ionicons';

import IconLib from '../../assets/IconLib';
import {useDispatch, useSelector} from 'react-redux';
import {submitLogout} from '../../redux/actions';
import SimpleToast from 'react-native-simple-toast';
const listRender = [
  {
    title: 'Scanner',
    icon: 'scan-circle',
  },
  {
    title: 'Form Expense',
    icon: 'clipboard',
  },
  {
    title: 'Help',
    icon: 'help-circle-outline',
  },
  {
    title: 'About',
    icon: 'people',
  },
  {
    title: 'Device Information',
    icon: 'phone-portrait-outline',
    goto: 'device-info',
  },
  {
    title: 'Settings',
    icon: 'settings',
    goto: 'Setting',
  },
];

const index = ({navigation}) => {
  const userData = useSelector(state => state.loginData?.userProfile);
  const user = useSelector(state => state.loginData);
  const [Loader, setLoader] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
  }, []);

  const handleLogout = () => {
    console.log(userData);
    const config = {
      LOGIN: {
        ACTION: 'unregister_device',
        DEVICE_ID: userData?.[0]?.DEVICE_ID,
        USER_ID: userData?.[0]?.USER_ID,
      },
    };
    setLoader(true);
    dispatch(
      submitLogout(
        config,
        res => {
          SimpleToast.show(
            res || 'Device berhasil di hapus',
            SimpleToast.BOTTOM,
            SimpleToast.LONG,
          );
          setLoader(false);
        },
        () => setLoader(false),
      ),
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#39B0F3', '#096BC2']}
        style={s.bgWrapper}>
        <TouchableOpacity style={s.circle} />
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              s.fontGotham,
              s.fontSaldo,
              {color: '#fff', fontWeight: '700'},
            ]}>
            {userData?.[0]?.USERNAME}
          </Text>
          <Text
            style={[
              s.fontGotham,
              s.fontCode,
              {color: '#fff', fontWeight: '700'},
            ]}>
            {userData?.[0]?.EmailAddress}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView>
        {listRender.map((res, i) => (
          <>
            <TouchableOpacity
              onPress={() =>
                res?.goto &&
                navigation.navigate('MainStack', {screen: res?.goto})
              }
              style={[s.listWrapper, {backgroundColor: '#fff'}]}
              key={i.toString()}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <ICIonicons name={res?.icon} size={18} color={'#39B0F3'} />
                <Text
                  style={[
                    s.fontSaldo,
                    s.fontGotham,
                    {color: '#616161', marginLeft: 10},
                  ]}>
                  {res.title}
                </Text>
              </View>

              <View>
                <ICIonicons
                  name={'ios-arrow-forward'}
                  size={18}
                  color={'#616161'}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: '#e8e6e6',
                borderBottomWidth: 1.5,
              }}
            />
          </>
        ))}
        <TouchableOpacity onPress={handleLogout} style={s.buttonWrapper}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#39B0F3', '#096BC2']}
            style={s.btnStyle}>
            <Text style={[s.fontGotham, s.fontButton]}>Log Out</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default index;

const s = StyleSheet.create({
  bgWrapper: {
    height: '30%',
    width: '100%',
    zIndex: 99999,
    alignItems: 'center',
  },
  circle: {
    aspectRatio: 1,
    width: '30%',
    // zIndex: 999999,
    borderRadius: 80,
    position: 'absolute',
    top: 5,
    borderWidth: 2,
    borderColor: '#39B0F3',
    // right: Dimensions.get('window').width/2,
    backgroundColor: '#fff',
  },
  fontGotham: {
    color: '#757575',
  },
  fontSaldo: {
    fontSize: 14,
    fontWeight: '400',
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 20
  },
  iconRecicle: {
    backgroundColor: '#EAEFF5',
    elevation: 3,
    padding: 2,
    marginLeft: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  komisiWrapper: {
    marginTop: 10,
    borderTopColor: '#616161',
    borderTopWidth: 1,
  },
  fontCode: {
    fontWeight: '500',
    fontSize: 10,
  },
  verifWrapper: {
    padding: 5,
    elevation: 4,
    backgroundColor: '#EAEFF5',
    borderRadius: 10,
    marginTop: 5,
  },
  listWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  fontDesc: {
    fontWeight: '400',
    fontSize: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',

    alignSelf: 'center',
    alignItems: 'center',

    marginTop: 30,
    marginBottom: 20,
  },
  btnStyle: {
    borderRadius: 40,
    padding: 20,
    paddingVertical: 10,
  },
  fontButton: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingTop: 10,
    alignItems: 'center',
    width: '86%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '40%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 17,
    color: '#616161',
    fontFamily: 'GothamBold',
  },
  fontClose: {
    fontWeight: '400',
    fontSize: 12,
    color: '#616161',
    marginVertical: 15,
    fontFamily: 'Gotham-Medium-1',
    textAlign: 'center',
  },
  icCamera: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#616161',
    borderRadius: 10,
  },
  fontKamera: {
    fontWeight: '400',
    fontSize: 12,
    fontFamily: 'Gotham-Medium-1',
    color: '#616161',
  },
  cameraWrapper: {
    alignItems: 'center',
    // marginRight:20
  },
  close: {
    backgroundColor: '#C12D11',
    width: '86%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 7,
    alignItems: 'center',
  },
  icGalery: {
    height: 70,
    width: 70,
  },
  fontModalClose: {
    fontWeight: '700',
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Gotham-Medium-1',
  },
});
