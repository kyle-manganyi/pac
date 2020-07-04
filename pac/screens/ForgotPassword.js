import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState("");
  const [success, setSuccess] = React.useState(true);
  const [loader, setLoader] = React.useState(false);

  const _reset = username => {
    setLoader(true);

    const url = `https://kpopapi.herokuapp.com/api/User/forgotpassword/${username}`;
    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        setSuccess(false);
        setTimeout(() => {
          setLoader(false);
        }, 2000);
      })
      .catch(err => {
        setSuccess(false);
        setTimeout(() => {
          setLoader(false);
        }, 2000);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <Image
          source={require("../assets/images/splash.png")}
          style={{
            resizeMode: "center",
            height: 100,
            width: 200,
            alignSelf: "center"
          }}
        />
        <Text style={styles.heading}>REGISTER</Text>

        {loader ? (
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              height: 70
            }}
          >
            <ActivityIndicator animating={true} color="#bc2b78" size="large" />
          </View>
        ) : (
          <View style={styles.loginform}>
            <TextInput
              style={styles.input}
              autoCorrect={true}
              placeholder="username or email"
              onChangeText={text => onChangeEmail(text)}
              value={email}
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
                  Reset Email Sent to your email address
                </Text>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity
          style={{ marginTop: 24 }}
          onPress={() => _reset(email)}
        >
          <View style={styles.btnlogin}>
            <Text style={styles.btntext}>Reset</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{ paddingTop: 18, paddingLeft: 18, flexDirection: "row", justifyContent:"center" }}
        >
          <Text  style={{ color: "#fff", fontWeight: "100" }}>remember password? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={{ color: "#FE2851", marginLeft: 5 }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 100,
    flex:1,
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
    marginTop: 20,
    color: "#fff",
    opacity: 0.8
  },
  input: {
    paddingLeft: 12,
    height: 40,
    backgroundColor: "#232524",
    fontSize: 16,
    fontWeight: "200",
    marginVertical: 15,
    borderRadius: 5,
    color: "#fff"
  },
  btnlogin: {
    borderRadius: 5,
    backgroundColor: "#951FC0"
  },
  btntext: {
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#951FC0",
    color: "black",
    height: 40,
    alignContent: "center",
    paddingTop: 5
  }
});
