import * as React from 'react'
import {View, ScrollView} from 'react-native'

import SmallVidePreview from '../SmallVideoPreview/SmallVideoPreview'

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