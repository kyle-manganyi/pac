import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
const comment = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 25,
      }}
    >
      <FontAwesome name={"user-circle"} size={25} color={"#fff"} />
      <View style={{marginLeft:10}}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 18, color: "#fff" }}>
            Podcast
          </Text>
          <Text style={{ fontSize: 9, marginLeft: 50, color: "#fff" }}>
            {" "}
            3 monts ago
          </Text>
        </View>

        <Text style={{ fontSize: 18,color: "#fff", maxWidth:"95%" }}>
          this is the comment and it is a lil bit long but its not the longest
        </Text>
      </View>
    </View>
  );
};

export default comment;
