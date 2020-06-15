import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { View, TouchableOpacity, Text, ImageBackground } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import MyVideoPlayer from "./videoplayer";
import MyAudioPlayer from "./audioplayer";
import { ScrollView } from "react-native-gesture-handler";
import Comment from "../comment/comment";
import Next from "../SmallVideoPreview/SmallVideoPreview";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const player = ({route,navigation}) => {
  const [hide, setHide] = React.useState(true);
  const [component, setcomponent] = React.useState("next");
  const [player, setPlayer] = React.useState("video");
  const image = { uri: "https://reactjs.org/logo-og.png" };
  const episode = route.params
  
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 15,
          marginTop: 25
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <FontAwesome
            name={"arrow-left"}
            size={30}
            color={Colors.tabIconSelected}
            style={{ marginTop: 7 }}
          />
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 100,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.tabIconSelected
            }}
            onPress={() => setPlayer("video")}
          >
            <FontAwesome name={"video-camera"} size={20} color={"#ffff"} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPlayer("audio")}
            style={{
              backgroundColor: "#ffff",
              width: 100,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <FontAwesome
              name={"music"}
              size={20}
              color={Colors.tabIconSelected}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <FontAwesome
            name={"search"}
            size={20}
            color={Colors.tabIconSelected}
            style={{ marginTop: 7 }}
          />
        </TouchableOpacity>
      </View>

      {player === "video" ? null : (
        <ImageBackground
          source={image}
          style={{
            width: 150,
            height: 150,
            alignSelf: "center",
            marginTop: 20
          }}
        >
          <Text>Play</Text>
        </ImageBackground>
      )}

      <View
        style={{
          width: "100%",
          height: "100%",
          marginVertical: 15,
          flex:  player === "video"? 0:0
        }}
      >
        {player === "video" ? <MyVideoPlayer video={episode.video} /> : <MyAudioPlayer video={episode.video} />}
        {hide ? (
          <View style={{ marginTop: 10, marginHorizontal: 10 }}>
            <Text style={{ color: Colors.tabIconSelected, fontSize: 18 }}>
              {episode.description}
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: Colors.tabIconSelected,
                fontSize: 12
              }}
            >
              {episode.views} Views
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 15,
                marginTop: 15
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome
                  name={"thumbs-up"}
                  size={25}
                  color={Colors.tabIconSelected}
                />
                <Text>{episode.like}</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome
                  name={"thumbs-down"}
                  size={25}
                  color={Colors.tabIconSelected}
                />
                <Text>{episode.id}</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome
                  name={"share"}
                  size={25}
                  color={Colors.tabIconSelected}
                />
                <Text>share</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome
                  name={"download"}
                  size={25}
                  color={Colors.tabIconSelected}
                />
                <Text>download</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome
                  name={"plus"}
                  size={25}
                  color={Colors.tabIconSelected}
                />
                <Text>save</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 30,
                marginTop: 15
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <FontAwesome
                  name={"user-circle"}
                  size={40}
                  color={Colors.tabIconSelected}
                />
                <Text style={{ fontSize: 18, marginLeft: 10 }}>{episode.title}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 40,
                    borderRadius: 10,
                    alignItems: "center",
                    backgroundColor: Colors.tabIconSelected
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      padding: 10,
                      paddingHorizontal: 10
                    }}
                  >
                    subscribe
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 40,
                    borderRadius: 24,
                    alignItems: "center",
                    marginLeft: 10
                  }}
                >
                  <FontAwesome
                    name={"bell"}
                    size={30}
                    color={Colors.tabIconSelected}
                    style={{ marginTop: 5 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}

        <View
          style={{
            backgroundColor: Colors.tabIconSelected,
            marginTop: player === "video"? 15 : 30,
            flexGrow: 1,
            flex: 1
          }}
        >
          <TouchableOpacity onPress={() => setHide(!hide)}>
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 5,
                alignSelf: "center",
                width: 30,
                height: 25,
                paddingTop: 10
              }}
            />
          </TouchableOpacity>

          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              marginTop: 25
            }}
          >
            <TouchableOpacity
              style={{
                width: "40%",
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: component === "next" ? "white" : "teal"
              }}
              onPress={() => setcomponent("next")}
            >
              <Text>Up Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "40%",
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: component === "comment" ? "white" : "teal"
              }}
              onPress={() => setcomponent("comment")}
            >
              <Text>Comment</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ marginHorizontal: "5%", marginVertical: 10 }}>
            {component === "comment" ? (
              <View>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
              </View>
            ) : (
              <View>
                <Next></Next>
                <Next></Next>
                <Next></Next>
                <Next></Next>
                <Next></Next>
                <Next></Next>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default player;
