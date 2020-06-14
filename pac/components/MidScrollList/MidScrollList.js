import * as React from 'react'
import {StyleSheet,Text,View, ScrollView} from 'react-native'

import MidVideoPreview from '../midVideoPreview/midVideoPreview'

const MidScrollList = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={{flexDirection: 'row',flexWrap:'wrap',
                justifyContent: 'space-between',alignContent: 'space-between'}}>

                <View style={{width: '48%',height: 180, borderWidth: .7, }}>
                    <Text>Holla1</Text>
                </View>
                <View style={{width: '48%',height: 180, borderWidth: .7,}}>
                    <Text>Holla2</Text>
                </View>
                <View style={{width: '48%',height: 180, borderWidth: .7,}}>
                    <Text>Holla3</Text>
                </View>
                <View style={{width: '48%',height: 180, borderWidth: .7,}}>
                    <Text>Holla</Text>
                </View>
                <View style={{width: '48%',height: 180, borderWidth: .7}}>
                    <Text>Holla</Text>
                </View>
                <View style={{width: '48%',height: 180, borderWidth: .7}}>
                    <Text>Holla</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default MidScrollList

const styles = StyleSheet.create({
    
})