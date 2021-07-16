import React, { useEffect } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  ActivityIndicator, 
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { ClearContacts, InitiateContacts } from '../redux/actions/contact.action';
  
const contactList = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const data = useSelector(state => state.contactReducer.data)
  const loading = useSelector(state => state.contactReducer.loading)
  const error = useSelector(state => state.contactReducer.error)
  
  function AddContact() {
    navigation.navigate('add_contact')
  }
 
  useEffect(() => {
    if(!data.length){
      dispatch(InitiateContacts())
    }
  }, [data])

    function selectedDetails(id){
      navigation.navigate('contact_detail',id)
    }

    function refreshList(){
      dispatch(ClearContacts())
    }
    
    return (

      <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Contact List</Text>                
            </View>

            {/* <View>
                {error ? <Text>{error}</Text> : null}
            </View> */}

          {!loading ? 
            <FlatList
                    data={data}
                    renderItem={({ item }) => 
                    <TouchableOpacity
                      onPress={() => selectedDetails(item.id)}
                    >
                      <View style={styles.item}>
                        <View style={styles.leftbox}>
                          <Text style={styles.txtlist}>
                           {item.firstName} {item.lastName} 
                          </Text>
                          <Text style={styles.txtlist}>
                              {item.age} years old
                          </Text> 
                        </View>                         
                        <View style={styles.rightbox}>
                          {item.photo != "N/A" || !item.photo ?
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
          <View style={styles.fitbtn}>
            <View style={styles.btn}>
              <TouchableOpacity onPress={AddContact} style={styles.addbtn} disabled={loading} activeOpacity={0.8}>
                {/* <Text style={styles.txtbtn}>Add Contact</Text> */}
                <Icon   
                        name="plus"
                        size={30} 
                        color="white"
                    />
              </TouchableOpacity>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity onPress={refreshList} style={styles.rldbtn} disabled={loading} activeOpacity={0.8}>
                <Icon   
                        name="refresh"
                        size={30} 
                        color="white"
                    />
              </TouchableOpacity>              
            </View>
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
    color: 'white',
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
        padding: 7,
        marginVertical: 4,
        marginHorizontal: 16,
        fontSize: 22,
        borderRadius: 10,
        color: 'yellow'
    },
    btn: {
      // alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      marginHorizontal: 0,
      elevation: 8,
      paddingVertical: 8,
      paddingHorizontal: 0,
      // width: 80,
      height: 50,
  },
  txtbtn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'yellow'
  },
  rightbox:{
    flex: 1,
    alignItems: 'center'
  },
  leftbox:{
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: 'center'
  },
  txtlist:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  addbtn:{
    alignItems: 'center',
    marginHorizontal: 15,
    width: 170,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 12,
    justifyContent: 'center',
  },
  rldbtn:{
    alignItems: 'center',
    marginHorizontal: 15,
    width: 170,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 12,
    justifyContent: 'center',
  },
  fitbtn:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default contactList;
