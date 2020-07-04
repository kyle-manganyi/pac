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

export default function HomeScreen({ navigation, route }) {
  const [episodes, setEpisodes] = React.useState();
  const [watchedEpisodes, setWatchedEpisodes] = React.useState([]);
  const [savedEpisodes, setSavedEpisodes] = React.useState([]);
  const [user, setUser] = React.useState(undefined);
  const [ContentCreator, SetContentCreator] = React.useState()

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

      fetch(`https://kpopapi.herokuapp.com/api/ContentCreater/get-creators`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => SetContentCreator(result))
      .catch(err => {
        return console.log("not now  " + err);
      });
    AsyncStorage.getItem("user").then(value => {
      if (value) {
        setUser(JSON.parse(value));
        getWatched(JSON.parse(value));
        getSaved(JSON.parse(value));
      }
    });
  }, []);

  getWatched = user => {
    fetch(
      `https://kpopapi.herokuapp.com/api/episode/get-watched?userid=${user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(result => setWatchedEpisodes(result))
      .catch(err => {
        return console.log("not now  " + err);
      });
  };
  getSaved = user => {
    fetch(
      `https://kpopapi.herokuapp.com/api/episode/get-saved?userid=${user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(result => setSavedEpisodes(result))
      .catch(err => {
        return console.log("not now  " + err);
      });
  };

  
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
        <TouchableOpacity
          // onPress={() => navigation.navigate("Home", { update: true })}
          style={{ height: 100, justifyContent: "center", marginRight: 15 }}
        >
          <FontAwesome
            name={"user-circle"}
            size={40}
            color={Colors.tabIconSelected}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginBottom: 20, marginTop: 10 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
       
            <View>
              <Text
                style={{
                  color: Colors.tabIconSelected,
                  fontSize: 18,
                  marginHorizontal: "5%",
                  marginBottom:15
                }}
              >
                Discover
              </Text>
            </View>

            <Carousel />



          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: "5%",
              marginVertical: 15,
              flex: 3
            }}
          >
              <Text
                style={{
                  color: Colors.tabIconSelected,
                  fontSize: 18
                }}
              >
                Featured
              </Text>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("all-explore-channel", {
              //     episodes: episodes
              //   })
              // }
            >
              <Text
                style={{
                  color: "#FE2851",
                  fontSize: 18
                }}
              >All  <FontAwesome
              name={"chevron-right"}
              size={18}
              color="#FE2851"
            /></Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginBottom:5}}>
            {ContentCreator ? (
              ContentCreator.map(e => (
                <TouchableOpacity
                  style={{ marginHorizontal: 10, marginTop:5 }}
                  key={e.id}
                  onPress={() =>
                    navigation.navigate("explore-channel", {
                      episde: e
                    })
                  }
                >
                  {e !== undefined || {} ? <Preview episode={e} /> : null}
                </TouchableOpacity>
              ))
            ) : (
              <ActivityIndicator
                style={{ marginLeft: 100 }}
                animating={true}
                color="#bc2b78"
                size="large"
              />
            )}
          </ScrollView>

          {/* {watchedEpisodes.length === 0 ? null : (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: "5%",
                  marginVertical: 20,
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
                    Recently Played
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text
                style={{
                  color: "#FE2851",
                  fontSize: 18
                }}
              >All  <FontAwesome
              name={"chevron-right"}
              size={18}
              color="#FE2851"
            /></Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{marginBottom:5}}
              >
                {watchedEpisodes ? (
                  watchedEpisodes.map(e => (
                    <TouchableOpacity
                      style={{marginHorizontal: 10, marginTop:5 }}
                      key={e.id}
                      onPress={() =>
                        navigation.navigate("explore-channel", {
                          episde: e,
                          episodes: watchedEpisodes
                        })
                      }
                    >
                      {e !== undefined || {} ? <Preview episode={e} /> : null}
                    </TouchableOpacity>
                  ))
                ) : (
                  <ActivityIndicator
                    style={{ marginLeft: 100 }}
                    animating={true}
                    color="#bc2b78"
                    size="large"
                  />
                )}
              </ScrollView>
            </View>
          )}

          {savedEpisodes.length === 0 ? null : (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: "5%",
                  marginVertical: 20,
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
                    Saved
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text
                style={{
                  color: "#FE2851",
                  fontSize: 18
                }}
              >All  <FontAwesome
              name={"chevron-right"}
              size={18}
              color="#FE2851"
            /></Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{marginBottom:5}}
              >
                {savedEpisodes ? (
                  savedEpisodes.map(e => (
                    <TouchableOpacity
                      style={{ marginHorizontal: 10 }}
                      key={e.id}
                      onPress={() =>
                        navigation.navigate("explore-channel", {
                          episde: e,
                          episodes: savedEpisodes
                        })
                      }
                    >
                      {e !== undefined || {} ? <Preview episode={e} /> : null}
                    </TouchableOpacity>
                  ))
                ) : (
                  <ActivityIndicator
                    style={{ marginLeft: 100 }}
                    animating={true}
                    color="#bc2b78"
                    size="large"
                  />
                )}
              </ScrollView>
            </View>
          )} */}
        </ScrollView>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131212",
    marginTop: 20
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
