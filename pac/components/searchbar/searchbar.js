import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Preview from "../midVideoPreview/midVideoPreview";
import SmallVidePreview from "../SmallVideoPreview/TrackListPreview";
import AlbumPreview from "../SmallVideoPreview/SmallVideoPreview";



const Searchbar = ({navigation}) => {
  const [value, setValue] = React.useState("");
  const [searching, setSearching] = React.useState(false);
  const [Categories, setCatergories] = React.useState([]);
  const [searchResults, setSearchResult] = React.useState([]);

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


  const Search = () =>{
    Keyboard.dismiss()

    fetch(`https://kpopapi.herokuapp.com/api/ContentCreater/search?search=${value}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => setSearchResult(result))
      .catch(err => {
        return console.log("not now  " + err);
      });

  }

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
              autoFocus={true}
              onChangeText={handleSearch}
              value={value}
              style={{ width: "70%", color:"#fff" }}
            />
            <TouchableOpacity style={{ alignSelf: "center", marginRight: 20 }} onPress={() => Search()}>
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

        {searching ? 
        searchResults.length === 0? null:
        <ScrollView>
          {
            searchResults.creators.length > 0 ?
            <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: "5%",
              marginVertical: 15,
              flex: 3
            }}
          >
            <View>
              <Text
                style={{
                  color: Colors.tabIconSelected,
                  fontSize: 18
                }}
              >
                Artists
              </Text>
              </View>
  
          </View>:null
          }
           
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop:15}}>
            {searchResults.creators ? (
              searchResults.creators.map(e => (
                <TouchableOpacity
                  style={{ marginHorizontal: 10, marginTop:5 }}
                  key={e.id}
                  onPress={() =>
                    navigation.navigate("explore-channel", {
                      episde: e
                    })
                  }
                >
                  {e !== undefined || {} ? <Preview episode={e} /> : null}
                </TouchableOpacity>
              ))
            ) : (
              <ActivityIndicator
                style={{ marginLeft: 100 }}
                animating={true}
                color="#bc2b78"
                size="large"
              />
            )}
          </ScrollView>
          
          {
            searchResults.content.length > 0 ?

            <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: "5%",
              marginVertical: 15,
              flex: 3
            }}
          >
            <View>
              <Text
                style={{
                  color: Colors.tabIconSelected,
                  fontSize: 18
                }}
              >
                Songs
              </Text>
              </View>
              {
                searchResults.content.length > 3 ?
                <TouchableOpacity
              onPress={() =>  navigation.navigate("catergory-results", {content:searchResults.content})}
            >
              <Text
                style={{
                  color: "#FE2851",
                  fontSize: 18
                }}
              >All  <FontAwesome
              name={"chevron-right"}
              size={18}
              color="#FE2851"
            /></Text>
            </TouchableOpacity>:null
              }
            
          </View> : null
          }
          
          <ScrollView>
                <View style={{ marginTop: 10 }}>
                  {searchResults.content &&
                    searchResults.content.slice(0, 3).map((e, index) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("player", {
                            episde: e,
                            episodes: searchResults.content,
                            index: index
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

              {
                searchResults.albums.length > 0 ?
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: "5%",
                  marginVertical: 15,
                  flex: 3
                }}
              >
                <View>
                  <Text
                    style={{
                      color: Colors.tabIconSelected,
                      fontSize: 18
                    }}
                  >
                    Albums
                  </Text>
                  </View>
                  {
                    searchResults.albums.length > 3 ?
                    <TouchableOpacity
                  // onPress={() =>
                  //   navigation.navigate("all-explore-channel", {
                  //     episodes: episodes
                  //   })
                  // }
                >
                  <Text
                    style={{
                      color: "#FE2851",
                      fontSize: 18
                    }}
                  >All  <FontAwesome
                  name={"chevron-right"}
                  size={18}
                  color="#FE2851"
                /></Text>
                </TouchableOpacity>:null
                  }
                
              </View>:null
              }

             
          <ScrollView>
              {
                searchResults.albums && searchResults.albums.slice(0, 3).map(e =>(
                    <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("explore-album", {
                          episde: e,
                        })
                    }
                    key={e.id} 
                    style={{ margin:10 }}
                    >
                      <AlbumPreview episode={e} />
                </TouchableOpacity>
                    
                ))
            }
            </ScrollView>



        </ScrollView> 
        
        
        : (
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
                Playlists
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
