/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {StyleSheet} from 'react-native-auto-stylesheet';
import {Tooltip, Text as Text2} from 'react-native-elements';
import IconLib from '../../assets/IconLib';
import ICON from 'react-native-vector-icons/AntDesign';
import Voice from 'react-native-voice';
import Toast from 'react-native-simple-toast';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {selectContactPhone} from 'react-native-select-contact';
import {ModalContact} from '..';
const index = ({
  isAdd,
  title,
  isScan,
  onPressScan,
  onPressAdd,
  placeholder,
  isQuestion,
  value,
  maxLength,
  multiline,
  keyboardType,
  customStyle,
  tooltips,
  disabled,
  onPress,
  onChangeText,
  isKontak,
  onPressKontak,
}) => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    console.log('vv = ',Voice);
    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    //Invoked when .start() is called without error
    setStarted(true);
  };

  const onSpeechEnd = e => {
    //Invoked when SpeechRecognizer stops recognition

    setEnd('√');
  };

  useEffect(() => {}, [started]);

  const onSpeechError = e => {
    //Invoked when an error occurs.

    setStarted(false);
    Toast.show('ulangi kembali', Toast.TOP, Toast.SHORT);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = e => {
    //Invoked when SpeechRecognizer is finished recognizing

    setStarted(false);
    onChange(e.value[0].replace(/ /g, ''));

    setResults(e.value);
  };

  const onSpeechPartialResults = e => {
    //Invoked when any results are computed

    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = e => {
    //Invoked when pitch that is recognized changed

    setPitch(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      await Voice.start('id-ID');
      setPitch('');
      setError('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      setStarted(false);

      //eslint-disable-next-line
            
        }
  };

  const onChange = v => {
    try {
      onChangeText(v);
    } catch (e) {}
  };

  const handleContact = () => {
    try {
      request(PERMISSIONS.ANDROID.READ_CONTACTS).then(result => {
        // …
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            break;
          case RESULTS.GRANTED:
            selectContactPhone().then(selection => {
              if (!selection) {
                return null;
              }
              console.log(JSON.stringify(selection));
              setSelectedData(selection?.contact);
              setIsVisible(true);
            });
            break;
          case RESULTS.BLOCKED:
            break;
        }
      });
    } catch (e) {}
  }

  return (
    <TouchableOpacity activeOpacity={1} style={s.mainWrapper} onPress={onPress}>
      <Text style={s.fontTitle}>{title}</Text>
      <View style={s.wrapper}>
        <View
          style={[
            s.fontInput,
            s.shadow,
            customStyle,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <TextInput
            keyboardType={keyboardType}
            maxLength={maxLength}
            placeholder={placeholder}
            onChangeText={v => {}}
            editable={!disabled}
            multiline={multiline}
            value={value}
            style={[
              s.fontTextInput,
              {width: !isScan || !isKontak ? '100%' : '60%'},
            ]}
            onChangeText={v => onChange(v)}
          />

          {isScan && (
            <TouchableOpacity onPress={startRecognizing} style={s.iconKontak}>
              <IconLib icon={started ? 'wave' : 'voice'} size={'smallMed'} />
            </TouchableOpacity>
          )}

          {isScan && (
            <TouchableOpacity onPress={onPressScan} style={s.iconKontak}>
              <IconLib icon={'scan'} size={'smallMed'} />
            </TouchableOpacity>
          )}

          {isKontak && (
            <TouchableOpacity onPress={handleContact} style={s.iconKontak}>
              <IconLib icon={'kontak'} size={'smallMed'} />
            </TouchableOpacity>
          )}

          {isAdd && (
            <TouchableOpacity onPress={onPressAdd} style={s.iconKontak}>
              <IconLib icon={'add'} size={'smallMed'} />
            </TouchableOpacity>
          )}
        </View>
        {isQuestion && (
          <Tooltip
            height={90}
            width={300}
            backgroundColor={'#3882C4'}
            popover={<Text style={{color: 'white'}}>{tooltips}</Text>}>
            <View style={s.qWrapper}>
              <Text style={{fontWeight: '700', color: '#fff', fontSize: 14}}>
                ?
              </Text>
            </View>
          </Tooltip>
        )}
      </View>

      <ModalContact
        isVisible={isVisible}
        setIsVisible={v => setIsVisible(v)}
        contacts={selectedData}
        onPress={v => {
          setIsVisible(false);
          onChange(v);
          // navigation.dispatch(
          //   CommonActions.reset({
          //     index: 0,
          //     routes: [
          //       {name: route?.params?.screen, params: {isFavorit: true, no: v}},
          //     ],
          //   }),
          // );
        }}
      />
    </TouchableOpacity>
  );
};

export default index;

const s = StyleSheet.create({
  shadow: {
    shadowColor: '#737373',
    shadowOffset: {
      width: 0,
      height: 92,
    },
    shadowOpacity: 0.18,
    shadowRadius: 26.0,
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  iconKontak: {
    marginRight: 10,
  },
  fontInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    // paddingVertical:4,
    width: '90%',
    marginRight: 10,
  },
  qWrapper: {
    width: 25,
    // height: 25,
    aspectRatio: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFE3EE',
  },
  fontTitle: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Gotham-Medium-1',
    // color: "#8a8a8a"
    color: '#616161',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  mainWrapper: {
    marginTop: 20,
    marginHorizontal: 5,
  },
  fontTextInput: {
    fontSize: 14,
    paddingHorizontal: 10,
    width: '60%',
  },
})