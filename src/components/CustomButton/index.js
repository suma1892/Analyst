import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default class CustomButton extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      visibleModal: false,
    };
  }
  _isChar = value => {
    // if (/^\d+$/.test(value))
    this.props.onChangeText(value);
  };
  render() {
    const {title, onPress, color} = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[s.t, {backgroundColor:color}]}>
        <Text style={s.l}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
const s = StyleSheet.create({
  t: {
    backgroundColor: 'rgb(196, 2, 2)',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  l: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center',
  },
});
