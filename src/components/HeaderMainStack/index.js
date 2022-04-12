import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {StyleSheet} from 'react-native-auto-stylesheet';
import IconLib from '../../assets/IconLib';

const index = ({title, customStyle, onPress}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigation = useNavigation();
  return (
    <View style={[s.wrapper, customStyle]}>
      <TouchableOpacity onPress={onPress ? onPress : () => navigation.goBack()}>
        <IconLib icon={'arrow-left'} size={'smallMed'} />
      </TouchableOpacity>
      <Text style={s.fonttitle}>{title}</Text>
      <View />
    </View>
  );
};

export default index;

const s = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
  },
  fonttitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#616161',
  },
});
