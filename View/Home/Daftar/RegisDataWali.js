import * as React from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity,TextInput, StatusBar,ScrollView, RefreshControl } from 'react-native';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Style from './../../Style/Style'


class RegisDataWali extends React.Component{
    
    constructor() {
        super()
       


        this.state = {
       
            refreshing: false,
            DateDisplay:"",
            DateDisplay2:"",
            displayFormat : "DD MMM YYYY",
           
        }
    }

    handleConfirm=(date)=>{
      this.setState({DateDisplay:date})
      this.setState({visibility:false})
      this.setState({TextInputDisableStatus:true})
    }
    handleConfirm2=(date)=>{
      this.setState({DateDisplay2:date})
      this.setState({visibility2:false})
      this.setState({TextInputDisableStatus:true})
    }
    onPressCancel=()=>{
        this.setState({visibility:false})
        this.setState({TextInputDisableStatus:true})
    }
    onPressCancel2=()=>{
        this.setState({visibility2:false})
        this.setState({TextInputDisableStatus:true})
    }
    onPressButton=()=>{
        this.setState({visibility:true})
        this.setState({TextInputDisableStatus:false})
    }
    onPressButton2=()=>{
      this.setState({visibility2:true})
      this.setState({TextInputDisableStatus:false})
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
            <TouchableOpacity style={Style.buttonBlueActive}>
              <Text style={Style.textNormalWhite}>Data Wali</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank} onPress={() => navigation.navigate('RegisHobi')}>
              <Text style={Style.textNormalGrey}>Hobi/Minat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank} onPress={() => navigation.navigate('RegisPrestasi')}>
              <Text style={Style.textNormalGrey}>Prestasi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank} onPress={() => navigation.navigate('RegisDataFoto')}>
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
                        <Picker.Item label="Ayah" value="ayah" />
                        <Picker.Item label="Ibu" value="ibu" />
                        <Picker.Item label="Kakak" value="kakak" />
                        <Picker.Item label="Adik" value="adik" />
                        <Picker.Item label="Paman" value="paman" />
                        <Picker.Item label="Bibi" value="hindu" />
                        <Picker.Item label="Orang Tua Asuh" value="orangtuaasuh" />
                    </Picker>
                </View>
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
                    placeholder={'Nomor HP'}
                    maxLength={13}
                    keyboardType="number-pad"
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
                    placeholder={'Pendidikan'}
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
                    placeholder={'Pekerjaan'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Alamat Pekerjaan'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
        </View>


        <View style={Style.ContainerViewBiasa}> 
            <Text style={Style.textBold}>Data Orang Tua/Wali 2</Text>

            <View style={Style.inputContainer}>
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
                        <Picker.Item label="Ayah" value="ayah" />
                        <Picker.Item label="Ibu" value="ibu" />
                        <Picker.Item label="Kakak" value="kakak" />
                        <Picker.Item label="Adik" value="adik" />
                        <Picker.Item label="Paman" value="paman" />
                        <Picker.Item label="Bibi" value="hindu" />
                        <Picker.Item label="Orang Tua Asuh" value="orangtuaasuh" />
                    </Picker>
                </View>
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
                    placeholder={'Nomor HP'}
                    maxLength={13}
                    keyboardType="number-pad"
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
                    onTouchStart={this.onPressButton2}
                    value={this.state.DateDisplay2 ? moment(this.state.DateDisplay2).format(this.state.displayFormat) : ''}
                />
                  
                  <DateTimePickerModal 
                  mode="date"
                  isVisible={this.state.visibility2} 
                  onConfirm={this.handleConfirm2} 
                  onCancel={this.onPressCancel2}/>
              </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Pendidikan'}
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
                    placeholder={'Pekerjaan'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Alamat Pekerjaan'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
        </View>
        <View style={Style.ContainerViewHorizontalSpace}>
            <TouchableOpacity style={Style.buttonBlank} onPress={() => navigation.navigate("RegisDataSiswa")}>
              <View style={{flexDirection:'row'}}>
                  <Icon name={'ios-chevron-back-sharp'} size={20} color={'#000'}/>
                  <Text style={Style.textNormalBlack}>Sebelumnya</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank} onPress={() => navigation.navigate('RegisHobi')}>
            <View style={{flexDirection:'row'}}>
              <Text style={Style.textNormalBlack}>Selanjutnya</Text>
              <Icon name={'ios-chevron-forward-sharp'} size={20} color={'#000'}/>
              </View>
            </TouchableOpacity>
        </View>

 
            </ScrollView>
        
               

 
            
      
        </SafeAreaView>  
      </View>
      
    )
   
    }

}

  export default RegisDataWali





  
