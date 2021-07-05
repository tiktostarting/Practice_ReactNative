import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  StatusBar,
  TouchableOpacity,
  ActivityIndicator, 
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import {getContact} from '../services/getContact.service';
import { useDispatch, useSelector } from 'react-redux';
import { InitiateContacts } from '../redux/contact.action';
  
const contactList = () => {

  const dispatch = useDispatch()
  const Contacts = useSelector((state) => state.ContactReducer)
  const navigation = useNavigation()

  function AddContact() {
    navigation.navigate('add_contact')
  }
 
  const [Data, setData] = useState('')
  const [disp, setDisp] = useState(true)

  console.log(Data)
  
  useFocusEffect(useCallback(() => {

    if(!Contacts.length){
        getContact().then(res => {
          dispatch(InitiateContacts(res.data))
          setData(res.data)
          console.log(res.data)
        })
        setDisp(false)
      }
      console.log(Contacts)
    }, [Contacts]))

    function selectedDetails(id){
      navigation.navigate('contact_detail',id)
    }
  
    return (

      <View style={styles.container}>
          {disp == false? 
            <FlatList
                    data={Data}
                    renderItem={({ item }) => 
                    <TouchableOpacity
                      onPress={() => selectedDetails(item.id)}
                    >
                      <View>
                        <Text style={styles.item}>
                          {item.firstName} {item.lastName}
                        </Text> 
                      </View>
                    </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
            />
            :
            <View style={styles.progres}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>           
          }
          <View style={styles.btn}>
            <TouchableOpacity onPress={AddContact}  activeOpacity={0.8}>
              <Text style={styles.txtbtn}>Tambah Kontak</Text>
            </TouchableOpacity>
          </View> 
      </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },   
  progres:{
    flex: 1,
    justifyContent: "center"
  },
    item: {
        backgroundColor: 'green',
        padding: 30,
        marginVertical: 8,
        marginHorizontal: 15,
        fontSize: 22,
        borderRadius: 10,
        color: 'yellow'
    },
    btn: {
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      elevation: 8,
      backgroundColor: "green",
      borderRadius: 12,
      paddingVertical: 8,
      paddingHorizontal: 8,
      width: 250,
      height: 50,
  },
  txtbtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow'
  }    
})

export default contactList;
