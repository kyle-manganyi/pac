import * as React from 'react'
import { StyleSheet, View,Text,ImageBackground } from 'react-native'

const image = { uri: "https://reactjs.org/logo-og.png" }

const SmallVidePreview = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <Text style={styles.text}></Text>
            </ImageBackground>

            <View style={styles.description}>
                <Text style={{fontWeight: '200',color:"#fff"}}>
                    Lorem ipsum dolor sit amet, consectetur
                </Text>
                <View style={styles.poddetails}>
                    <Text style={styles.nums}>Pod ipsum dolor</Text>
                    <Text style={{paddingVertical: 2,}}>
                    <Text style={styles.nums}> 4.9M views </Text>
                    <Text> - </Text>
                    <Text style={styles.nums}> 5 Days Ago </Text> 
                </Text>
                </View>
            </View>
            <Text style={styles.duration}>
                45.59
            </Text>
            <View style={{borderBottomWidth: .7}}/>
        </View>
    )
}

export default SmallVidePreview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        height: '100%'
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
        color:"#fff"
    },
    poddetails: {
        fontWeight: '100',
        fontSize: 40,
        color:"#fff"
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