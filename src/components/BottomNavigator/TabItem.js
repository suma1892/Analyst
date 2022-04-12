/* eslint-disable react/jsx-no-undef */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import IconLib from '../../assets/IconLib';
import {StyleSheet} from 'react-native-auto-stylesheet';
import ICEntypo from 'react-native-vector-icons/Entypo';
import ICIonicons from 'react-native-vector-icons/Ionicons';

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (title === 'HOME') {
      return active ? (
        <ICEntypo name={'home'} size={20} color={'#3882C4'} />
      ) : (
        <ICEntypo name={'home'} size={20} color={'#b8b8b8'} />
      );
    }
    if (title === 'CHART') {
      return active ? (
        <ICEntypo name={'pie-chart'} size={20} color={'#3882C4'} />
      ) : (
        <ICEntypo name={'pie-chart'} size={20} color={'#b8b8b8'} />
      );
    }
    if (title === 'ANALYSIS') {
      return active ? (
        <ICEntypo name={'line-graph'} size={20} color={'#3882C4'} />
      ) : (
        <ICEntypo name={'line-graph'} size={20} color={'#b8b8b8'} />
      );
    }
    if (title === 'LIST DATA') {
      return active ? (
        <ICEntypo name={'list'} size={20} color={'#3882C4'} />
      ) : (
        <ICEntypo name={'list'} size={20} color={'#b8b8b8'} />
      );
    }
    if (title === 'OTHERS') {
      return active ? (
        <ICIonicons name={'ios-settings'} size={20} color={'#3882C4'} />
      ) : (
        <ICIonicons name={'ios-settings'} size={20} color={'#b8b8b8'} />
      );
    }
    return <IconLib icon={'akun-active'} size={'bottomTab'} />;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={[styles.text, {color: active ? '#3882C4' : 'grey'}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 10,
    marginTop: 4,
  },
});
