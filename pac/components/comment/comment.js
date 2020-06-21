import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import moment from "moment";

const comment = (comment) => {
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
            {comment.comment.username}
          </Text>
          <Text style={{ fontSize: 9, marginLeft: 50, color: "#fff" }}>
          {moment(comment.comment.date).format("DD MMM YYYY")}
          </Text>
        </View>

        <Text style={{ fontSize: 18,color: "#fff", maxWidth:"95%" }}>
          {comment.comment.comment}
        </Text>
      </View>
    </View>
  );
};

export default comment;
