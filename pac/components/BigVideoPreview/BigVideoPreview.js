import React from 'react'
import { View,Text,ImageBackground,StyleSheet } from 'react-native'
import { Entypo,MaterialIcons }  from '@expo/vector-icons'

const image = { uri: "https://reactjs.org/logo-og.png" }

const BigVideoPreview = () => {
    return (
        <View style={styles.container}>
            <View style={styles.topview}>
                <ImageBackground source={image} style={styles.image}>
                    <Text style={styles.text}></Text>
                </ImageBackground>
            </View>

                <View style={styles.description}>
                    <View style={styles.details}>
                        <Text style={{width: '70%', fontWeight: '300',}}
                                    numberOfLines={2}>
                            Lorem ipsum dolor sit amet, consectetur olor sit amet, consectetur 
                        </Text>
                        <View style={styles.numbers}>
                            <Entypo name="heart" size={18} color="blue" 
                                style={{paddingHorizontal:1,}}/>
                            <Text style={{fontWeight: '300'}}> 1609</Text>
                            <MaterialIcons name="chat" size={18} color="black" 
                                style={{paddingHorizontal:6,}}/>
                            <Text style={{fontWeight: '300'}}>120</Text>
                        </View>
                    </View>

                    <View style={styles.poddetails}>
                        <Text style={styles.nums}>Pod ipsum dolor</Text>
                        <Text style={{paddingVertical: 2,}}>
                            <Text style={styles.nums}> 4.9M views </Text>
                            <Text> - </Text>
                            <Text style={styles.nums}> 5 Days Ago </Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default BigVideoPreview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        height: '100%'
    },
    topview: {
        height: '100%',
        flex: 5
    },
    image: {
      resizeMode: "cover",
      justifyContent: "center",
    },
    text: {
        color: "grey",
        fontSize: 30,
        fontWeight: "bold",
        height: '100%'
    },
    description:{
        paddingVertical: 14,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        flex: 1
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
    numbers: {
        fontSize:15,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    poddetails: {
        fontWeight: '100',
        fontSize: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        paddingVertical: 5,
        alignItems: 'center',
    },
    nums:{
        fontWeight: '200',
        fontSize: 12,
    }
  });