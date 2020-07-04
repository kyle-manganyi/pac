import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  AsyncStorage,
  Image
} from "react-native";
import { CheckBox } from "react-native-elements";

const RegisterScreen = ({ navigation }) => {
  const [fullname, onChangeFullname] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirm, onChangeConfirm] = React.useState("");
  const [success, setSuccess] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const [check, setCheck] = React.useState(false);

  const _register = user => {
    setLoader(true);
    const url = `https://kpopapi.herokuapp.com/api/User/registeration`;
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: user.email,
        username: user.email,
        cellphone: "123456789",
        password: user.password
      })
    })
      .then(res => res.json())
      .then(result => {
        if (typeof result === "object") {
          console.log("obj");
          AsyncStorage.setItem("user", JSON.stringify(result));
          setTimeout(() => {
            navigation.navigate("Root", result);
          }, 2000);
        } else {
          setSuccess(false);
          setTimeout(() => {
            setLoader(false);
          }, 2000);
        }
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
      <KeyboardAvoidingView style={styles.container}>
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
              height: 320
            }}
          >
            <ActivityIndicator animating={true} color="#bc2b78" size="large" />
          </View>
        ) : (
          <View style={styles.loginform}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={text => onChangeFullname(text)}
              value={fullname}
              onFocus={() => setSuccess(true)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
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
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Confirm Password"
              onChangeText={text => onChangeConfirm(text)}
              value={confirm}
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
                  username or email already exists
                </Text>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity
          style={{ marginTop: 24 }}
          onPress={() =>
            _register({
              email: fullname,
              username: email,
              cellphone: "123456789",
              password: password
            })
          }
        >
          <View style={styles.btnlogin}>
            <Text style={styles.btntext}>Sign up</Text>
          </View>
        </TouchableOpacity>
        <View style={{ paddingTop: 18 }}>
          <CheckBox
            title="Agree to the Terms of Service & Privacy Policy"
            checked={check}
            onIconPress={() => setCheck(!check)}
            uncheckedColor="#FE2851"
            checkedColor="#FE2851"
            containerStyle={{
              backgroundColor: "#131212",
              borderWidth: 0,
              height: 15,
              width: "100%"
            }}
          />
        </View>
        <View style={{ paddingTop: 18, paddingLeft: 18, flexDirection: "row", justifyContent:"center" }}>
          <Text style={{ color: "#fff", fontWeight: "100" }}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={{ color: "#FE2851", marginLeft: 5 }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    flex: 1,
    backgroundColor: "#131212"
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
