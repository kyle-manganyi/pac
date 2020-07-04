import { View,ScrollView,Text,TouchableOpacity,StyleSheet, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import * as React from 'react'
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Searchbar from "../components/searchbar/testSearch";

import BigVideoPreview from '../components/BigVideoPreview/BigVideoPreview'

import SmallVidePreview from '../components/SmallVideoPreview/SmallVideoPreview'

const VideoFeedScreen = ({navigation}) => {

    const [episodes, setEpisodes] = React.useState(null);
    React.useEffect(() => {
      fetch(`https://kpopapi.herokuapp.com/api/episode`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(result => setEpisodes(result))
        .catch(err => {
          return console.log("not now  " + err);
        });
    }, []);

    return (
      <View style={{flex:1}}>
        {episodes === null ?
        null:
        <View style={styles.container}>
        <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 15,
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
        <TouchableOpacity onPress={() => navigation.navigate("search")} >
          <FontAwesome
            name={"search"}
            size={30}
            color={Colors.tabIconSelected}
          />
        </TouchableOpacity>
      </View>
     <TouchableOpacity scrollEnabled={false}
         style={styles.topSection} onPress={() => navigation.navigate("player", {episde:episodes[0],episodes:episodes})}>
         <BigVideoPreview episode={episodes[0]} />
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
       {episodes ?
         episodes.map(e => (
           <TouchableOpacity
           key={e.id}
             onPress={() => navigation.navigate("player", {episde:e,episodes:episodes})}
           >
             {e !== undefined || {} ? <SmallVidePreview episode={e} /> : null}
           </TouchableOpacity>
         )):  <ActivityIndicator
         style = {{marginLeft:100}}
         animating = {true}
         color = '#bc2b78'
         size = "large"/>
         }
     </ScrollView>
     </View>
 </View>
      }
      </View>
    )
}

export default VideoFeedScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        display: 'flex',
        marginTop:40
    },
    topSection: {
        backgroundColor: 'white',
        flex:2,
        marginTop:15,
        marginBottom:10,
        paddingHorizontal: 8,
    },
    bottomSection: {
        flex:2,
        backgroundColor:"black",
        marginHorizontal:8
        
    },
    alleps: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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