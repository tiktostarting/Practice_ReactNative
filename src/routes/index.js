import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import * as screen from '../screens/index';

function Routes(){
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator initalRouteName='list_contact'   screenOptions={{headerShown: false}}>
            <Stack.Screen name='list_contact' component={screen.contactList}/>
            <Stack.Screen name='add_contact' component={screen.contactAdd}/>
            <Stack.Screen name='contact_detail' component={screen.contactDetail}/>
        </Stack.Navigator>
    )
}

export default Routes;