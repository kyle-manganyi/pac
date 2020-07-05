import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    TouchableWithoutFeedback,
    ImageBackground
  } from "react-native";
  import * as React from "react";
  import { FontAwesome, Entypo } from "@expo/vector-icons";
  import Colors from "../constants/Colors";
  import Searchbar from "../components/searchbar/testSearch";
  
  import BigVideoPreview from "../components/BigVideoPreview/BigVideoPreview";
  
  import SmallVidePreview from "../components/SmallVideoPreview/TrackListPreview";
  
  const exploreAlbum = ({ route, navigation }) => {
    const [episode, setEpisode] = React.useState(route.params.episde);
    const episodes = route.params.episodes;
  
    return (
      <View style={{flex:1, backgroundColor:"#131212"}}>
        {episode === null ? null : (
          <View style={styles.container}>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                marginTop: 5
              }}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome
                name={"arrow-left"}
                size={30}
                color={Colors.tabIconSelected}
              />
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <ImageBackground
                source={{ uri: episode.album.coverImage }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  overflow: "hidden"
                }}
              >
                <Text></Text>
              </ImageBackground>
              <Text style={{ fontSize: 30, color: "#FFF", opacity: 0.3, textAlign:"center" }}>
                {episode.album.name}
              </Text>
  
              {/* <TouchableOpacity
                style={{
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "#FE2851",
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  marginTop: 10
                }}
              >
                <Text style={{ fontSize: 18, color: "#fff" }}>Download</Text>
              </TouchableOpacity> */}
              <View
                style={{ borderBottomColor: "#FE2851", borderBottomWidth: 1 }}
              />
            </View>
  
            <View
              style={{
                borderBottomColor: "#FE2851",
                borderBottomWidth: 1,
                marginTop: 10,
                marginHorizontal: 10
              }}
            />
            <View style={styles.bottomSection}>
              <ScrollView>
                <View style={{ marginTop: 10 }}>
                  {episode.content &&
                    episode.content.map((e, index) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("player", {
                            episde: e,
                            episodes: episode.content,
                            index: index
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
        )}
      </View>
    );
  };
  
  export default exploreAlbum;
  
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
  