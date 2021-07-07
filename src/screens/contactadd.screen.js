import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState} from 'react';
import { View, StyleSheet, TextInput, ScrollView , StatusBar, Text, ToastAndroid, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import postContact from '../services/postContact.service';
import putContact from '../services/putContact.service';
import contactValidation from '../validations/contact.validation';
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import {AddContacts, UpdateContacts, ClearContacts } from '../redux/contact.action'

function addContact() {

    const [id, setId] = useState('')
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [status, setStatus] = useState('create')
    const [age, setAge] = useState('');
    const [imageurl, setImageurl] = useState('');
    const [lanjut, setLanjut] = useState(false);
    const [photo, setPhoto] = useState('N/A');   
    const contacts = useSelector((state) => state.ContactReducer)

    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    useEffect(() => {
        if(route.params && route.params.msg === 'update'){
            const contactTarget = contacts.find(contact => contact.id === route.params.id)
            setId(contactTarget.id)
            setFirstname(contactTarget.firstName)
            setLastname(contactTarget.lastName)
            const age = contactTarget.age
            setAge(age.toString())
            setImageurl(contactTarget.photo)
            setPhoto(contactTarget.photo)
            setStatus(route.params.msg)
        }
    },[route.params])

    function validation(){

        let messageError = contactValidation(firstname, lastname, age, imageurl)
        dispatch(ClearContacts())
        if(!messageError && status === 'update'){
            navigateAndupdate()
        }else if(!messageError){
            navigateAndadd()
        }else{
            ToastAndroid.show(messageError, ToastAndroid.LONG);
        }
    }

    const chooseFile = (type) => {
        setLanjut(true)
        launchImageLibrary({}, async (response) => {
            if(response && response.assets){
                const asset = response.assets[0]
                const reference = storage().ref(`/photos/${asset.fileName}`);
                
                await reference.putFile(asset.uri)
                const url = await reference.getDownloadURL();
                setImageurl(url)
                setPhoto(url)
            }
        setLanjut(false)            
        })
    }
    
    function navigateAndadd(){
        const newContact = {
            firstName: firstname,
            lastName: lastname,
            age: age,
            photo: imageurl
        }
        postContact(newContact).then(response => {
            if(response.message === "contact saved"){
                dispatch(AddContacts(newContact))
                navigation.navigate('list_contact')
            }
        })
    }

    function navigateAndupdate(){
        const newContact = {
            firstName: firstname,
            lastName: lastname,
            age: age,
            photo: imageurl
        }
        putContact(newContact, id).then(response => {
            if(response.message === "Contact edited"){
                dispatch(UpdateContacts(newContact))
                navigation.navigate('list_contact')
            }
        })
    }

    const handleFirstname = (text) =>{
        setFirstname(text)
    }

    const handleLastname = (text) =>{
        setLastname(text)
    }

    const handleAge = (age) =>{
        setAge(age)
    }

    function backtoList(){
        navigation.navigate('list_contact')
        // if(status === 'update'){
        //     navigation.navigate('contact_detail',id)
        // }else{
        //     navigation.navigate('list_contact')
        // }
    }

    return(
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.headerText}>Contact Form</Text>
            </View>

            <ScrollView >
                <View style={styles.main}>

                    <View>
                        {lanjut == false ?
                            <View>
                                <TouchableOpacity disabled={lanjut} onPress={chooseFile} activeOpacity={0.8}>
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
                                    <Text style={styles.txtpic}> CHOOSE </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.container}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>                     
                        }    
                    </View>                

                    <View style={styles.box}>
                        <View>
                            <Text style={styles.txtbox}>First Name</Text>

                            <TextInput
                                style={styles.input}
                                onChangeText = {handleFirstname}
                                value={firstname}
                                placeholder="min 3 and max 30 char"
                            />
                        </View>
                    </View>                

                    <View style={styles.box}>             
                        <View>
                            <Text style={styles.txtbox}>Last Name</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText = {handleLastname}
                            value={lastname}
                            placeholder="min 3 and max 30 char"
                        />
                    </View>                

                    <View style={styles.box}>
                        <View>
                            <Text style={styles.txtbox}>Age</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText = {handleAge}
                            value = {age}
                            placeholder="number only"
                            keyboardType="numeric"
                        />
                    </View>
                </View>            
            </ScrollView> 
            <View>
                <View>
                    <TouchableOpacity disabled={lanjut} onPress={validation} style={styles.btn} activeOpacity={0.8}>
                        <Icon   
                            name="save"
                            size={30} 
                            color="white"
                        />
                    </TouchableOpacity>
                </View>   
                <View>
                    <TouchableOpacity disabled={lanjut} onPress={backtoList} style={styles.btnback} activeOpacity={0.8}>
                        <Text style={styles.txtbtn}>C</Text>
                    </TouchableOpacity>
                </View>                    
            </View>
  
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'whitesmoke'
    },
    container: {
        flex: 1,
        justifyContent: "center",
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
    box: {
        backgroundColor: 'green',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 15,
        fontSize: 22,
        borderRadius: 12,
        color: 'yellow'
    },   
    txtbox: {
        marginBottom: 6,
        marginHorizontal: 5,
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
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
    input: {
        height: 40,
        marginHorizontal: 5,
        borderWidth: 0,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    button: {
        flex: 1,
    },
    btn: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        elevation: 8,
        backgroundColor: "green",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 8,
        width: 250,
        height: 60
    },
    btnback: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        elevation: 8,
        backgroundColor: "red",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 8,
        width: 250,
        height: 60
    },
    txtbtn: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    txtpic: {
        position: 'absolute', 
        alignSelf: 'center', 
        color: 'yellow',
        fontWeight: 'bold',
        backgroundColor: 'grey'
    }
})

export default addContact