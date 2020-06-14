import * as React from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'

const LoginScreen = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Sign in</Text>
        
            <View style={styles.loginform}>
                <TextInput style={styles.input}/>
                <TextInput style={styles.input}/>   
            </View>
            <TouchableOpacity style={{marginTop: 24,}}>
                <View style={styles.btnlogin}>
                    <Text style={styles.btntext}>Sing in</Text>
                </View>
            </TouchableOpacity>
            <View style={{paddingTop: 18, paddingLeft: 18, fontWeight: '300'}}>
                <Text>forgot password? click here</Text>
            </View>
            <View style={{paddingTop: 18, paddingLeft: 18, fontWeight: '300'}}>
                <Text>don't have an account? Signup</Text>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 20,
        paddingVertical: 140
    },
    loginform:{
        paddingHorizontal: 12,
    },
    heading: {
        textAlign:'center',
        fontSize: 40,
        fontWeight: '400',
        paddingVertical: 8
    },
    input: {
        padding: 12,
        height: 55, 
        borderColor: 'lightgray', 
        borderWidth: 2,
        fontSize: 24,
        fontWeight: '200',
        textAlignVertical: 'center',
        marginVertical: 4,
        borderRadius: 5,
    },
    btnlogin: {
        borderWidth: 1,
        borderRadius: 5,
        
    },
    btntext: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        padding: 12,
        backgroundColor: 'gray',
        color: '#f2f2f2'
    }
})