import { ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage, FlatList } from 'react-native';
import { getDiscountsUser } from '../api/discount';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {default_uri} from '../constants/link'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fondAvatar:{
      backgroundColor:'white'
    },
  }
);



export function ListPromo({navigation}) {
  const [promotions, setPromotions] = useState([]);
  const [userId, setUserId] = useState(null);

  function verifExpire(dateExpiration){

    
    let maDateExpire = new Date(dateExpiration);
    let dateNow = new Date()
    
    if (dateNow > maDateExpire){
      return false
    } 
    else{
      return true
    }

  }

  useEffect(() => {
      AsyncStorage.getItem('userIdentifiere').then((data)=> setUserId(data)).catch((error) => console.log(error));

      getDiscountsUser(userId).then((monJson) => {
        if (typeof(monJson) === 'string' && monJson.includes('Bad request')){
          throw "Liste Vide";
        }
        else {
          setPromotions(monJson.data);        

      }
      }).catch((err) => console.log(err));
  });

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListItem
      title={item.discount_brand}
      subtitle={item.discount_name}
      onPress={() => {
          navigation.navigate('Detail', {
              promo_id : item.discount_id,
              user_id : userId
          })
        }
      }
      rightElement={() => {
        if (verifExpire(item.discount_expiration) === false){
          return(
            <Button
              icon={
                <Icon
                  name="times-circle"
                  size={24}
                  color="red"
                />
              }
              type='clear'
            />
          )
        }
        else{
          return(
            <Button
              icon={
                <Icon
                  name="check-circle"
                  size={24}
                  color="green"
                />
              }
              type='clear'
            />
          )}
        }
      }
      leftAvatar={{ source: { uri: item.discount_image !== '' ? item.discount_image : default_uri }, overlayContainerStyle : styles.fondAvatar }}
      bottomDivider
      chevron
    />
  );

    if (promotions === undefined) {
      return(
        <View style={styles.container}>
          <Text>
            Aucune promotion à afficher
          </Text>
        </View>
      )
    }
    return (
      <FlatList
        keyExtractor={keyExtractor}
        data={promotions}
        renderItem={renderItem}
      />
    )

}
