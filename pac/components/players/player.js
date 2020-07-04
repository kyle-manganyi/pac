import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { View, TouchableOpacity, Text, Image, Keyboard,TouchableWithoutFeedback, KeyboardAvoidingView, AsyncStorage, Alert } from "react-native";
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
import * as FileSystem from 'expo-file-system';


  
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
  const [episodeSaved, setEpisodeSaved] = React.useState(false)

  React.useEffect(() => {
    if(episode.video === "none"){
      setPlayer("audio")
    }   
  }, []);

  const downloadFile = () =>{
    const uri = episode.video
    let fileUri = FileSystem.documentDirectory + "myvid.mp4";
    FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
        console.log(uri);
        Alert.alert(
          'Alert Title',
          'My Alert Msg',
          [
            { text: `downloaded to ${uri} `, onPress: () => console.log('Ask me later pressed') },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );

      })
      .catch(error => {
        console.error(error);
      })
  }

  
  React.useEffect(() => {
    AsyncStorage.getItem('user').then(
      value =>{
        if(value){
          setUser(JSON.parse(value))
          checkLiked(JSON.parse(value))
          watchEpisode(JSON.parse(value))
          checksaved(JSON.parse(value))
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

  const checksaved = (user) => {
    fetch(`https://kpopapi.herokuapp.com/api/episode/user-saved-episode?episode=${episode.id}&userid=${user.id}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        setEpisodeSaved(result)
      })
      .catch(err => {
      });
  }

  const watchEpisode = (user) => {
    fetch(`https://kpopapi.herokuapp.com/api/episode/watch?EpisodeID=${episode.id}&userid=${user.id}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log("done")
      })
      .catch(err => {
        console.log("done")
      });
  }

  const saveEpisode = () => {
    setEpisodeSaved(!episodeSaved)
    fetch(`https://kpopapi.herokuapp.com/api/episode/save?EpisodeID=${episode.id}&userid=${user.id}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        console.log("done")
      })
      .catch(err => {
        console.log("done")
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
    <View style={{ flex: 1, backgroundColor:"#131212" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 15,
          marginTop: 40
        }}
      >
        <TouchableOpacity
          onPress={() =>  navigation.goBack()}
        >
          <FontAwesome
            name={"arrow-left"}
            size={30}
            color={Colors.tabIconSelected}
          />
        </TouchableOpacity>

        

          {
            episode.video !== "none"?
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

          : null
          }    
        <TouchableOpacity>
          <FontAwesome
            name={"search"}
            size={30}
            color={Colors.tabIconSelected}
          />
        </TouchableOpacity>
      </View>

      {player === "video" ?null:player === "audio" ? (
        <Image
          source={{uri:episode.poster}}
          style={{
            width: 150,
            height: 150,
            alignSelf: "center",
            marginTop: 20,
            resizeMode:"stretch"
          }}
        >
        </Image>
      ):null}

      <View
        style={{
          width: "100%",
          height: "100%",
          marginVertical: 15,
          flex:  player === "video"? 0:0
        }}
      >
        {player === "video" ? <MyVideoPlayer video={episode.audio} /> : player === "audio" ? <MyAudioPlayer video={episode.audio} /> : null}
        {hide? (
          <View style={{ marginTop: 10, marginHorizontal: 10 }}>
            <Text style={{ color: Colors.tabIconSelected, fontSize: 18 ,fontWeight:"400"}}>
              {episode.title}
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
                  color={episodeLiked? "#FE2851": Colors.tabIconSelected}
                />
                <Text style={{fontWeight:"200", color:episodeLiked? "#FE2851": Colors.tabIconSelected}}>{episode.like}</Text>
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
              <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => downloadFile()}>
                <FontAwesome
                  name={"download"}
                  size={20}
                  color={Colors.tabIconSelected}
                />
                <Text style={{fontWeight:"200"}}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => saveEpisode()}>
                <FontAwesome
                  name={"plus"}
                  size={20}
                  color={episodeSaved? "#FE2851": Colors.tabIconSelected}
                />
                <Text style={{fontWeight:"200", color:episodeSaved? "#FE2851": Colors.tabIconSelected}}>Save</Text>
              </TouchableOpacity>
            </View>  
           
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
               key={e.id}
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
                  key={e.id}
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
