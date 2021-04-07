import * as React from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity,TextInput, StatusBar,ScrollView, RefreshControl } from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Style from './../../Style/Style'


class RegisDataWali extends React.Component{
    
    constructor() {
        super()
       


        this.state = {
       
            refreshing: false,
           
        }
    }



    render(){
    
      const { navigation } = this.props;
    return(
    
        <View style={Style.container}>
        <SafeAreaView>
            <ScrollView>
            <View style={Style.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={'ios-chevron-back-sharp'} size={25} color={'#000'}/>
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={Style.headerText}>Registration</Text>
            </View>
         
        </View>

        <View style={Style.ContainerViewHorizontal}>
            <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={Style.buttonBlank}>
              <Text style={Style.textNormalGrey}>Data Siswa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlueActive}>
              <Text style={Style.textNormalWhite}>Data Wali</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank}>
              <Text style={Style.textNormalGrey}>Hobi/Minat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank}>
              <Text style={Style.textNormalGrey}>Prestasi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank}>
              <Text style={Style.textNormalGrey}>Dokumen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank}>
              <Text style={Style.textNormalGrey}>Selesai</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
        
        <View style={Style.ContainerViewBiasa}> 
            <Text style={Style.textBold}>Data Orang Tua/Wali 1</Text>

            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Hubungan Keluarga'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Nama Wali'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Homor HP'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Alamat Tempat Tinggal'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
        </View>

            </ScrollView>
        
               

 
            
      
        </SafeAreaView>  
      </View>
      
    )
   
    }

}

  export default RegisDataWali





  
