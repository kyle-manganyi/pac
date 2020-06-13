import * as React from 'react'
import { View, Text ,StyleSheet, ScrollView } from 'react-native'
import { Entypo,FontAwesome }  from '@expo/vector-icons'

import BigVideoPreview from '../BigVideoPreview/BigVideoPreview'

const EpisodeListBig = () => {
    return (
        <View>
            <View style={styles.alleps}>
                <Text style={{fontWeight: '300',}}>
                    All Episodes
                </Text>
                <View style={styles.gridformat}>
                    <Entypo name="list" size={20} style={{paddingHorizontal: 8,}}/>
                    <FontAwesome name="square" size={20}/>
                </View>
            </View>

            <ScrollView >
                <View>
                    <BigVideoPreview style={{paddingVertical: 18}}/>
                </View>
                <BigVideoPreview />
                {/* <BigVideoPreview />
                <BigVideoPreview />
                <BigVideoPreview /> */}
            </ScrollView>
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
    }
})