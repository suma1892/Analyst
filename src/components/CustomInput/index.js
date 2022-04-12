/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {StyleSheet} from 'react-native-auto-stylesheet';
import {mainColors, fontSizes} from '../../utils';
import Icon from 'react-native-vector-icons/Feather';

const {height, width} = Dimensions.get('window');

const index = ({placeholder, isPassword, customStyle, value, onChangeText}) => {
  const [Focus, setFocus] = useState(false);
  const [Eye, setEye] = useState(true);
  return (
    <View>
      <TextInput
        style={[s.input, customStyle]}
        placeholder={Focus ? '' : placeholder}
        // onFocus={() => setFocus(true)}
        // onBlur={() => setFocus(false)}
        value={value}
        onChangeText={v => onChangeText(v)}
        maxLength={20}
        secureTextEntry={Eye && isPassword}
      />
      {isPassword && (
        <Icon
          name={!Eye ? 'eye' : 'eye-off'}
          onPress={() => setEye(!Eye)}
          color={'#6666'}
          size={15}
          style={s.eye}
        />
      )}
    </View>
  );
};

export default index;

const s = StyleSheet.create({
  input: {
    // marginTop: '10%',
    borderBottomColor: mainColors.youngblue,
    width: width / 2 + 30,
    borderBottomWidth: 1,
    height: 30,
    padding: 0,
    fontSize: fontSizes.small,
    fontWeight: '500',
    color: '#bababa',
    // textAlign: 'center',
  },
  eye: {
    position: 'absolute',
    bottom: '2%',
    right: 0,
  },
});
