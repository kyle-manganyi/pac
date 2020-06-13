import { ScrollView,Text,ImageBackground,StyleSheet } from 'react-native'
import * as React from 'react'

import BigVideoPreview from '../components/BigVideoPreview/BigVideoPreview'

const VideoFeedScreen = () => {

    return (
        <React.Fragment>
            <ScrollView style={styles.topSection}>
                <BigVideoPreview/>
            </ScrollView>
        </React.Fragment>
    )
}

export default VideoFeedScreen

const styles = StyleSheet.create({

    topSection: {
        paddingHorizontal: 8,
        paddingVertical: 2
    }
})