import * as React from 'react';

import { StyleSheet,Dimensions } from 'react-native';
const { width: WIDTH} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
const black = '#000000'
const white = '#fff'
const greyText = '#B2B5BF'
const greyBorder = '#E7E9F1'
const backgroundBlue = '#3FA2F7'
const greenDone = '#06BFAD'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
     
      
    },
    textNormalBlack:{
        fontSize:16,
        color:black,
    },
    headerText:{
        fontSize:24,
        fontWeight:'bold',
        color:black,
    },
   textBold:{
       fontWeight:'bold',
       fontSize:20,
       color:black
   },
   buttonGhostText:{
       fontSize:16,
       fontWeight:'bold',
       color:greyText,
       textAlign:'center'
   },
   buttonGhost:{
       borderRadius:10,
       borderColor:greyText,
       backgroundColor:white,
       borderWidth:2,
       width: WIDTH-55,
       height:50,
       justifyContent:'center',

   },
   inputContainer:{
    marginTop:5,
    },
    input: {
        width: WIDTH-55,
        height:45,
        borderRadius:10,
        fontSize:16,
        paddingLeft:20,
        backgroundColor:white,
        color:greyText,
        marginHorizontal:25,
    },
    NavBackContainer : {
        marginLeft:20,
        marginTop:windowHeight / 20
    
    },
 
  });
  
;
export default styles