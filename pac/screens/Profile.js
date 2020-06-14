import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const profile = () => {
  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center", fontSize: 35 }}>Profile</Text>

      <View style={{ alignSelf: "center", marginVertical: 30 }}>
        <FontAwesome name={"user-circle"} size={100} />
      </View>

      <View style={styles.loginform}>
        <TextInput style={styles.input} onBlur={() => Keyboard.dismiss} />
        <TextInput style={styles.input} onBlur={() => Keyboard.dismiss} />
        <TextInput style={styles.input} onBlur={() => Keyboard.dismiss} />
      </View>
      <TouchableOpacity style={{ marginTop: 24 }}>
        <View style={styles.btnlogin}>
          <Text style={styles.btntext}>Updated</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 70
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
