import { View,ScrollView,Text,TouchableOpacity,StyleSheet } from 'react-native'
import * as React from 'react'
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import BigVideoPreview from '../components/BigVideoPreview/BigVideoPreview'

import SmallVidePreview from '../components/SmallVideoPreview/SmallVideoPreview'

const VideoFeedScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
             <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 15,
          marginTop: 40
        }}
      >
        <TouchableOpacity
        >
          <FontAwesome
            name={"list"}
            size={30}
            color={Colors.tabIconSelected}
          />
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 100,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.tabIconSelected
            }}
          >
            <FontAwesome name={"video-camera"} size={20} color={"#ffff"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#ffff",
              width: 100,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <FontAwesome
              name={"music"}
              size={20}
              color={Colors.tabIconSelected}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <FontAwesome
            name={"search"}
            size={30}
            color={Colors.tabIconSelected}
          />
        </TouchableOpacity>
      </View>
            <TouchableOpacity scrollEnabled={false}
                style={styles.topSection} onPress={() => navigation.navigate('player')}>
                <BigVideoPreview />
            </TouchableOpacity>
            <View  style={styles.bottomSection}>
            <View style={styles.alleps}>
                <Text style={{fontWeight: '300', color:"white", marginLeft:10}}>
                    All Episodes
                </Text>
                <View style={styles.gridformat}>
                    <Entypo name="list" size={20} style={{paddingHorizontal: 8, color:"white"}}/>
                </View>
            </View>
            <View style={{borderBottomWidth: .7, borderBottomColor:"white"}}/>
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
        flex:2,
        marginTop:15
    },
    bottomSection: {
        flex:2,
        backgroundColor:"black"
    },
    alleps: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    gridformat: {
        display: 'flex',
        flexDirection: 'row',
        // flex: 6
    },
    episodescroll: {
        // height: '100%'
        height: 400
    }
})