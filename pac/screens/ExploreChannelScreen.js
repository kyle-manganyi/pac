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
import SmallVidePreview from "../components/SmallVideoPreview/SmallVideoPreview";

const ExploreChannelScreen = ({ route, navigation }) => {
  const [episode, setEpisode] = React.useState(route.params.episde);
  const [albums, setAlbums] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://kpopapi.herokuapp.com/api/ContentCreater/get-albums?creatorID=${episode.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => setAlbums(result))
      .catch(err => {
        return console.log("not now  " + err);
      });
      
  }, []);

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
              source={{ uri: episode.coverImage }}
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
              {episode.name}
            </Text>
{/* 
            <TouchableOpacity
              style={{
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "#FE2851",
                paddingHorizontal: 20,
                paddingVertical: 5,
                marginTop: 10
              }}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>Subscribe</Text>
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
              {
                albums && albums.map(e =>(
                    <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("explore-album", {
                          episde: e,
                        })
                    }
                    key={e.id} 
                    style={{ margin:10 }}
                    >
                      <SmallVidePreview episode={e} />
                </TouchableOpacity>
                    
                ))
            }
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default ExploreChannelScreen;

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
