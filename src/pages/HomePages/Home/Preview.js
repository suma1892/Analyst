import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {HeaderMainStack} from '../../../components';
// import Pdf from 'react-native-pdf';
// import moduleName from 'rnfs'
// import RNFetchBlob from 'react-native-fetch-blob';

// import {
//   DocumentDirectoryPath,
//   downloadFile,
//   DownloadFileOptions,
// } from 'react-native-fs';
const Preview = ({route, navigation}) => {
  const {strUrl} = route?.params;
  const [img, setImg] = useState('');

  React.useEffect(() => {
    // console.log('path = ', strUrl);
    // downloadPDF();
  }, []);

  // const downloadPDF = async (url, fileName) => {
  //   try {
  //     //Define path to store file along with the extension
  //     RNFetchBlob.config({
  //       // response data will be saved to this path if it has access right.
  //       path: DocumentDirectoryPath + '/path-to-file',
  //     })
  //       .fetch('GET', strUrl, {
  //         // Authorization: 'Bearer access-token...',
  //         // more headers  ..
  //       })
  //       // when response status code is 200
  //       .then(res => {
  //         console.log('ress =', JSON.stringify(res?.data));
  //         // the conversion is done in native code
  //         // let base64Str = res.base64();
  //         setImg(res?.data);
  //         // // the following conversions are done in js, it's SYNC
  //         // let text = res.text();
  //         // let json = res.json();
  //       })
  //       // Status code is not 200
  //       .catch((errorMessage, statusCode) => {
  //         console.log(errorMessage);
  //         // error handling
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <HeaderMainStack title={'Preview'} />
      <Image
        source={{uri: `data:image/png;base64,${img}`}}
        style={{height: 50, width: 50}}
      />
      <WebView source={{uri: strUrl}} />

      {/* <Pdf
        source={{
          uri: {uri: 'data:application/pdf;base64,' + img},
          cache: true,
        }}
        title={'suma'}
        // password={}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`);
        }}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      /> */}
    </View>
  );
};

export default Preview;
