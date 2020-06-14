import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { View, ImageBackground, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const image = { uri: "https://reactjs.org/logo-og.png" };
const midvideoPreview = (props) => {
  return (
    <View style={{ width: 250 }}>
      <ImageBackground source={image} style={{ height: 150, width: 250, justifyContent:"center", alignItems:"center" }}>
            <FontAwesome
              name={"play-circle-o"}
              size={50}
              color={Colors.tabIconDefault}
            />
      </ImageBackground>
      <View>
        <Text numberOfLines={2} ellipsizeMode='tail'>{props.episode !== undefined ? props.episode.description:"blank"}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 250
        }}
      >
        <View>
          <Text numberOfLines={1} ellipsizeMode='tail' style={{maxWidth:100}}>{props.episode !== undefined ? props.episode.title:"blank"}</Text>
        </View>
        <View>
          <Text>1K views</Text>
        </View>
        <View>
          <Text>5 days ago</Text>
        </View>
      </View>
    </View>
  );
};

export default midvideoPreview;
