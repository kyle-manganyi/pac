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
    
  import SmallVidePreview from "../SmallVideoPreview/TrackListPreview";
  
  const catergoryResult = ({ route, navigation }) => {
    const [episodes, setEpisodes] = React.useState([]);
    const catergoryID = route.params.catergoryID;


    React.useEffect(() => {
        fetch(`https://kpopapi.herokuapp.com/api/ContentCreater/catergory-content?catergoryID=${catergoryID}`, {
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

      console.log(episodes)
  
    return (
      <View style={{flex:1, backgroundColor:"#131212"}}>
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
                color={"#fff"}
              />
            </TouchableOpacity>
           
  
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
                  {episodes &&
                    episodes.map(e => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("player", {
                            episde: e,
                            episodes: episodes
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
  