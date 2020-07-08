import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  AsyncStorage
} from "react-native";
import * as React from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import SmallVidePreview from "../components/SmallVideoPreview/TrackListPreview";

const catergoryResult = ({ navigation }) => {
  const [episodes, setEpisodes] = React.useState([]);

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      AsyncStorage.getItem("downloads").then(value => {
        if (value) {
          setEpisodes(JSON.parse(value));
        }
      });
    });
  }, []);


  return (
    <View style={{flex:1, backgroundColor:"#131212"}}>
    <View style={styles.container}>
    <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 2,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          borderBottomColor: "#FE2851"
        }}
      >
        <Image
          source={require("../assets/images/homeLogo.png")}
          style={{
            height: 100,
            width: 200
          }}
        />
        {/* <TouchableOpacity
          // onPress={() => navigation.navigate("Home", { update: true })}
          style={{ height: 100, justifyContent: "center", marginRight: 15 }}
        >
          <FontAwesome
            name={"user-circle"}
            size={40}
            color={Colors.tabIconSelected}
          />
        </TouchableOpacity> */}
      </View>
    
      <View style={styles.bottomSection}>
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            {episodes &&
              episodes.map((e, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("player", {
                      episde: e,
                      episodes: episodes,
                      index:index
                    })
                  }
                  key={e.id}
                >
                  {e !== undefined || {} ? (
                    <SmallVidePreview episode={e} />
                  ) : null}
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
</View>
  );
};

export default catergoryResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#131212"
  },
  topSection: {
    backgroundColor: "white",
    flex: 2,
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 8
  },
  bottomSection: {
    flex: 2,
    backgroundColor: "#131212",
    marginHorizontal: 8
  },
  alleps: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  gridformat: {
    display: "flex",
    flexDirection: "row"
    // flex: 6
  },
  episodescroll: {
    // height: '100%'
    height: 400
  }
});
