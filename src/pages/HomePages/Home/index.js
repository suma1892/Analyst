import React, {useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getsApproval} from '../../../redux/actions';
import {fontSizes, mainColors} from '../../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
import {FlatList} from 'react-native-gesture-handler';

const Home = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const approvals = useSelector(state => state.home?.approval);
  const backgroundStyle = {
    backgroundColor: '#fff',
    flex: 1,
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoader(true);
    dispatch(getsApproval(() => setLoader(false)));
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={approvals}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MainStack', {
                screen: 'list-detail',
                params: {approval: item},
              })
            }
            key={index.toString()}
            style={s.loopWrapper}>
            <View
              style={{
                width: '80%',
              }}>
              <Text style={s.fontLabel}>{item?.LABEL}</Text>
              <Text style={s.fontCompany}>
                {item?.COMPANY_NAME} - {item?.SITE_NAME}({item?.TOTAL})
              </Text>
            </View>
            <Icon name={'right'} size={15} color={'#616161'} />
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={loader} onRefresh={() => fetchData()} />
        }
        keyExtractor={(res, i) => i.toString()}
      />
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  loopWrapper: {
    margin: 10,
    padding: 5,
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fontLabel: {
    fontSize: fontSizes.small,
    fontWeight: '700',
    color: '#000',
  },
  fontCompany: {
    marginTop: 5,
    fontSize: fontSizes.small,
    color: '#616161',
    fontWeight: '500',
  },
});

export default Home;
