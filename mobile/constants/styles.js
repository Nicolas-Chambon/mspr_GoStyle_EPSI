import {StyleSheet} from 'react-native'
import {DEFAULT_BLUE} from './Colors';

export const stylesButton = StyleSheet.create({


      visit: {

        paddingHorizontal: 6,
        textAlign:'center',
        padding:12,
        backgroundColor: "white",
        color: DEFAULT_BLUE,
        fontSize: 14,


      },

      circleGradient: {
        margin: 3,
        backgroundColor: "white",
        borderRadius: 5,
      },
});




export const stylesDetail = StyleSheet.create({


    namePromo:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
        marginBottom: 30,
    },

    container:{
        flex:1,
        // backgroundColor:DEFAULT_BLUE
    },
    specialContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    box: {

        backgroundColor: "white",
        width: '100%',
        height: '30%',

        borderColor: 'black',

    },
    avatar: {
        marginTop: 10,
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
    textNextToAvatar: {
        alignItems: "center"
    },
    Brand: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    },
    titlePromot: {
        fontSize: 20,
        color: DEFAULT_BLUE,
        marginTop: 10,
        fontWeight:'bold'
    },
    titlePromotView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderTopWidth: 1,
        borderColor:DEFAULT_BLUE
    },

    descriptionView: {
        margin: 10,
        flex: 6,
        marginTop: 10
    },
    descriptionTitle: {

        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'baseline',
        marginBottom: 5

    },
    icon: {
        marginRight: 10
    },
    textInfo: {
        fontWeight: "bold",
    },
    textInfoView:{
        borderBottomWidth:1,
        marginBottom:20
    },



}
);
