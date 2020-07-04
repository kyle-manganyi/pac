import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const Searchbar = ({navigation}) => {
  const [value, setValue] = React.useState("");
  const [searching, setSearching] = React.useState(false);
  const [Categories, setCatergories] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://kpopapi.herokuapp.com/api/ContentCreater/get-catergories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => setCatergories(result))
      .catch(err => {
        return console.log("not now  " + err);
      });
  }, []);


  const handleSearch = value => setValue(value);

  return (
    <View style={{ flex: 1, backgroundColor: "#131212" }}>
      <View style={{ marginTop: 40, flex: 1 }}>
        {searching ? (
          <View style={styles.searchBar}>
            <TouchableOpacity
              style={{ alignSelf: "center", marginRight: 20 }}
              onPress={() => setSearching(false)}
            >
              <FontAwesome
                name={"arrow-left"}
                size={25}
                color={Colors.tabIconSelected}
              />
            </TouchableOpacity>

            <TextInput
              placeholder={"Search"}
              onChangeText={handleSearch}
              value={value}
              style={{ width: "70%" }}
            />
            <TouchableOpacity style={{ alignSelf: "center", marginRight: 20 }}>
              <FontAwesome
                name={"search"}
                size={25}
                color={Colors.tabIconSelected}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => setSearching(true)}
          >
            <FontAwesome
              name={"search"}
              size={25}
              style={{ alignSelf: "center", marginRight: 20 }}
              color={Colors.tabIconSelected}
            />
            <Text style={{ marginTop: 10, fontSize: 20, color: "#fff" }}>
              Search
            </Text>
          </TouchableOpacity>
        )}

        {searching ? null : (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: "5%",
                marginVertical: 15
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18
                }}
              >
                Categories
              </Text>
            </View>
            <ScrollView>
              <View style={styles.container}>
                  {
                      Categories.map(catergory => (
                        <TouchableOpacity style={styles.cardview}
                        onPress={() =>  navigation.navigate("catergory-results", {catergoryID: catergory.id})}
                        >
                        <Text
                          style={{
                            alignSelf: "center",
                            color: "#372B7B",
                            fontSize: 15
                          }}
                        >
                        {    catergory.name}
                        </Text>
                      </TouchableOpacity>

                      ))
                  }
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderColor: "#272435",
    borderWidth: 0.9,
    marginBottom: 10,
    height: 50,
    flexDirection: "row",
    marginHorizontal: "5%",
    paddingLeft: 30,
    borderRadius: 30,
    backgroundColor: "#272435",
    opacity: 0.2
  },
  container: {
    flex: 3,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  cardview: {
    height: 100,
    width: "30%",
    backgroundColor: "#FE2851",
    borderRadius: 5,
    shadowRadius: 14,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    elevation: 21,
    justifyContent: "center"
  }
});

export default Searchbar;
