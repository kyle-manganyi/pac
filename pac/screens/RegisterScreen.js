import * as React from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'


const fnRegister = (user,navigation) => {
    console.log(user.email)
    const url = `https://kpopapi.herokuapp.com/api/User/registeration`
    return (fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({  
            email: user.email,
            username: user.email,
            cellphone: '123456789',
            password: user.password
         })
        
      }) 
      .then(res => res.json())
        .then(result => {
            if (result) {
                console.log('ifikile', result)
                navigation.navigate('Home', result)
                // console.log('ifikile', result)
        } else {
            alett.style.display = 'block'
        }
    })
    .catch(err => {
        return (console.log('not now  ' + err))
    }))
}

const RegisterScreen = ({navigation}) => {

    const [fullname, onChangeFullname] = React.useState('')
    const [email, onChangeEmail] = React.useState('')
    const [password, onChangePassword] = React.useState('')
    const [confirm, onChangeConfirm] = React.useState('')

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create an Account</Text>
        
            <View style={styles.loginform}>
                <TextInput style={styles.input}
                    placeholder='Full Name'
                    onChangeText={text => onChangeFullname(text)}
                    value={fullname}
                />
                <TextInput style={styles.input}
                    placeholder='Email'
                    onChangeText={text => onChangeEmail(text)}
                    value={email}
                />  
                <TextInput style={styles.input}
                    secureTextEntry={true}
                    placeholder='Password'
                    onChangeText={text => onChangePassword(text)}
                    value={password}
                />
                <TextInput style={styles.input}
                    secureTextEntry={true}
                    placeholder='Confirm Password'
                    onChangeText={text => onChangeConfirm(text)}
                    value={confirm}
                />   
            </View>

            <View style={{paddingTop: 18, paddingLeft: 18,}}>
                <Text style={{fontWeight: '100', fontSize: 12}}>By creating an account, you agree to our Terms of Service and Privacy Policy
                </Text>
            </View>
            <TouchableOpacity style={{marginTop: 24,}}
                // onPress = {() =>console.log('send logins to get user obj')}
                onPress = {() => fnRegister({
                    email: email,
                    username: email,
                    cellphone: '123456789',
                    password: password
                }, navigation)}
            >
                <View style={styles.btnlogin}>
                    <Text style={styles.btntext}>Sign up</Text>
                </View>
            </TouchableOpacity>
            <View style={{paddingTop: 18, paddingLeft: 18,}}>
                <Text style={{fontWeight: '200',}}>Already have an account? Login</Text>
            </View>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 20,
        paddingVertical: 80
    },
    loginform:{
        paddingHorizontal: 28,
    },
    heading: {
        textAlign:'center',
        fontSize: 36,
        fontWeight: '300',
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