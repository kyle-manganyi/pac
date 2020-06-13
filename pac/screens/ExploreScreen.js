import { View,ScrollView,Text,ImageBackground,StyleSheet } from 'react-native'
import * as React from 'react'

import BigVideoPreview from '../components/BigVideoPreview/BigVideoPreview'

import EpisodeListBig from '../components/EpisodeList/EpisodeListBig'

const VideoFeedScreen = () => {

    return (
        <View style={styles.container}>
            <View scrollEnabled={false}
                style={styles.topSection} >
                <BigVideoPreview />
            </View>
            <View  style={styles.bottomSection}>
                <EpisodeListBig />
            </View>
        </View>
    )
}

export default VideoFeedScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        display: 'flex',
        paddingHorizontal: 8,
        flexDirection: 'column'
    },
    topSection: {
        backgroundColor: 'white',
        flex:2
    },
    bottomSection: {
        flex:2
    }
})