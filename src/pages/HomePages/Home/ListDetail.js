import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProcurement} from '../../../redux/actions';
import {fontSizes, mainColors} from '../../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
import {HeaderMain, HeaderMainStack} from '../../../components';

const ListDetail = ({route, navigation}) => {
  const {approval} = route?.params;
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const procurement = useSelector(state => state.home?.procurement);
  const backgroundStyle = {
    backgroundColor: '#fff',
    flex: 1,
  };

  useEffect(() => {
    console.log('appp =', approval);
    dispatch(getProcurement(approval));

    return () => null;
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <HeaderMainStack title={approval?.GROUP_LABEL} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView>
        {procurement?.length > 0 &&
          procurement?.map((res, i) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('detail-procurement', {
                  data: {...res, PARAMETER: approval?.PARAMETER},
                })
              }
              key={i.toString()}
              style={s.loopWrapper}>
              <View
                style={{
                  width: '80%',
                }}>
                <View style={s.row}>
                  <View
                    style={{
                      backgroundColor: mainColors.youngblue,
                      width: Dimensions.get('screen').width,
                    }}>
                    <Text style={[s.fontLabel, s.fontLabel2]}>
                      {res?.SR_ID}
                    </Text>
                  </View>
                </View>
                <Text style={s.fontCompany}>
                  {res?.COMPANY_ID} - {res?.SITE_ID}
                </Text>
                <Text style={s.fontCompany}>{res?.DESCRIPTION}</Text>
                <Text style={[s.fontCompany, s.fontCompany2]}>
                  {res?.CREATEBY} ({res?.SR_DATE})
                </Text>
              </View>
              <Icon name={'right'} size={15} color={'#616161'} style={s.ic} />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  loopWrapper: {
    // margin: 10,
    // padding: 5,
    marginVertical: 10,
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fontLabel: {
    fontSize: fontSizes.medium,
    fontWeight: '700',
    color: '#616161',
  },
  fontCompany: {
    fontSize: fontSizes.small,
    color: '#6666',
    paddingHorizontal: 5,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ic: {paddingHorizontal: 15, marginTop: 20},
  fontCompany2: {textAlign: 'right', marginBottom: 10},
  fontLabel2: {color: '#fff', padding: 5},
});

export default ListDetail;
