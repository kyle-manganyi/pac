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
  AsyncStorage
} from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [fullname, onChangeFullname] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirm, onChangeConfirm] = React.useState("");
  const [success, setSuccess] = React.useState(true);
  const [loader, setLoader] = React.useState(false);

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
        <Text style={styles.heading}>Create an Account</Text>

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
            <View style={{ paddingTop: 18, paddingLeft: 18 }}>
              <Text style={{ fontWeight: "100", fontSize: 12 }}>
                By creating an account, you agree to our Terms of Service and
                Privacy Policy
              </Text>
            </View>
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
        <View style={{ paddingTop: 18, paddingLeft: 18, flexDirection: "row" }}>
          <Text style={{ fontWeight: "200" }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text>Sign In</Text>
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
    paddingVertical: 80
  },
  loginform: {
    paddingHorizontal: 28
  },
  heading: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "300",
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
