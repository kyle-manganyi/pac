import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image
} from "react-native";

import logo from "../assets/images/splash.png"

const LoginScreen = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [display, setDisplay] = React.useState(false);
  const [success, setSuccess] = React.useState(true);
  const [loader, setLoader] = React.useState(false);

  const _login = (username, password) => {
    setLoader(true);

    const url = `https://kpopapi.herokuapp.com/api/User/login?user=${username}&password=${password}`;
    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        if (typeof result === "object") {
          AsyncStorage.setItem("user", JSON.stringify(result));
          setTimeout(() => {
            setLoader(false);
            navigation.navigate("Root", result);
          }, 3000);
        } else {
          setSuccess(false);
          setTimeout(() => {
            setLoader(false);
          }, 3000);
        }
      })
      .catch(err => {
        setSuccess(false);

        setTimeout(() => {
          setLoader(false);
        }, 3000);
      });
  };

  AsyncStorage.getItem("user").then(value => {
    if (value) {
      navigation.navigate("Root");
    } else {
      setTimeout(() => {
        setDisplay(true);
      }, 2000);
    }
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {display ? (
        <View style={styles.container}>
          <Image source={require('../assets/images/splash.png')} style={{resizeMode:"center", height:120, width: 200, alignSelf:"center"}}/>
          <Text style={styles.heading}>LOGIN</Text>

          {loader ? (
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                height: 120
              }}
            >
              <ActivityIndicator
                animating={true}
                color="#bc2b78"
                size="large"
              />
            </View>
          ) : (
            <KeyboardAvoidingView style={styles.loginform}>
              <TextInput
                style={styles.input}
                autoCorrect={true}
                placeholder="Email or Username"
                onChangeText={text => onChangeEmail(text)}
                value={email}
                onFocus={() => setSuccess(true)}
              />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={text => onChangePassword(text)}
                value={password}
                onFocus={() => setSuccess(true)}
              />
              {success ? null : (
                <View
                  style={{
                    paddingTop: 5,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: "red" }}>
                    invalid username or email
                  </Text>
                </View>
              )}
            </KeyboardAvoidingView>
          )}
          <TouchableOpacity
            style={{ marginTop: 15, borderRadius:5, borderWidth:2, borderColor:"#951FC0" }}
            onPress={() => _login(email, password)}
          >
            <View style={styles.btnlogin}>
              <Text style={styles.btntext}>Login</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              paddingTop: 18,
              fontWeight: "300",
              flexDirection: "row",
              justifyContent:"center"
            }}
          >
            <Text style={{color:"#fff"}}>Forgot password? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("resetpassword")}
            >
              <Text style={{color:"#FE2851", marginLeft:5}}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingTop: 18,
              fontWeight: "300",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <Text style={{color:"#fff", fontWeight:"100"}} >Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("register")}>
              <Text style={{color:"#FE2851", marginLeft:5}}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            height: "100%"
          }}
        >
          <ActivityIndicator animating={true} color="#bc2b78" size="large" backgroundColor="#131212" />
        </View>
      )}
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    flex: 1,
    backgroundColor:"#131212"
  },
  loginform: {
    paddingHorizontal: 12
  },
  heading: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
    paddingVertical: 8,
    marginTop:60,
    color:"#fff"
  },
  input: {
    paddingLeft : 12,
    height: 50,
    backgroundColor:"#232524",
    fontSize: 16,
    fontWeight: "200",
    marginVertical: 15,
    borderRadius: 5,
    color:"#fff"
  },
  btnlogin: {
    borderRadius: 5,
    backgroundColor:"#951FC0"
  },
  btntext: {
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#951FC0",
    color: "black",
    height:40,
    alignContent: "center",
    paddingTop:5,
  }
});
