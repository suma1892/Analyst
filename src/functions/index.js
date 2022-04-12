import React, {useRef, useState, useEffect} from 'react';
// import Contacts from 'react-native-unified-contacts';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {
  TELKOMSEL,
  INDOSAT,
  XL,
  TRI,
  SMARTFREN,
  CERIA,
} from '../localeLib/Prefix';
import {selectContactPhone} from 'react-native-select-contact';

function openContact(search, callback) {
  try {
    request(PERMISSIONS.ANDROID.READ_CONTACTS).then(result => {
      // …
      switch (result) {
        case RESULTS.UNAVAILABLE:
          break;
        case RESULTS.DENIED:
          break;
        case RESULTS.GRANTED:
          // loadContacts() {
          // Contacts.searchContacts(search, async (err, contacts) => {
          //   if (err === 'denied') {
          //     return null;
          //   } else {
          //     let kontak = await contacts.sort((a, b) =>
          //       a.displayName > b.displayName
          //         ? 1
          //         : b.displayName > a.displayName
          //         ? -1
          //         : 0,
          //     );
          //     // kontak = await removeDuplicates(kontak, 'displayName');
          //     callback(kontak);
          //     return kontak;
          //   }
          // });
          selectContactPhone().then(selection => {
            if (!selection) {
              return null;
            }

            let {contact, selectedPhone} = selection;
            console.log(
              `Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`,
            );
            return selectedPhone.number;
          });
          break;
        case RESULTS.BLOCKED:
          break;
      }
    });
  } catch (e) {}
};

function icProviderHandle(no) {
  if (TELKOMSEL.find((v, i) => v === no) === no) {
    return 'telkomsel';
  } else if (INDOSAT.find((v, i) => v === no) === no) {
    return 'indosat';
  } else if (XL.find((v, i) => v === no) === no) {
    return 'xl';
  } else if (TRI.find((v, i) => v === no) === no) {
    return 'tri';
  } else if (SMARTFREN.find((v, i) => v === no) === no) {
    return 'smartfreen';
  }
  // else if(CERIA.find((v,i)=>v===no)===no){
  //     return 'ceria';
  // }
  else {
    return '';
  }
}

function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

const useEffectSkipInitialRender = (callback, dataArr) => {
  const [data, setData] = useState(null);
  const isInitialRender = useRef(true); // in react, when refs are changed component dont re-render

  useEffect(() => {
    if (isInitialRender.current) {
      // skip initial execution of useEffect
      isInitialRender.current = false; // set it to false so subsequent changes of dependency arr will make useEffect to execute
      return;
    }
    return callback();
  }, dataArr);
};

export {
  openContact,
  icProviderHandle,
  removeDuplicates,
  useEffectSkipInitialRender,
};
