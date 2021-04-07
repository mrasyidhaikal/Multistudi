import * as React from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity,TextInput, StatusBar,ScrollView, RefreshControl } from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Style from './../../Style/Style'


class RegisDataSiswa extends React.Component{
    
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
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
            </View>
            <View style={Style.inputContainer}>
            <TextInput
                    style={Style.input}
                    placeholder={'Jurusan'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
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
            <TextInput
                    style={Style.input}
                    placeholder={'Agama'}
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
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                />
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

        <View style={Style.ContainerViewHorizontalSpace}>
            <TouchableOpacity style={Style.buttonBlank}>
              <View style={{flexDirection:'row'}}>
                  <Icon name={'ios-chevron-back-sharp'} size={20} color={'#000'}/>
                  <Text style={Style.textNormalBlack}>Sebelumnya</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Style.buttonBlank} onPress={() => navigation.navigate('RegisDataWali')}>
            <View style={{flexDirection:'row'}}>
              <Text style={Style.textNormalBlack}>Selanjutnya</Text>
              <Icon name={'ios-chevron-forward-sharp'} size={20} color={'#000'}/>
              </View>
            </TouchableOpacity>
        </View>

 
            
       </ScrollView>
        </SafeAreaView>  
        <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      </View>
      
    )
   
    }

}

  export default RegisDataSiswa





  
