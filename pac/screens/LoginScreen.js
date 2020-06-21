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
  ActivityIndicator
} from "react-native";

const fnLogin = async (username, password, navigation) => {};

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
      }, 3000);
    }
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {display ? (
        <View style={styles.container}>
          <Text style={styles.heading}>Sign In</Text>

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
            <View style={styles.loginform}>
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
            </View>
          )}
          <TouchableOpacity
            style={{ marginTop: 24 }}
            onPress={() => _login(email, password)}
          >
            <View style={styles.btnlogin}>
              <Text style={styles.btntext}>Sign In</Text>
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
            <Text>Forgot password? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("resetpassword")}
            >
              <Text>Click Here</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingTop: 18,
              paddingLeft: 18,
              fontWeight: "300",
              flexDirection: "row"
            }}
          >
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("register")}>
              <Text>Sign Up</Text>
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
          <ActivityIndicator animating={true} color="#bc2b78" size="large" />
        </View>
      )}
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
