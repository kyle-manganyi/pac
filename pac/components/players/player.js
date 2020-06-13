import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import MyVideoPlayer from "./videoplayer";
import { ScrollView } from "react-native-gesture-handler";

const player = () => {
    const [hide, setHide] = React.useState(true);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 15,
          marginTop: 25
        }}
      >
        <View>
          <FontAwesome
            name={"arrow-left"}
            size={30}
            color={Colors.tabIconSelected}
            style={{ marginTop: 7 }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.tabIconSelected
            }}
          >
            <FontAwesome name={"video-camera"} size={20} color={"#ffff"} />
          </View>
          <View
            style={{
              backgroundColor: "#ffff",
              width: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <FontAwesome
              name={"music"}
              size={20}
              color={Colors.tabIconSelected}
            />
          </View>
        </View>
        <View>
          <FontAwesome
            name={"search"}
            size={20}
            color={Colors.tabIconSelected}
            style={{ marginTop: 7 }}
          />
        </View>
      </View>

      <View style={{ width: "100%", height: "100%", marginVertical: 15 }}>
        <MyVideoPlayer></MyVideoPlayer>
        {
            hide?  <View style={{ marginTop: 10, marginHorizontal: 10 }}>
            <Text style={{ color: Colors.tabIconSelected, fontSize: 18 }}>
              this will be the short descriptionK
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: Colors.tabIconSelected,
                fontSize: 12
              }}
            >
              4.9M Views
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
                <Text>200</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome
                  name={"thumbs-down"}
                  size={25}
                  color={Colors.tabIconSelected}
                />
                <Text>1</Text>
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
                <Text style={{ fontSize: 18, marginLeft: 10 }}>Podcast</Text>
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
          </View>:null
        }
       
        <View
          style={{
            backgroundColor: Colors.tabIconSelected,
            marginTop: 15
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
                backgroundColor: "teal"
              }}
            >
              <Text>Up Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "40%",
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff"
              }}
            >
              <Text>Comment</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{height:200, minHeight:200, maxHeight:500}}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25
              }}
            >
              <FontAwesome name={"user-circle"} size={25} color={"#fff"} />
              <View style={{ width: "70%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 18, marginLeft: 5, color: "#fff" }}>
                    Podcast
                  </Text>
                  <Text style={{ fontSize: 9, marginLeft: 50, color: "#fff" }}>
                    {" "}
                    3 monts ago
                  </Text>
                </View>

                <Text style={{ fontSize: 18, marginLeft: 5, color: "#fff" }}>
                  this is the comment and it is a lil bit long but its not the longest
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25
              }}
            >
              <FontAwesome name={"user-circle"} size={25} color={"#fff"} />
              <View style={{ width: "70%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 18, marginLeft: 5, color: "#fff" }}>
                    Podcast
                  </Text>
                  <Text style={{ fontSize: 9, marginLeft: 50, color: "#fff" }}>
                    {" "}
                    3 monts ago
                  </Text>
                </View>

                <Text style={{ fontSize: 18, marginLeft: 5, color: "#fff" }}>
                  this is the comment and it is a lil bit long but its not the longest
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25
              }}
            >
              <FontAwesome name={"user-circle"} size={25} color={"#fff"} />
              <View style={{ width: "70%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 18, marginLeft: 5, color: "#fff" }}>
                    Podcast
                  </Text>
                  <Text style={{ fontSize: 9, marginLeft: 50, color: "#fff" }}>
                    {" "}
                    3 monts ago
                  </Text>
                </View>

                <Text style={{ fontSize: 18, marginLeft: 5, color: "#fff" }}>
                  this is the comment and it is a lil bit long but its not the longest
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25
              }}
            >
              <FontAwesome name={"user-circle"} size={25} color={"#fff"} />
              <View style={{ width: "70%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 18, marginLeft: 5, color: "#fff" }}>
                    Podcast
                  </Text>
                  <Text style={{ fontSize: 9, marginLeft: 50, color: "#fff" }}>
                    {" "}
                    3 monts ago
                  </Text>
                </View>

                <Text style={{ fontSize: 18, marginLeft: 5, color: "#fff" }}>
                  this is the comment and it is a lil bit long but its not the longest
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25
              }}
            >
              <FontAwesome name={"user-circle"} size={25} color={"#fff"} />
              <View style={{ width: "70%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 18, marginLeft: 5, color: "#fff" }}>
                    Podcast
                  </Text>
                  <Text style={{ fontSize: 9, marginLeft: 50, color: "#fff" }}>
                    {" "}
                    3 monts ago
                  </Text>
                </View>

                <Text style={{ fontSize: 18, marginLeft: 5, color: "#fff" }}>
                  this is the comment and it is a lil bit long but its not the longest
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25
              }}
            >
              <FontAwesome name={"user-circle"} size={25} color={"#fff"} />
              <View style={{ width: "70%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 18, marginLeft: 5, color: "#fff" }}>
                    Podcast
                  </Text>
                  <Text style={{ fontSize: 9, marginLeft: 50, color: "#fff" }}>
                    {" "}
                    3 monts ago
                  </Text>
                </View>

                <Text style={{ fontSize: 18, marginLeft: 5, color: "#fff" }}>
                  this is the comment and it is a lil bit long but its not the longest
                </Text>
              </View>
            </View>
            
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default player;
