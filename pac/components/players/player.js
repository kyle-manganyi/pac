import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet,Modal, TouchableHighlight, AsyncStorage, ActivityIndicator,KeyboardAvoidingView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import MyVideoPlayer from "./videoplayer";
import MyAudioPlayer from "./audioplayer";
import { ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import useForceUpdate from 'use-force-update';
import Comment from "../comment/comment";
import Next from "../SmallVideoPreview/TrackListPreview";
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
  const [playlistModal, setplaylistModal] = React.useState(false);
  const [commentModal, setCommentModal] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  const [downloadingFail, setDownloadingFail] = React.useState(false);
  const [index, setIndex] = React.useState(route.params.index);

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      setEpisode(route.params.episde)
    });
    if(episode.video === "none"){
      setPlayer("audio")
    }   
  }, []);

  const downloadFile = () =>{

    AsyncStorage.getItem("Playing").then(value => {
      if(value){
        let playing = episodes[JSON.parse(value)]
        const uri = playing.audio

        var n = playing.audio.lastIndexOf('/');
        var result = playing.audio.substring(n + 1);
        
        let fileUri = FileSystem.documentDirectory + result;
        let downloads = []
        AsyncStorage.getItem("downloads").then(value => {
          if(value){
            downloads = JSON.parse(value)
          }
  
        });

        setDownloading(true)
        
        FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => {
          let downloaded = playing
          downloaded.audio = uri
          downloads.push(downloaded)
          AsyncStorage.setItem("downloads", JSON.stringify(downloads));
          setDownloading(false)
          })
          .catch(error => {
            setDownloadingFail(true)
            setDownloading(false)
            console.error(error);
          })
      }
    });
    
  }

  
  React.useEffect(() => {

    AsyncStorage.getItem('user').then(
      value =>{
        if(value){
          setUser(JSON.parse(value))
          // checkLiked(JSON.parse(value))
          // watchEpisode(JSON.parse(value))
          // checksaved(JSON.parse(value))
        }
      }
    );
    // viewEpisode()
  }, []);

  // const checkLiked = (user) => {
  //   fetch(`https://kpopapi.herokuapp.com/api/episode/user-liked-episode?episode=${episode.id}&userid=${user.id}`, {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       setEpisodeLiked(result)
  //     })
  //     .catch(err => {
  //     });
  // }

  // const checksaved = (user) => {
  //   fetch(`https://kpopapi.herokuapp.com/api/episode/user-saved-episode?episode=${episode.id}&userid=${user.id}`, {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       setEpisodeSaved(result)
  //     })
  //     .catch(err => {
  //     });
  // }

  // const watchEpisode = (user) => {
  //   fetch(`https://kpopapi.herokuapp.com/api/episode/watch?EpisodeID=${episode.id}&userid=${user.id}`, {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       console.log("done")
  //     })
  //     .catch(err => {
  //       console.log("done")
  //     });
  // }

  // const saveEpisode = () => {
  //   setEpisodeSaved(!episodeSaved)
  //   fetch(`https://kpopapi.herokuapp.com/api/episode/save?EpisodeID=${episode.id}&userid=${user.id}`, {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       console.log(result)
  //       console.log("done")
  //     })
  //     .catch(err => {
  //       console.log("done")
  //     });

  // }

  const updateEpisode = (newepisode) => {
    setEpisode(newepisode)
    setIndex(episodes.indexOf(newepisode))
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
    <View style={{ flex: 1, backgroundColor:"#131212" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 15,
          marginTop: 40,
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
              borderBottomColor: "#FE2851", borderBottomWidth: player === "video" ? 3 : 0

            }}
            onPress={() => setPlayer("video")}
          >
            <Text style={{color:"#fff"}}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPlayer("audio")}
            style={{
              width: 75,
              justifyContent: "center",
              alignItems: "center",
              borderBottomColor: "#FE2851", borderBottomWidth: player === "audio" ? 3 : 0
            }}
          >
              <Text style={{color:"#fff"}}>Audio</Text>
          </TouchableOpacity>
          </View>

          : null
          }    
        <TouchableOpacity
          onPress={() =>  navigation.navigate("Explore")}
        >
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
            width: "80%",
            height: "40%",
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
          flex:1
        }}
      >
        {player === "video" ? <MyVideoPlayer playlist={episodes} index={index} /> : player === "audio" ? <MyAudioPlayer playlist={episodes} index={index}/> : null}
        {hide? (
          <View style={{ flex: 3,position:"absolute", bottom:0, right:0,left:0 }}>
       
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: "15%",
              }}
            >
               <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}
               onPress={() => {
                setplaylistModal(true);
              }}
               >
                <FontAwesome
                  name={"list"}
                  size={25}
                  color={Colors.tabIconSelected}
                />
              </TouchableOpacity>   
              <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => downloadFile()}>
                {
                  downloading ?
                  <ActivityIndicator
                  animating={true}
                  color="#bc2b78"
                  size="small"
                />
                  
                  :
                  <FontAwesome
                  name={"download"}
                  size={25}
                  color={Colors.tabIconSelected}
                />
                }
                
              </TouchableOpacity>
              {/* <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => saveEpisode()}>
                <FontAwesome
                  name={"plus"}
                  size={25}
                  color={episodeSaved? "#FE2851": Colors.tabIconSelected}
                />
              </TouchableOpacity> */}
              {/* <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}
                //  onPress={() => {
                //   setCommentModal(true);
                // }}
              >
                <FontAwesome
                  name={"heart"}
                  size={25}
                  color={Colors.tabIconSelected}
                />
              </TouchableOpacity>     */}
            </View>       
          </View>
          
        ) : <View/>}

        
        {/* playlist modal */}
        <Modal
              animationType="slide"
              transparent={true}
              visible={playlistModal}
              presentationStyle={"fullScreen"}
              onRequestClose={() => {
                setplaylistModal(!playlistModal)
              }}
            >
              
              <View style={styles.centeredView}>
              <TouchableOpacity onPress={() => setplaylistModal(!playlistModal)} style={{width:40, alignSelf: "center", height:30}}>
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
              <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: "5%", marginBottom:10, marginTop:30}}>
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
          </ScrollView>
              </View>
            </Modal>

            {/* comments modal */}
        <Modal
              animated={true}
              animationType="slide"
              transparent={true}
              visible={commentModal}
              presentationStyle={"fullScreen"}
              onRequestClose={() => {
                setCommentModal(!commentModal)
              }}
            >
              
              <View style={styles.centeredView}>
              <TouchableOpacity onPress={() => setCommentModal(!commentModal)} style={{width:40, alignSelf: "center", height:30}}>
                <View
                  style={{
                    borderBottomColor: "white",
                    borderBottomWidth: 5,
                    alignSelf: "center",
                    width: 30,
                    justifyContent:"center"
                  }}
                />
              </TouchableOpacity>
              <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: "5%", marginBottom:10, marginTop:30}}>
              <View>
               {episodes &&
              episodes.map(e => (
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
              ))}
              </View>
          </ScrollView>
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
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={downloadingFail}
              presentationStyle={"fullScreen"}
              onRequestClose={() => {
                setDownloadingFail(false)
              }}
            >              <View>
                <Text>download failed</Text>
                <TouchableOpacity
                onPress={() => setDownloadingFail(false)}
                >
                  <Text>close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height:"100%",
    backgroundColor:"black",
    opacity:.95,
    marginTop:"20%",
    borderTopRightRadius:30,
    borderTopLeftRadius:30
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});


export default player;
