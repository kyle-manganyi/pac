import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Preview from "../components/midVideoPreview/midVideoPreview";
import Colors from "../constants/Colors";


const Products = ({ route, navigation }) => {
  const episodes = route.params.episodes;

  return (
    <View style={{flex:1, backgroundColor:"#131212"}}>
    <View style={{flex:1, backgroundColor: "#131212", marginTop: 40}}>
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
         <TouchableOpacity
            style={{
              marginHorizontal: 10,
              marginVertical: 15
            }}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome
              name={"arrow-left"}
              size={30}
              color={Colors.tabIconSelected}
            />
          </TouchableOpacity>
          <TouchableOpacity
           style={{
            marginHorizontal: 10,
            marginVertical: 15
          }}
          >
          <FontAwesome
            name={"search"}
            size={30}
            color={Colors.tabIconSelected}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View >
            {
                episodes && episodes.map(e =>(
                    <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("player", {
                          episde: e,
                          episodes: episodes
                        })
                    }
                    key={e.id} 
                    style={{ margin:10 }}
                    >
                        <Preview episode={e} />
                </TouchableOpacity>
                    
                ))
            }
        </View>
    </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  cardview: {
    height: 100,
    width: "30%",
    borderRadius: 5,
    shadowColor: "#808080",
    borderColor: "#808080",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: .9,
    shadowRadius: 14,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 30,
    elevation: 21
  }
});
export default Products;
