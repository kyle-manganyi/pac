import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
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
        <Text style={styles.heading}>Reset Passowrd</Text>

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
          style={{
            paddingTop: 18,
            paddingLeft: 18,
            fontWeight: "300",
            flexDirection: "row"
          }}
        >
          <Text>remember password? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text>Sign In</Text>
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
    paddingVertical: 140
  },
  loginform: {
    paddingHorizontal: 12
  },
  heading: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "400",
    paddingVertical: 8
  },
  input: {
    padding: 12,
    height: 55,
    borderColor: "lightgray",
    borderWidth: 2,
    fontSize: 24,
    fontWeight: "200",
    textAlignVertical: "center",
    marginVertical: 4,
    borderRadius: 5
  },
  btnlogin: {
    borderWidth: 1,
    borderRadius: 5
  },
  btntext: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    padding: 12,
    backgroundColor: "gray",
    color: "#f2f2f2"
  }
});
