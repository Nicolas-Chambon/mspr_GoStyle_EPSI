import { Button, CheckBox, Card } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { stylesButton, stylesDetail } from '../constants/styles';
import { default_uri } from '../constants/link'

import {
    Text,
    View,
    Clipboard,
    ImageBackground,
    ScrollView, TouchableOpacity,

} from 'react-native';
import { getDiscountAssociation, updateDiscount } from '../api/discount';
import { LinearGradient } from 'expo-linear-gradient';
import { DEFAULT_BLUE } from '../constants/Colors';

export function Detail({ route }) {
    const [used, setUsed] = useState(false);
    const [promo, setPromo] = useState({});
    const [date, setDate] = useState('');
    const { promo_id } = route.params;
    const { user_id } = route.params;

    useEffect(() => {
        getDiscountAssociation(promo_id, user_id).then((monJson) => {
            if (typeof (monJson) === 'string' && monJson.includes('Bad request')) {
                alert("Promotion Indisponible");
            }
            else {
                setPromo(monJson.data);
                setDate(monJson.data.discount_expiration.substring(0, 10));
                setUsed(monJson.data.used);
                console.log(monJson.data.discount_image)
            }
        }).catch((err) => console.log(err));
    }, []);

    const handleUsed = () => {
        updateDiscount({ id_user: user_id, id_discount: promo_id, used: !used })
            .then(setUsed(!used))
            .catch((err) => console.log(err));
    };

    return (
        <View style={stylesDetail.container}>
            <View style={stylesDetail.box}>
                <ImageBackground source={{uri : promo.discount_image === 'http://tsukiru.ddns.net/images/global.png' ? default_uri : promo.discount_image}} style={{ width: '100%', height: '100%' }} />
            </View>
            <ScrollView>
                <Card
                  title={promo.discount_brand}
                  containerStyle={{ borderRadius: 10, borderColor: DEFAULT_BLUE }}
                >
                    <Text style={stylesDetail.descriptionTitle}>Description</Text>
                    <Text style={{ marginBottom: 30 }}>
                        {promo.discount_description}
                    </Text>
                    <Text style={stylesDetail.namePromo}>{promo.discount_name}</Text>
                    <View style={stylesDetail.specialContainer}>
                        <Icon style={{marginLeft: 20}} name="location-arrow" size={15} color="black" />
                        <Text style={{marginRight: 30}}>{promo.discount_city}</Text>
                        <Icon name="calendar" size={15} color="black" />
                        <Text style={{marginRight: 20}}>{date}</Text>
                    </View>
                </Card>
                <TouchableOpacity style={{ width: '67%',  marginTop: 20, alignSelf: 'center'}}
                                  onPress={() => {Clipboard.setString(promo.discount_city); alert('Copié dans le presse papier')}}>

                        <Button
                          style={{ borderColor: DEFAULT_BLUE, borderWidth: 1, borderRadius: 5, margin: 3, backgroundColor: "white"}}
                          icon={<Icon name="tag" size={20} color="black" style={stylesDetail.icon} />}
                          type='outline'
                          onPress={() => { Clipboard.setString(promo.discount_city); alert('Copié dans le presse papier') }}
                          title={promo.discount_link} />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '70%',  marginTop: 20, alignSelf: 'center'}}>
                        <CheckBox
                          center
                          title='Utilisé'
                          checked={used}
                          onPress={handleUsed}
                          containerStyle={{ borderColor: DEFAULT_BLUE, borderWidth: 1, borderRadius: 5, backgroundColor: "white"}}
                        />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

