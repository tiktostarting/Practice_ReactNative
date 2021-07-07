import React, {useEffect, useState} from 'react'
import {View,Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Alert, ToastAndroid, ScrollView} from 'react-native'
import { useRoute } from '@react-navigation/native'
import {getContactId} from '../services/getContact.service'
import { useNavigation } from '@react-navigation/native'
import deleteContact from '../services/deleteContact.service'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteContact } from '../redux/contact.action';
import Icon from 'react-native-vector-icons/FontAwesome';



function contactDetail(){
    const route = useRoute()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const contacts = useSelector((state) => state.ContactReducer)

    const[firstname, setFirstname] = useState('')
    const[lastname, setLastname] = useState('')
    const[age, setAge] = useState('')
    const[photo, setPhoto] = useState()
    const[id, setId] = useState('')
    const[exe, setExe] = useState(true)

    function UpdateContact() {
        const contactStat = {
          msg: 'update',
          id: id
        }
        navigation.navigate('add_contact', contactStat)
    } 

    function backtoList(){
        navigation.navigate('list_contact')
    }
    
    function deletEContact(){
        Alert.alert(
            "hapus kontak?",
            "",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                    deleteContact(id).then(response => {
                        const showToast = (text) => {
                            ToastAndroid.show(text, ToastAndroid.SHORT)
                        }
                        if(response.message === "contact deleted"){
                            const contact = {
                                id: id
                            }
                            dispatch(DeleteContact(contact))
                            showToast(response.message)
                        }
                    }, (error) => {
                        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
                    })
                    }
                }
            ]
        )
    }

    useEffect(() => {
        getContactId(route.params).then(res => {
            setFirstname(res.data.firstName)
            setLastname(res.data.lastName)
            const age = res.data.age
            setAge(age.toString())
            setPhoto(res.data.photo)
            setId(res.data.id)
            setExe(false)
        })
    }, [route.params])

    return(
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.headerText}>Contact Detail</Text>                
            </View>

            <View>
                {exe == false? 
                        <View>
                            {photo != "N/A" ?
                                <Image
                                    style={styles.image}
                                    source={{ uri: photo }}
                                />                    
                                :
                                <Image  
                                    style={styles.image}            
                                    source={require('../images/noimage.png')}
                                />
                            }
                            <View style={styles.item}>
                                <View>
                                    <Text style={styles.txtlst}>First Name : {firstname}</Text>
                                </View>
                                <View>
                                    <Text style={styles.txtlst}>Last Name  : {lastname}</Text>            
                                </View>
                                <View>
                                    <Text style={styles.txtlst}>Age             : {age} years</Text>
                                </View>
                            </View>

                            <View>
                                <View>
                                    <TouchableOpacity disabled={exe} onPress={UpdateContact} style={styles.btn} activeOpacity={0.8}>
                                    <Icon   
                                            name="pencil"
                                            size={30} 
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                </View>   

                                <View>
                                    <TouchableOpacity disabled={exe} onPress={deletEContact} style={styles.btndel} activeOpacity={0.8}>
                                        <Icon   
                                            name="trash"
                                            size={30} 
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                </View> 

                                <View>
                                    <TouchableOpacity disabled={exe} onPress={backtoList} style={styles.btnbck} activeOpacity={0.8}>
                                        <Icon   
                                            name="arrow-left"
                                            size={30} 
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                </View> 

                            </View> 
                        </View>
                    :
                        <View style={styles.container}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View> 
                }                   
            </View>
        </ScrollView>
    )
}

export default contactDetail

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
        padding: 50
    },    
    image: {
        width: 150,
        height: 150,
        borderRadius: 50,
        alignItems: 'center',
        alignSelf: 'center'
        // marginRight: 20
    },    
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
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    txtbox: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    btn: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 20,
        elevation: 8,
        backgroundColor: "green",
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 8,
        width: 250,
        height: 45,
    },
    btndel: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 20,
        elevation: 8,
        backgroundColor: "red",
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 8,
        width: 250,
        height: 45,       
    }, 
    btnbck: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 20,
        elevation: 8,
        backgroundColor: "blue",
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 8,
        width: 250,
        height: 45,       
    },   
    txtlst: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: 'green',
        padding: 30,
        marginVertical: 8,
        marginHorizontal: 15,
        fontSize: 22,
        borderRadius: 10,
        color: 'white'
    },                
})