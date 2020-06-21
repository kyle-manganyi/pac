import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import Searchbar from "../components/searchbar/searchbar";
import Carousel from "../components/carousel/carousel";
import Colors from "../constants/Colors";
import Preview from "../components/midVideoPreview/midVideoPreview";
import { FontAwesome } from "@expo/vector-icons";


export default function HomeScreen({ navigation }) {
  const [episodes, setEpisodes] = React.useState();
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    fetch(`https://kpopapi.herokuapp.com/api/episode`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => setEpisodes(result))
      .catch(err => {
        return console.log("not now  " + err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Searchbar></Searchbar>
        <View style={{ height: "30%" }}>
          <Carousel />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: "25%",
            justifyContent: "space-between",
            marginTop: 10,
            shadowColor: "#000"
          }}
        >
          <View style={{ height: 40, borderRadius: 24, alignItems: "center" }}>
            <Text
              style={{
                color: Colors.tabIconSelected,
                paddingTop: 7,
                fontSize: 18
              }}
            >
              35K
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: 40,
              borderRadius: 10,
              alignItems: "center",
              marginBottom: 10,
              backgroundColor: "black",
              marginLeft: "10%",
              marginRight: "10%",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                paddingHorizontal: 20,
                fontSize: 15
              }}
            >
              subscribe
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 40, borderRadius: 24, alignItems: "center" }}
          >
            <FontAwesome
              name={"bell"}
              size={25}
              color={Colors.tabIconSelected}
              style={{ marginTop: 7 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: "5%",
              marginVertical: 10,
              flex: 3
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  color: Colors.tabIconSelected,
                  fontSize: 18
                }}
              >
                Trending
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: Colors.tabIconSelected,
                  fontSize: 18
                }}
              ></Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {episodes ?
              episodes.map(e => (
                <TouchableOpacity
                  style={{ width: 250, marginHorizontal: 10 }}
                  onPress={() => navigation.navigate("player", {episde:e,episodes:episodes})}
                >
                  {e !== undefined || {} ? <Preview episode={e} /> : null}
                </TouchableOpacity>
              )):
              <ActivityIndicator
              style = {{marginLeft:100}}
              animating = {true}
              color = '#bc2b78'
              size = "large"/>
              }
              
          </ScrollView>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "5%",
            marginVertical: 10,
            flex: 3
          }}
        >
          <TouchableOpacity>
            <Text
              style={{
                color: Colors.tabIconSelected,
                fontSize: 18
              }}
            >
              watch again
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                color: Colors.tabIconSelected,
                fontSize: 18
              }}
            ></Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={{ width: 250, marginHorizontal: 10 }}>
            <Preview />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 250, marginHorizontal: 10 }}>
            <Preview />
          </TouchableOpacity>
        </ScrollView> */}
        </ScrollView>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
