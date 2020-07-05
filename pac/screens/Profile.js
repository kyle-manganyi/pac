import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  AsyncStorage,
  TouchableWithoutFeedback
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const profile = ({navigation}) => {

  const [user, setUser] = React.useState(undefined);
  const [downloads, setdownloads] = React.useState(undefined);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      console.log("componentDidMount");
    });
    
  }, []);

  // AsyncStorage.getItem('user').then(
  //   value =>{
  //     if(value){
  //       setUser(JSON.parse(value))
  //     }
  //   }
  // );

  // AsyncStorage.getItem('downloads').then(
  //   value =>{
  //     if(value){
  //       setdownloads(JSON.parse(value))
  //     }
  //   }
  // );

  // console.log(downloads)

  const _logout= () =>{
    AsyncStorage.removeItem("user")
    AsyncStorage.removeItem("downloads")

    navigation.navigate('login')
  }
 
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={{ alignSelf: "center", fontSize: 35 }}>Profile</Text>

      <View style={{ alignSelf: "center", marginVertical: 30 }}>
        <FontAwesome name={"user-circle"} size={100} />
      </View>

      <View style={styles.loginform}>
        {
          user ? 
          <View>
          <TextInput style={styles.input} onBlur={() => Keyboard.dismiss} placeholder={user.username} />
          <TextInput style={styles.input} onBlur={() => Keyboard.dismiss} placeholder={user.email}/>
          <TextInput style={styles.input} onBlur={() => Keyboard.dismiss} placeholder={user.password}/>
          </View>
          :null
        }
        
      </View>
      <TouchableOpacity style={{ marginTop: 24 }}>
        <View style={styles.btnlogin}>
          <Text style={styles.btntext}>Update</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 24 }} onPress={() => _logout()}>
        <View style={styles.btnlogin}>
          <Text style={styles.btntext}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
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
