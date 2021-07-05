import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  StatusBar,
  TouchableOpacity,
  ActivityIndicator, 
  Image,
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
  // const [photo, setPhoto] = useState('')

  useFocusEffect(useCallback(() => {

    if(!Contacts.length || !Data.length){
        getContact().then(res => {
          dispatch(InitiateContacts(res.data))
          setData(res.data)
        })
      }
      setDisp(false)      
    }, [Contacts]))

    function selectedDetails(id){
      navigation.navigate('contact_detail',id)
    }
  
    return (

      <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Contact List</Text>                
            </View>

          {disp == false? 
            <FlatList
                    data={Data}
                    renderItem={({ item }) => 
                    <TouchableOpacity
                      onPress={() => selectedDetails(item.id)}
                    >
                      <View style={styles.item}>
                        <View style={styles.rightbox}>
                          <Text style={styles.txtlist}>
                           {item.firstName} {item.lastName} 
                          </Text>
                          <Text style={styles.txtlist}>
                            Age : {item.age} years
                          </Text> 
                        </View>                         
                        <View style={styles.leftbox}>
                          {item.photo != "N/A" ?
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.photo }}
                                />                    
                                :
                                <Image  
                                    style={styles.image}            
                                    source={require('../images/noimage.png')}
                                />
                          }
                        </View>
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
              <Text style={styles.txtbtn}>Add Contact</Text>
            </TouchableOpacity>
          </View> 
      </View>
    );
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    height: 50,
    borderBottomStartRadius:30,
    borderBottomEndRadius:30,
    backgroundColor: 'green',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
},
image: {
  width: 100,
  height: 100,
  borderRadius: 50,
  alignItems: 'center',
  // marginRight: 20
},
headerText: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 20
},  
  container:{
    flex: 1,
  },   
  progres:{
    flex: 1,
    justifyContent: "center"
  },
    item: {
        flex: 1,
        flexDirection: "row",
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'yellow'
  },
  leftbox:{
    flex: 1,
    alignItems: 'flex-end'
  },
  rightbox:{
    flex: 1,
    alignItems: 'flex-start'
  },
  txtlist:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow'
  }
})

export default contactList;
