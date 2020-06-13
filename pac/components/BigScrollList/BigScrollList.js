import * as React from 'react'
import BigVideoPreview from '../BigVideoPreview/BigVideoPreview'
import { ScrollView, StyleSheet,View } from 'react-native'

const BigScrollList = () => {
    return (
        <ScrollView>
            <View style={styles.videopreview}><BigVideoPreview/></View>
            <View style={styles.videopreview}><BigVideoPreview /></View>
            <View style={styles.videopreview}><BigVideoPreview /></View>
            <View style={styles.videopreview}><BigVideoPreview /></View>
        </ScrollView>
    )
}

export default BigScrollList

const styles = StyleSheet.create({
    videopreview: {
        height: 500
    }
})