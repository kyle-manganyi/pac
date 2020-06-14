import * as React from 'react'
<<<<<<< HEAD
import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native'
import SmallVidePreview from '../SmallVideoPreview/SmallVideoPreview'

const image = { uri: "https://reactjs.org/logo-og.png" }

const SmallScrollList = ({ navigation }) => {
=======
import {View, ScrollView} from 'react-native'

import SmallVidePreview from '../SmallVideoPreview/SmallVideoPreview'

const SmallScrollList = () => {
>>>>>>> 8ea634aa12dc784aea07a79cd28c4f8e8c4d9178
    return (
        <ScrollView>
            <TouchableOpacity style={{paddingVertical: 12,}} onPress={() => navigation.navigate('player')}><SmallVidePreview /></TouchableOpacity>
                <View style={{borderBottomWidth: .7, borderBottomColor:"white"}}/>
            <TouchableOpacity style={{paddingVertical: 12,}} onPress={() => navigation.navigate('player')}><SmallVidePreview /></TouchableOpacity>
                <View style={{borderBottomWidth: .7, borderBottomColor:"white"}}/>
            <TouchableOpacity style={{paddingVertical: 12,}} onPress={() => navigation.navigate('player')}><SmallVidePreview /></TouchableOpacity>
                <View style={{borderBottomWidth: .7, borderBottomColor:"white"}}/>
            <TouchableOpacity style={{paddingVertical: 12,}} onPress={() => navigation.navigate('player')}><SmallVidePreview /></TouchableOpacity>
                <View style={{borderBottomWidth: .7, borderBottomColor:"white"}}/>
            <TouchableOpacity style={{paddingVertical: 12,}} onPress={() => navigation.navigate('player')}><SmallVidePreview /></TouchableOpacity>
                <View style={{borderBottomWidth: .7, borderBottomColor:"white"}}/>
            <TouchableOpacity style={{paddingVertical: 12,}} onPress={() => navigation.navigate('player')}><SmallVidePreview /></TouchableOpacity>
        </ScrollView>
    )
}

export default SmallScrollList