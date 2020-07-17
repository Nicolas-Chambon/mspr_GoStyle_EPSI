import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { addDiscountToUser } from '../api/discount_user';
import { getDiscountById } from '../api/discount';

export default function QRScanner({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    AsyncStorage.getItem('userIdentifiere').then((data)=> setUserId(data)).catch((error) => console.log(error));
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    getDiscountById(+data).then((res) => {
      if (res !== "Bad request") {
        addDiscountToUser({
          user_id: userId,
          discount_id: data
        }).catch((err) => console.log(err));

        navigation.navigate('Detail', {
          promo_id : data,
          user_id : userId
        });
      }
      else {
        alert("Promotion Indisponible");
      }
    }).catch((err) => {console.error(err); alert("Promotion Indisponible");});
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Scannez de nouveau'} onPress={() => setScanned(false)} />}
    </View>
  );
}
