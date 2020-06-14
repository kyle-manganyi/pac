import * as React from 'react'
import { View, Text ,StyleSheet, ScrollView } from 'react-native'
import { Entypo,FontAwesome }  from '@expo/vector-icons'

import BigScrollList from '../BigScrollList/BigScrollList'
import SmallScrollList from '../SmallScrollList/SmallScrollList'
import MidScrollList from '../MidScrollList/MidScrollList'

const EpisodeListBig = () => {
    return (
        <View style={{flex: 1}}>
            <View style={styles.alleps}>
                <Text style={{fontWeight: '300',}}>All Episodes </Text>
                <View style={styles.gridformat}>
                    <Entypo name="list" size={20} style={{paddingHorizontal: 8,}}/>
                    <FontAwesome name="square" size={20}/>
                </View>
            </View>

            {/* <BigScrollList style={{flex:1}}/> */}
            {/* <SmallScrollList style={{flex:1}} /> */}
            <MidScrollList style={{flex:1}} />
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
    },
    episodescroll: {
        height: 400
    }
})