import React from 'react';
import {View, Dimensions, Image} from 'react-native';
import {StyleSheet} from 'react-native-auto-stylesheet';
// import Image from 'react-native-fast-image';
export default function index({icon, size, customStyle}) {
  const IconLib = icon => {
    switch (icon) {
      case 'add-saldo':
        return require('./add-saldo.png');
      case 'saldo':
        return require('./saldo.png');
      case 'reward':
        return require('./reward.png');
      case 'scan':
        return require('./scan.png');
      case 'cs':
        return require('./cs.png');
      case 'notif':
        return require('./lonceng.png');
      case 'pln':
        return require('./pln.png');
      case 'pulsa':
        return require('./pulsa.png');
      case 'paket-data':
        return require('./paket-data.png');
      case 'add-saldo':
        return require('./add-saldo.png');
      case 'pdam':
        return require('./pdam.png');
      case 'karvelo':
        return require('./karvelo.png');
      case 'banner-main':
        return require('./banner-main.png');
      case 'tv':
        return require('./tv.png');
      case 'bpjs':
        return require('./bpjs.png');
      case 'p-inter':
        return require('./p-inter.png');
      case 'call-chat':
        return require('./call-chat.png');
      case 'finance':
        return require('./finance.png');
      case 'v-other':
        return require('./v-other.png');
      case 'v-tv':
        return require('./v-tv.png');
      case 'v-game':
        return require('./v-game.png');
      case 'edit':
        return require('./edit.png');
      case 'promo':
        return require('./promo.png');
      case 'favorit-1':
        return require('./love-active.png');
      case 'favorit-2':
        return require('./love-inactive.png');
      case 'close':
        return require('./close.png');
      case 'arrow-left':
        return require('./arrow-left.png');
      case 'kontak':
        return require('./kontak.png');
      case 'peni':
        return require('./peni.png');
      case 'star':
        return require('./star.png');
      case 'arrow-left-white':
        return require('./arrow-left-white.png');
      case 'check':
        return require('./check.png');
      case 'big-tv':
        return require('./big.png');
      case 'arrow-right-white':
        return require('./arrow-right-white.png');
      case 'arrow-right':
        return require('./arrow-right.png');
      case 'wa':
        return require('./wa.png');
      case 'fb':
        return require('./fb.png');
      case 'ig':
        return require('./ig.png');
      case 'telkom':
        return require('./telkom.png');
      case 'donasi':
        return require('./donasi.png');
      case 'e-wallet':
        return require('./e-wallet.png');
      case 'transfer':
        return require('./transfer.png');
      case 'travel':
        return require('./travel.png');
      case 'shop':
        return require('./shop.png');
      case 'indosat':
        return require('./indosat.png');
      case 'arrow-right-long':
        return require('./arrow-right-long.png');
      case 'bca':
        return require('./bca.png');
      case 'dompet':
        return require('./dompet.png');
      case 'indomart':
        return require('./indomart.png');
      case 'alfamart':
        return require('./alfamart.png');
      case 'tf-bank':
        return require('./tf-bank.png');
      case 'copas':
        return require('./copas.png');
      case 'mandiri':
        return require('./mandiri.png');
      case 'bca':
        return require('./bca.png');
      case 'bni':
        return require('./bni.png');
      case 'bri':
        return require('./bri.png');
      case 'poin':
        return require('./poin.png');
      case 'line-doted':
        return require('./line-doted.png');
      case 'karvelo-emas':
        return require('./karvelo-emas.png');
      case 'tiket':
        return require('./tiket.png');
      case 'calendar':
        return require('./calendar.png');
      case 'beranda-active':
        return require('./beranda-active.png');
      case 'beranda-inactive':
        return require('./beranda-inactive.png');
      case 'favorit-inactive':
        return require('./favorit-inactive.png');
      case 'riwayat-inactive':
        return require('./riwayat-inactive.png');
      case 'kasir-inactive':
        return require('./kasir-inactive.png');
      case 'akun-active':
        return require('./akun-active.png');
      case 'akun-inactive':
        return require('./akun-inactive.png');
      case 'signature':
        return require('./signature.png');
      case 'thumbs':
        return require('./thumbs.png');
      case 'main-logo':
        return require('./main-logo.png');
      case 'down-arrow':
        return require('./down-arrow.png');
      case 'filter':
        return require('./filter.png');
      case 'search':
        return require('./search.png');
      case 'darken-kontak':
        return require('./darken-kontak.png');
      case 'plus':
        return require('./plus.png');
      case 'add':
        return require('./add.png');
      case 'recicle':
        return require('./recicle.png');
      case 'bar-code':
        return require('./bar-code.png');
      case 'dropdown':
        return require('./dropdown.png');

      case 'telkomsel':
        return require('./Telkomsel.png');
      case 'xl':
        return require('./XL.png');
      case 'tri':
        return require('./Tri.png');
      case 'smartfreen':
        return require('./Smartfreen.png');
      case 'ceria':
        return require('./ceria.png');

      case 'dana':
        return require('./dana.png');
      case 'ovo':
        return require('./ovo.png');
      case 'link':
        return require('./link.png');
      case 'tix':
        return require('./tix.png');
      case 'gojek':
        return require('./gojek.png');
      case 'm-tik':
        return require('./m-tik.png');
      case 'grab':
        return require('./grab.png');
      case 'gopay':
        return require('./gopay.png');
      case 'shopeepay':
        return require('./shopeepay.png');

      case 'GRAMEDIA':
        return require('./gramediatv.png');
      case 'K-VISION':
        return require('./kvision.png');
      case 'MATRIX G':
        return require('./matrix.png');
      case 'N-EX':
        return require('./nexparabola.png');
      case 'TOPAS TV':
        return require('./topastv.png');
      case 'SKYNINDO':
        return require('./skynindotv.png');
      case 'N-M':
        return require('./ninmediatv.png');
      case 'camera':
        return require('./camera.png');
      case 'galery':
        return require('./galery.png');
      case 'V-AOV':
        return require('./aov.png');
      // case 'V-CHR':
      //     return require('./chess-rush.png');
      // case 'V-DH':
      //     return require('./hago.png');
      case 'V-FF':
        return require('./free-fire.png');
      // case 'V-GAME':
      //     return require('./game.png');
      // case 'V-GBT':
      //     return require('./battlenet.png');
      case 'V-GCOD':
        return require('./codm.jpg');
      case 'V-GLM':
        return require('./lord-mobile.png');
      // case 'V-GML':
      //     return require('./mobile-legend.png');
      case 'refresh':
        return require('./refresh.png');
      case 'zero':
        return require('./zero.png');
      case 'gagal':
        return require('./gagal.png');
      case 'voice':
        return require('./voice.png');
      case 'wave':
        return require('./wave.gif');
      // case '':
      //     return require('./.png');
      // case '':
      //     return require('./.png');
      // case '':
      //     return require('./.png');
      // case '':
      //     return require('./.png');
      // case '':
      //     return require('./.png');
      // case '':
      //     return require('./.png');
      // case '':
      //     return require('./.png');
      // case '':
      //     return require('./.png');
      // case '':
      //     return require('./.png');
      // case '':
      //     return require('./.png');
      // case '':
      //     return require('./.png');
      // case '':
      //     return require('./.png');
      // case '':
      //     return require('./.png');
      // case '':
      //     return require('./.png');
      default:
        break;
    }
  };

  return (
    <Image
      source={IconLib(icon)}
      style={[s[`${size}`], customStyle]}
      resizeMode={'contain'}
    />
  );
}

const s = StyleSheet.create({
  medium: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  lilMedium: {
    height: 45,
    width: 45,
    // resizeMode: "contain"
  },
  bottomTab: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  big: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  mainMenu: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
  mainMenu2: {
    height: 74,
    width: 74,
    resizeMode: 'contain',
  },
  karvelo: {
    height: 50,
    width: 125,
    resizeMode: 'stretch',
    // resizeMode: "contain"
  },
  bannerMain: {
    height: '100%',
    // marginVertical:5,

    // aspectRatio: 1,
    width: '100%',
    resizeMode: 'stretch',
  },
  small: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  smallMed: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  smallBig: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
})