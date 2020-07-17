import React from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { default_uri } from '../constants/link'
import { AuthContext } from '../navigation/Authentification';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './Login';

export function Profile() {

  const { signOut } = React.useContext(AuthContext);
  const handleDeconnexion = () => {
    signOut();
  };
  return (
    <View style={styles.container}>



      <Image source={{ uri: default_uri}} style={{ width: 250, height: 150, marginBottom: 100 }} />

      <TouchableOpacity
        onPress={handleDeconnexion}
        style={{ width: '70%', height: 45 }}>
        <LinearGradient
          colors={['#3366CC','#43D4FF', '#2974DA']}
          start={[1, 1]}
          end={[0, 0]}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
          <Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 15,
              color: '#fff',

            }}>
            Déconnexion
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
