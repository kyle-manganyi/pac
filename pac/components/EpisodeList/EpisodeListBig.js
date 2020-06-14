import * as React from 'react'
import { View, Text ,StyleSheet, ScrollView } from 'react-native'
import { Entypo,FontAwesome }  from '@expo/vector-icons'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BigScrollList from '../BigScrollList/BigScrollList'
import SmallScrollList from '../SmallScrollList/SmallScrollList'

const EpisodeListBig = ({navigation}) => {
    return (
        <View style={{flex: 1}}>
            <View style={styles.alleps}>
                <Text style={{fontWeight: '300', color:"white", marginLeft:10}}>
                    All Episodes
                </Text>
                <View style={styles.gridformat}>
                    <Entypo name="list" size={20} style={{paddingHorizontal: 8, color:"white"}}/>
                </View>
            </View>
            <View style={{borderBottomWidth: .7, borderBottomColor:"white"}}/>
            {/* <BigScrollList style={{flex:1}}/> */}
            <SmallScrollList style={{flex:1}} />
        </View>
    )
}

export default EpisodeListBig

const styles = StyleSheet.create({
    alleps: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    gridformat: {
        display: 'flex',
        flexDirection: 'row',
        // flex: 6
    },
    episodescroll: {
        // height: '100%'
        height: 400
    }
})