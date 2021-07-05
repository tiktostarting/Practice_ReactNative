import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import * as screen from '../screens/index';

function Routes(){
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator initalRouteName='list_contact' screenOptions={{HeaderShown: false}}>
            <Stack.Screen name='list_contact' component={screen.contactList}  screenOptions={{HeaderShown: false}}/>
            <Stack.Screen name='add_contact' component={screen.contactAdd}  screenOptions={{HeaderShown: false}}/>
            <Stack.Screen name='contact_detail' component={screen.contactDetail}  screenOptions={{HeaderShown: false}}/>
        </Stack.Navigator>
    )
}

export default Routes;