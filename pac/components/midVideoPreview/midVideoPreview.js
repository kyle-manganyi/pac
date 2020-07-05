import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { View, ImageBackground, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import moment from "moment";

const midvideoPreview = props => {
  return (
    <View style={{width:130, alignItems:"center"}}>
      <ImageBackground
        source={{ uri: props.episode.coverImage }}
        style={{
          height: 100,
          width: 100,
          borderRadius: 100,
          overflow: "hidden",
        }}
      >
        <Text></Text>
      </ImageBackground>
      <View style={{alignSelf:"center", marginTop:10}}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ fontWeight: "400", textAlign:"center", maxWidth:140, color:"#fff"}}
        >
          {props.episode !== undefined ? props.episode.name : "blank"}
        </Text>
 
      </View>
    </View>
  );
};

export default midvideoPreview;
