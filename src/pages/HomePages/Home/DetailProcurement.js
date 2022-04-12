import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderMainStack, ModalKonfirmasi} from '../../../components';
import {
  approveReject,
  getDetailProcurement,
  preview,
} from '../../../redux/actions';
import Alert from '../../../utils/Alert';
// import Preview from './Preview';
import {WebView} from 'react-native-webview';
import {CommonActions} from '@react-navigation/native';

const DetailProcurement = ({navigation, route}) => {
  const {data} = route?.params;
  const detailProcurement = useSelector(state => state.home?.detailProcurement);
  const dispatch = useDispatch();
  const [Approve, setApprove] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    dispatch(getDetailProcurement(data));
  }, []);

  const handlePress = code => {
    dispatch(
      approveReject(
        {
          ...detailProcurement,
          ...data,
          CODE_STATUS: code,
          NOTE_TRX: note,
        },
        () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'MainTab'}],
            }),
          );
          // navigation.navigate('MainStack', {screen: ''});
        },
      ),
    );
  };

  const handlePreview = async () => {
    let res = await preview(data, res =>
      navigation.navigate('preview', {strUrl: res?.[0]?.URL}),
    );
    // console.log('result = ', res);
  };
  return (
    <View style={s.rootWrapper}>
      <HeaderMainStack title={`${data?.PARAMETER}: ${data?.SR_ID}`} />
      <ScrollView>
        <View style={s.mainWrapper}>
          <View style={s.rowBottom}>
            <Text style={s.fontHeader}>Header Information</Text>
            <Icon
              // onPress={() => navigation.navigate('preview')}
              onPress={handlePreview}
              name={'preview'}
              size={20}
            />
          </View>
          <RowValue keys={'No/Tgl'} value={`${data?.SR_ID}/${data?.SR_DATE}`} />
          <RowValue keys={'Dept'} value={detailProcurement?.[0]?.DEPT_NAME} />
          <RowValue
            keys={'Charge To'}
            value={detailProcurement?.[0]?.INDEX_SUPPLIER_NAME}
          />
          <RowValue
            keys={'Untuk'}
            value={detailProcurement?.[0]?.KET_ANALISA}
          />
          <RowValue keys={'Status'} value={detailProcurement?.[0]?.URGENT} />
          <RowValue
            keys={'Keterangan'}
            value={detailProcurement?.[0]?.DESCRIPTION}
          />

          <Text style={[s.fontHeader, s.mt20]}>Detail Information</Text>
          <RowValue
            keys={detailProcurement?.[0]?.ROW_ID}
            value={`${detailProcurement?.[0]?.TOTAL_QTY?.toString() || '0'} - ${
              detailProcurement?.[0]?.UNIT_NAME1
            }`}
          />
          <RowValue keys={'Spec'} value={detailProcurement?.[0]?.SPEC} />
        </View>
      </ScrollView>
      <View style={[s.row, s.mh10]}>
        <TouchableOpacity
          onPress={() => {
            setApprove('1');
            setIsVisible(true);
          }}
          style={[s.button, {backgroundColor: '#57c97f'}]}>
          <Text style={s.fontButton}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert(
              'Peringatan',
              'Apakah anda yakin ingin kembali ke halaman sebelumnya',
              [
                {
                  text: 'TIDAK',
                  onPress: () => console.log('Cancel Pressed'),
                  //   style: 'cancel',
                },
                {text: 'YA', onPress: () => navigation.goBack()},
              ],
            )
          }
          style={[s.button, {backgroundColor: '#c4c4c4'}]}>
          <Text style={s.fontButton}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setApprove('3');
            setIsVisible(true);
          }}
          style={[s.button, {backgroundColor: '#e37766'}]}>
          <Text style={s.fontButton}>Reject</Text>
        </TouchableOpacity>
      </View>
      <ModalKonfirmasi
        isVisible={isVisible}
        header={Approve === '1' ? 'Approve' : 'Reject'}
        desc={
          Approve === '1'
            ? 'Apakah anda yakin ingin approve voucher: ' + data?.SR_ID
            : 'Apakah anda yakin ingin reject voucher: ' + data?.SR_ID
        }
        onChangeText={v => setNote(v)}
        setIsVisible={() => setIsVisible(false)}
        onPress={() => handlePress(Approve)}
      />
    </View>
  );
};

const RowValue = ({keys, value}) => (
  <View style={s.row}>
    <Text style={s.fontKey}>{keys || '-'}</Text>
    <Text style={s.fontValue}>{value || '-'}</Text>
  </View>
);
export default DetailProcurement;

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7,
    paddingVertical: 5,
    borderBottomColor: '#616161',
    borderBottomWidth: 0.5,
  },
  mainWrapper: {
    margin: 20,
  },
  fontKey: {
    fontSize: 12,
    fontWeight: '500',
    color: '#616161',
  },
  fontValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#c5c5c5',
  },
  fontHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#616161',
  },
  rootWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mt20: {marginTop: 20},
  button: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  fontButton: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  mh10: {
    marginHorizontal: 10,
    borderBottomWidth: 0,
    // borderTopWidth: 0.5,
    // borderTopColor: '#c4c4c4',
  },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
