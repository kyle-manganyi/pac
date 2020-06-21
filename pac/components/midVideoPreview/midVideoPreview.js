import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { View, ImageBackground, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import moment from "moment";


const midvideoPreview = (props) => {


  return (
    <View>
      <ImageBackground source={{uri: props.episode.poster}} style={{ height: 150, width: 250, justifyContent:"center", alignItems:"center" }}>
            <FontAwesome
              name={"play-circle-o"}
              size={50}
              color={Colors.tabIconDefault}
            />
      </ImageBackground>
      <View>
        <Text numberOfLines={2} ellipsizeMode='tail' style={{fontWeight:"400"}}>{props.episode !== undefined ? props.episode.description:"blank"}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 250,
          marginTop:5
        }}
      >
        <View>
          <Text numberOfLines={1} ellipsizeMode='tail' style={{maxWidth:100, fontWeight:"200"}}>{props.episode !== undefined ? props.episode.title:"blank"}</Text>
        </View>
        <View>
          <Text style={{fontWeight:"200"}}>{props.episode.views} views</Text>
        </View>
        <View>
          <Text style={{fontWeight:"200"}}>{moment(props.episode.date).format("DD MMM YYYY")}</Text>
        </View>
      </View>
    </View>
  );
};

export default midvideoPreview;
