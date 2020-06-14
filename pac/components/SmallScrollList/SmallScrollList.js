import * as React from 'react'
import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native'
import SmallVidePreview from '../SmallVideoPreview/SmallVideoPreview'

const image = { uri: "https://reactjs.org/logo-og.png" }

const SmallScrollList = ({ navigation }) => {
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