import * as React from 'react'
import {View, StyleSheet, ImageBackground, Text, ScrollView} from 'react-native'

import SmallVidePreview from '../SmallVideoPreview/SmallVideoPreview'

const image = { uri: "https://reactjs.org/logo-og.png" }

const SmallScrollList = () => {
    return (
        <ScrollView>
            <View style={{paddingVertical: 12,}}><SmallVidePreview /></View>
                <View style={{borderBottomWidth: .7}}/>
            <View style={{paddingVertical: 12,}}><SmallVidePreview /></View>
                <View style={{borderBottomWidth: .7}}/>
            <View style={{paddingVertical: 12,}}><SmallVidePreview /></View>
                <View style={{borderBottomWidth: .7}}/>
            <View style={{paddingVertical: 12,}}><SmallVidePreview /></View>
                <View style={{borderBottomWidth: .7}}/>
            <View style={{paddingVertical: 12,}}><SmallVidePreview /></View>
                <View style={{borderBottomWidth: .7}}/>
            <View style={{paddingVertical: 12,}}><SmallVidePreview /></View>
        </ScrollView>

    )
}

export default SmallScrollList

const styles = StyleSheet.create({

})