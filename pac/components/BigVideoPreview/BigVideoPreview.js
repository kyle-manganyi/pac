import React from 'react'
import { View,Text,ImageBackground,StyleSheet } from 'react-native'
import { FontAwesome, Entypo,MaterialIcons }  from '@expo/vector-icons'

const image = { uri: "https://reactjs.org/logo-og.png" }

const BigVideoPreview = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <Text style={styles.text}>Play</Text>
            </ImageBackground>
            <View style={styles.description}>
                <Text>Lorem ipsum dolor sit amet, consectetur</Text>
                <Text style={styles.details}>
                    <Text style={styles.numbers}><Entypo name="heart" size={20} color="blue" />1609</Text>
                    <Text style={styles.numbers}><MaterialIcons name="chat" size={20} color="black" />120</Text>
                </Text>
            </View>
        </View>
    )
}

export default BigVideoPreview

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      height: 250
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    text: {
      color: "grey",
      fontSize: 30,
      fontWeight: "bold",
      alignItems: 'center'
    },
    numbers: {
        fontSize:15,
        display: 'flex',
        alignItems: 'stretch',
        paddingHorizontal: 0
    },
    details: {
        display: 'flex'
    },
    description:{
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between'
    }
  });