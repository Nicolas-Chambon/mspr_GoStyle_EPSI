import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Image, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './Login';
import { postRegister } from '../api/user';
import { LinearGradient } from 'expo-linear-gradient';
import { stylesButton } from '../constants/styles';
import { default_uri } from '../constants/link';

const Registered = () => {
  return (
    <View style={styles.container}>
      <Text>Veuillez confirmer votre adresse mail avant de vous connecter.</Text>
    </View>
  );
};

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [registerError, setRegisterError] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegistration = async () => {
    try {
      const register = await postRegister({
        email: email,
        password1: password1,
        password2: password2
      });
      if (typeof (register) === 'string' && register.includes('Success')) {
        setRegistered(true);
      } else {
        setRegisterError(true);
      }
    } catch (err) {
      setRegisterError(true);
      console.log(err);
    }
  };

  if (!registered)
    return (
      <View style={styles.container}>
        <Image source={{ uri: default_uri}} style={{ width: 250, height: 150 }} />
        <Input
          inputContainerStyle={styles.MyInput}
          placeholder='E-mail'
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={
            <Icon
              name='envelope'
              size={20}
              color='grey'
              style={styles.icon}
            />
          } />
        <Input
          inputContainerStyle={styles.MyInput}
          placeholder='Mot de passe'
          secureTextEntry={true}
          value={password1}
          onChangeText={(text) => setPassword1(text)}
          leftIcon={<Icon
            name='lock'
            size={28}
            color='grey'
            style={styles.icon}
          />}
        />
        <Input
          inputContainerStyle={styles.MyInput}
          placeholder='Mot de passe'
          secureTextEntry={true}
          value={password2}
          onChangeText={(text) => setPassword2(text)}
          leftIcon={<Icon
            name='lock'
            size={28}
            color='grey'
            style={styles.icon}
          />}
        />
        {registerError ? <Text style={{ color: 'red', marginTop: 15 }}>{"Erreur lors de l'inscription, veuillez réessayer !"}</Text> : null}
        <TouchableOpacity
          onPress={handleRegistration}
          style={{ width: '70%', height: 45, marginTop: 30 }}>
          <LinearGradient
            colors={['#3366CC', '#43D4FF', '#2974DA']}
            start={[1, 1]}
            end={[0, 0]}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
            <Text
              style={{
                backgroundColor: 'transparent',
                fontSize: 15,
                color: '#fff',

              }}>
              Inscription
          </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  else return <Registered />
};
