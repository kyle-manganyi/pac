import * as React from 'react'
import { StyleSheet, View,Text,ImageBackground } from 'react-native'
import moment from "moment";
import { FontAwesome, Entypo } from "@expo/vector-icons";


const TracklistPreview = (props) => {
    return (
        <View style={styles.container}>
            {/* <ImageBackground source={{uri: props.episode.poster}} style={styles.image}>
                <Text ></Text>
            </ImageBackground> */}

            <View style={styles.description}>
                <Text numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{fontWeight: '200',color:"#fff"}}>
                    {props.episode !== undefined ? props.episode.title:"blank"}
                </Text>
                <View style={styles.poddetails}>
                    <Text numberOfLines={1}
                        ellipsizeMode="tail" style={styles.nums}>{props.episode !== undefined ? props.episode.description:"blank"}</Text>
                    <Text style={{paddingVertical: 2,}}>
                    <Text style={styles.nums}> {props.episode.views} views </Text>
                    <Text> - </Text>
                    <Text style={styles.nums}>{moment(props.episode.date).format("DD MMM YYYY")} </Text> 
                </Text>
                </View>
                
            </View>
            <Text style={styles.duration}>
            <FontAwesome
              name={"play-circle-o"}
              size={30}
            />
            </Text>
        </View>
    )
}

export default TracklistPreview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        height: '100%',
        marginTop: 10,
        height:75
    },
    image: {
      resizeMode: "cover",
      justifyContent: "center",
      flex: 2
    },
    text: {
        color: "grey",
        fontSize: 30,
        fontWeight: "bold",
        height: '100%',
        color:"#fff"
    },
    description: {
        flex: 4,
        paddingLeft: 8,
        alignSelf: 'center',
        color:"#fff"
        // flexDirection: 'row'
    },
    duration: {
        flex: 1,
        fontWeight: '100',
        fontSize: 15,
        alignSelf: 'center',
        color:"#fff",
        marginLeft: 15
    },
    poddetails: {
        fontWeight: '100',
        fontSize: 40,
        color:"#fff",
        // flexDirection: 'row',
        // alignItems: 'stretch'
    },
    nums: {
        fontWeight: '200',
        fontSize: 10,
        color: "#fff"
        // alignItems: 'baseline'
    }

})