import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { View, TouchableOpacity, Text, ImageBackground, Keyboard,TouchableWithoutFeedback, KeyboardAvoidingView, AsyncStorage } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import MyVideoPlayer from "./videoplayer";
import MyAudioPlayer from "./audioplayer";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import useForceUpdate from 'use-force-update';
import Comment from "../comment/comment";
import Next from "../SmallVideoPreview/SmallVideoPreview";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useKeepAwake } from 'expo-keep-awake';

  
const  player = ({route,navigation}) => {
  const [hide, setHide] = React.useState(true);
  const [episode, setEpisode] = React.useState(route.params.episde);
  const [component, setcomponent] = React.useState("next");
  const [player, setPlayer] = React.useState("video");
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const episodes = route.params.episodes
  const [user, setUser] = React.useState(undefined);
  const [episodeLiked, setEpisodeLiked] = React.useState(false)
  
  React.useEffect(() => {
    AsyncStorage.getItem('user').then(
      value =>{
        if(value){
          setUser(JSON.parse(value))
          checkLiked(JSON.parse(value))
        }
      }
    );
    viewEpisode()
  }, []);

  const checkLiked = (user) => {
    fetch(`https://kpopapi.herokuapp.com/api/episode/user-liked-episode?episode=${episode.id}&userid=${user.id}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        setEpisodeLiked(result)
      })
      .catch(err => {
      });
  }

  const updateEpisode = (newepisode) => {
    setEpisode(newepisode)
    setPlayer("")
    setTimeout( () => {
      setPlayer(player)
   },20);
  }

  const getComments = () => {
    const url = `https://kpopapi.herokuapp.com/api/episode/get-comment/${episode.id}`;
    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        setComments(result)
        setcomponent("comment")
      })
      .catch(err => {
        console.log("error", err)
      });
  }

  const postComment = (comment) => {

    setComment("")
    let commentobj = {
      "username":user.username,
      "comment":comment,
      "date": new Date()
    }

    setComments([...comments, commentobj])
    const url = `https://kpopapi.herokuapp.com/api/episode/comment?userid=${user.id}&episode=${episode.id}&comment=${comment}`;
    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log("error", err)
      });

  }

  const likeEpisode = () => {
    
    fetch(`https://kpopapi.herokuapp.com/api/episode/like?episode=${episode.id}&user=${user.id}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        setEpisode(result)
        setEpisodeLiked(!episodeLiked)
      })
      .catch(err => {
       console.log("error")
      });
  }
  const viewEpisode = () => {
    fetch(`https://kpopapi.herokuapp.com/api/episode/view?episode=${episode.id}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        setEpisode(result)
      })
      .catch(err => {
       
      });
  }
  useKeepAwake();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 15,
          marginTop: 40
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <FontAwesome
            name={"arrow-left"}
            size={30}
            color={Colors.tabIconSelected}
          />
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 75,
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
              width: 75,
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
            size={30}
            color={Colors.tabIconSelected}
          />
        </TouchableOpacity>
      </View>

      {player === "video" ?null:player === "audio" ? (
        <ImageBackground
          source={{uri:episode.poster}}
          style={{
            width: 150,
            height: 150,
            alignSelf: "center",
            marginTop: 20
          }}
        >
          <Text></Text>
        </ImageBackground>
      ):null}

      <View
        style={{
          width: "100%",
          height: "100%",
          marginVertical: 15,
          flex:  player === "video"? 0:0
        }}
      >
        {player === "video" ? <MyVideoPlayer video={episode.video} /> : player === "audio" ? <MyAudioPlayer video={episode.video} /> : null}
        {hide? (
          <View style={{ marginTop: 10, marginHorizontal: 10 }}>
            <Text style={{ color: Colors.tabIconSelected, fontSize: 18 ,fontWeight:"400"}}>
              {episode.description}
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: Colors.tabIconSelected,
                fontSize: 12,
                fontWeight:"400"
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
              <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => likeEpisode()}>
                <FontAwesome
                  name={"thumbs-up"}
                  size={20}
                  color={episodeLiked? "#000": Colors.tabIconSelected}
                />
                <Text style={{fontWeight:"200"}}>{episode.like}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome
                  name={"thumbs-down"}
                  size={20}
                  color={Colors.tabIconSelected}
                />
                <Text style={{fontWeight:"200"}}>{episode.dislikes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome
                  name={"share"}
                  size={20}
                  color={Colors.tabIconSelected}
                />
                <Text style={{fontWeight:"200"}}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome
                  name={"download"}
                  size={20}
                  color={Colors.tabIconSelected}
                />
                <Text style={{fontWeight:"200"}}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome
                  name={"plus"}
                  size={20}
                  color={Colors.tabIconSelected}
                />
                <Text style={{fontWeight:"200"}}>Save</Text>
              </TouchableOpacity>
            </View>  
            {/* <View
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
            </View> */}
          </View>
          
        ) : <View/>}
        
        <View
          style={{
            backgroundColor: Colors.tabIconSelected,
            marginTop: player === "video"? 5 : 30,
            flexGrow: 1,
            flex: 1
          }}
        >

          <KeyboardAvoidingView>
          <View style={{
               borderColor: Colors.tabIconSelected,
               height: 40,
               flexDirection: "row",
               justifyContent:"center",
               alignItems:"center",
               backgroundColor:"white"
            }}>
                <TextInput 
                    placeholder={'Comment'}
                    style={{width:"85%", borderBottomColor:"white", borderBottomWidth: 1,}}
                    onChangeText={ text => setComment(text) }
                    value={comment}
                    onFocus={() => setHide(false)}
                    onEndEditing={()=> setHide(true)}
                />
                <TouchableOpacity onPress={() => postComment(comment)}>
                  <FontAwesome
                      name={"paper-plane"}
                      size={25}
                      style={{alignSelf:"center", marginHorizontal:10}}
                      color={Colors.tabIconSelected}
                  />
                </TouchableOpacity>
               
          </View> 
          </KeyboardAvoidingView>

          <TouchableOpacity onPress={() => setHide(!hide)} style={{width:40, alignSelf: "center", height:30}}>
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 5,
                alignSelf: "center",
                width: 30,
                paddingTop: 13,
                justifyContent:"center"
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
              onPress={() =>getComments()}
            >
              <Text>Comments</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: "5%", marginBottom:100}}>
            {component === "comment" ? (
              <View>
              {comments &&
             comments.reverse().map(e => (
               <TouchableOpacity
               >
                 <Comment
                 comment={e}></Comment>
               </TouchableOpacity>
             ))}
             </View>
            ) : (
              <View>
               {episodes &&
              episodes.map(e => (
                <TouchableOpacity
                  onPress={() => updateEpisode(e)}
                >
                  {e !== undefined || {} ? <Next episode={e} /> : null}
                </TouchableOpacity>
              ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default player;
