import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { postLogin } from '../api/user';
import { AuthContext } from '../navigation/Authentification';
import { Image } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { stylesButton } from '../constants/styles';
import { DEFAULT_BLUE } from '../constants/Colors';
import { default_uri } from '../constants/link';

export function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const { signIn } = React.useContext(AuthContext);


  const handleConnexion = async () => {
    try {
      const login = await postLogin({ email: email, password: password });
      if (typeof (login.token) === 'string' && login.token.includes('Bearer')) {
        const userId = login.id;
        signIn({ userId });
      } else {
        setLoginError(true);
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setLoginError(true);
      setEmail('');
      setPassword('');
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: default_uri}}  style={{ width: 250, height: 150 }} />
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
        value={password}
        onChangeText={(text) => setPassword(text)}
        leftIcon={<Icon
          name='lock'
          size={28}
          color='grey'
          style={styles.icon}
        />}
      />
      {loginError ? <Text style={{ color: 'red', marginTop: 15 }}>{"Email ou mot de passe invalide"}</Text> : null}

      <TouchableOpacity
        onPress={handleConnexion}
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
            Connexion
          </Text>
        </LinearGradient>
      </TouchableOpacity>





      <TouchableOpacity style={{ width: '70%',  marginTop: 30}}
      onPress={() => navigation.navigate('Inscription')}>
        <LinearGradient start={[0, 0.5]}
          end={[1, 0.5]}
          colors={['#3366CC',  '#43D4FF', '#2974DA']}
          style={{ borderRadius: 5 }}>
          <View style={stylesButton.circleGradient}>
            <Text style={stylesButton.visit}>Créer un compte</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>



    </View>
  );

}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: DEFAULT_BLUE,
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'blue',
    fontSize: 11
  },
  loginBtn: {
    width: '80%',
    backgroundColor: DEFAULT_BLUE,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  Signup: {
    color: 'blue',
    marginTop: 20
  },
  MyInput: {
    width: '70%',
    marginTop:20,
    marginLeft: 50
  },
  icon: {
    marginRight: 10
  }
});
