import * as React from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity,TextInput, StatusBar,ScrollView, RefreshControl } from 'react-native';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Style from './../../Style/Style'


class RegisDataSiswa extends React.Component{
    
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
            <Text style={Style.headerText}>Registration</Text>
            </View>
         
        </View>

        <View style={Style.ContainerViewHorizontal}>
            <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={Style.buttonBlueActive}>
              <Text style={Style.textNormalWhite}>Data Siswa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank}>
              <Text style={Style.textNormalGrey}>Data Wali</Text>
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
            <Text style={Style.textBold}>Data Diri</Text>

            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Nomor Pendaftaran'}
                    editable={false}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
              <View style={Style.input}>
                <Picker
                  mode="dropdown"
                  style={{margin:-4}}
                  selectedValue={this.state.kodeJurusan}
                  placeholder="Pilih Jurusan"
                  placeholderTextColor={'#B2B5BF'}
                  underlineColorAndroid='transparent'
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({kodeJurusan: itemValue})
                  }>
                      <Picker.Item label="Rekayasa Perangkat Lunak" value="rpl" />
                      <Picker.Item label="Teknik Komputer dan Jaringan" value="tkj" />
                      <Picker.Item label="Akuntansi" value="akuntansi" />
                      <Picker.Item label="Seni Tari" value="senitari" />
                      <Picker.Item label="Multimedia" value="multimedia" />
                </Picker>
              </View>
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Nama Lengkap'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Nama Panggilan'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Jenis Kelamin'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            {/* <TextInput
                    style={Style.input}
                    placeholder={'Agama'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                /> */}

              <View style={Style.input}>
                  <Picker
                    mode="dropdown"
                    style={{margin:-4}}
                    selectedValue={this.state.kodeJurusan}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({Agama: itemValue})
                    }>
                      {/* <Picker.Item label="-Pilih Jurusan-" value="" enabled={false} /> */}
                      <Picker.Item label="Islam" value="islam" />
                      <Picker.Item label="Kristen" value="kristen" />
                      <Picker.Item label="Katolik" value="katolik" />
                      <Picker.Item label="Buddha" value="buddhas" />
                      <Picker.Item label="Hindu" value="hindu" />
                  </Picker>
              </View>
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Tempat Lahir'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
              <TextInput
                  style={Style.input}
                  placeholder={'Tanggal Lahir'}
                  placeholderTextColor={'#666872'}
                  underlineColorAndroid='transparent'
                  editable={this.state.TextInputDisableStatus}
                  pointerEvents="none"
                  selectTextOnFocus={false}
                  onTouchStart={this.onPressButton}
                  value={this.state.DateDisplay ? moment(this.state.DateDisplay).format(this.state.displayFormat) : ''}
              />
                
                <DateTimePickerModal 
                mode="date"
                isVisible={this.state.visibility} 
                onConfirm={this.handleConfirm} 
                onCancel={this.onPressCancel}/>
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Alamat'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    keyboardType="number-pad"
                    placeholder={'Nomor HP'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Email'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Sekolah Asal'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Alamat Sekolah Asal'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    keyboardType="number-pad"
                    placeholder={'Anak No.'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Jumlah Saudara'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
        </View>


       </ScrollView>
        </SafeAreaView>  
        <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      </View>
      
    )
   
    }

}

  export default RegisDataSiswa





  
