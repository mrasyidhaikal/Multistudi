import * as React from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity,TextInput, StatusBar,ScrollView, RefreshControl } from 'react-native';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Style from '../../Style/Style'


class RegisSelesai extends React.Component{
    
    constructor() {
        super()
       


        this.state = {
       
            refreshing: false,
            kodeJurusan:"",
            agama:"",
            displayFormat:"DD MMM YYYY"
           
        }
    }

    handleConfirm=(date)=>{
      this.setState({DateDisplay:date})
      this.setState({visibility:false})
      this.setState({TextInputDisableStatus:true})
    }
    onPressCancel=()=>{
        this.setState({visibility:false})
        this.setState({TextInputDisableStatus:true})
    }
    onPressButton=()=>{
        this.setState({visibility:true})
        this.setState({TextInputDisableStatus:false})
    }

    render(){
    
      const { navigation } = this.props;
    return(
    
        <View style={Style.container}>
        <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
            
        >
        <View style={Style.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={'ios-chevron-back-sharp'} size={25} color={'#000'}/>
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={Style.headerText}>Registrasi</Text>
            </View>
         
        </View>

        <View style={Style.ContainerViewHorizontal}>
            <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={Style.buttonBlank} onPress={() => navigation.navigate('RegisDataSiswa')}>
              <Text style={Style.textNormalGrey}>Data Siswa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank} onPress={() => navigation.navigate('RegisDataWali')}>
              <Text style={Style.textNormalGrey}>Data Wali</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank} onPress={() => navigation.navigate('RegisHobi')}>
              <Text style={Style.textNormalGrey}>Hobi/Minat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank}  onPress={() => navigation.navigate('RegisPrestasi')}>
              <Text style={Style.textNormalGrey}>Prestasi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank} onPress={() => navigation.navigate('RegisDataFoto')}>
              <Text style={Style.textNormalGrey}>Dokumen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlueActive}>
              <Text style={Style.textNormalWhite}>Selesai</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
        
        <View style={Style.ContainerViewBiasa}>
          <Image style={{alignSelf:"center",marginVertical:70}} source={require("./../../../assets/successfully_illustration.png")}/>
          <Text style={[Style.textBold,{alignSelf:"center",marginTop:30}]}>Terima Kasih Telah Mendaftar</Text>
          <Text style={{alignSelf:"center"}}>Tunggu Konfirmasi Selanjutnya</Text>
          <Text style={{alignSelf:"center"}}>Via Email</Text>
        </View>

        <View style={[Style.ContainerViewHorizontalSpace,{alignSelf:"center"}]}>
           <TouchableOpacity style={Style.buttonGhost} onPress={() => navigation.navigate('Home')}>
             <Text style={Style.buttonGhostText}>Tutup</Text>
           </TouchableOpacity>
        </View>
       </ScrollView>
        </SafeAreaView>  
        <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      </View>
      
    )
   
    }

}

  export default RegisSelesai





  
