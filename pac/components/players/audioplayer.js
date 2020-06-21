/**
 * @flow
 */

import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { Asset } from "expo-asset";
import { Audio, Video } from "expo-av";
import * as Font from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
console.disableYellowBox = true;

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

class PlaylistItem {
  constructor(name, uri, isVideo) {
    this.name = name;
    this.uri = uri;
    this.isVideo = isVideo;
  }
}


const ICON_THROUGH_EARPIECE = "speaker-phone";
const ICON_THROUGH_SPEAKER = "speaker";

const ICON_PLAY_BUTTON = new Icon(
  require("../../assets/images/play_button.png"),
  34,
  51
);
const ICON_PAUSE_BUTTON = new Icon(
  require("../../assets/images/pause_button.png"),
  34,
  51
);
const ICON_STOP_BUTTON = new Icon(
  require("../../assets/images/stop_button.png"),
  22,
  22
);
const ICON_FORWARD_BUTTON = new Icon(
  require("../../assets/images/forward_button.png"),
  33,
  25
);
const ICON_BACK_BUTTON = new Icon(
  require("../../assets/images/back_button.png"),
  33,
  25
);

const ICON_LOOP_ALL_BUTTON = new Icon(
  require("../../assets/images/loop_all_button.png"),
  77,
  35
);
const ICON_LOOP_ONE_BUTTON = new Icon(
  require("../../assets/images/loop_one_button.png"),
  77,
  35
);

const ICON_MUTED_BUTTON = new Icon(
  require("../../assets/images/muted_button.png"),
  67,
  58
);
const ICON_UNMUTED_BUTTON = new Icon(
  require("../../assets/images/unmuted_button.png"),
  67,
  58
);

const ICON_TRACK_1 = new Icon(
  require("../../assets/images/track_1.png"),
  166,
  5
);
const ICON_THUMB_1 = new Icon(
  require("../../assets/images/thumb_1.png"),
  18,
  19
);
const ICON_THUMB_2 = new Icon(
  require("../../assets/images/thumb_2.png"),
  15,
  19
);

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "transparent";
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = ".......";
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      showVideo: false,
      playbackInstanceName: LOADING_STRING,
      loopingType: LOOPING_TYPE_ALL,
      muted: false,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
      poster: false,
      useNativeControls: false,
      fullscreen: false,
      throughEarpiece: false,
      PLAYLIST : [
        new PlaylistItem(
          "Popeye - I don't scare",
          "data:audio/mpeg;base64,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mWscynOT//P52TI7F1q7unKFWCNd++7Q00DPOiYkGo02xhz7mHg6Cv5JomqAwsEgMkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplWaRQtwmxClVBVsX4hW9a6s+DSgagsHYaLAq4s8Fg6s6W6zvETtZ3lus7xF1neDXWd4NVSp3+s7/KneIus7wa5U6t0GuVO8GuVO8tTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7SMTrABAJFRrU9AACta+kmzLAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7SMSyA8l8JQBc8QAAAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==",
          false
        )
      ]
    };
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
    (async () => {
      await Font.loadAsync({
        ...MaterialIcons.font,
        "cutive-mono-regular": require("../../assets/fonts/CutiveMono-Regular.ttf")
      });
      this.setState({ fontLoaded: true });
    })();
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      // this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    const source = { uri: this.state.PLAYLIST[this.index].uri };
    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      volume: this.state.volume,
      isMuted: this.state.muted,
      isLooping: this.state.loopingType === LOOPING_TYPE_ONE
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
    };

    if (this.state.PLAYLIST[this.index].isVideo) {
      console.log(this._onPlaybackStatusUpdate);
      await this._video.loadAsync(source, initialStatus);
      // this._video.onPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      this.playbackInstance = this._video;
      const status = await this._video.getStatusAsync();
    } else {
      const { sound, status } = await Audio.Sound.createAsync(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate
      );
      this.playbackInstance = sound;
    }

    this._updateScreenForLoading(false);
  }

  _mountVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        showVideo: false,
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true
      });
    } else {
      this.setState({
        playbackInstanceName: this.state.PLAYLIST[this.index].name,
        showVideo: this.state.PLAYLIST[this.index].isVideo,
        isLoading: this.state.false
      });
    }
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
        shouldCorrectPitch: status.shouldCorrectPitch
      });
      if (status.didJustFinish && !status.isLooping) {
        // play next when in a play list will implement later
        // this._advanceIndex(true);
        // this._updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  _onLoad = status => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = error => {
    console.log(`ON ERROR : ${error}`);
  };

  _onReadyForDisplay = event => {
    const widestHeight =
      (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width;
    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      this.setState({
        videoWidth:
          (VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) /
          event.naturalSize.height,
        videoHeight: VIDEO_CONTAINER_HEIGHT
      });
    } else {
      this.setState({
        videoWidth: DEVICE_WIDTH,
        videoHeight:
          (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width
      });
    }
  };

  _onFullscreenUpdate = event => {
    console.log(
      `FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`
    );
  };

  _advanceIndex(forward) {
    this.index =
      (this.index + (forward ? 1 : this.state.PLAYLIST.length - 1)) % this.state.PLAYLIST.length;
  }

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this.setState({
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT
    });

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
  };

  _onForwardPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(true);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onBackPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(false);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onMutePressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsMutedAsync(!this.state.muted);
    }
  };

  _onLoopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsLoopingAsync(
        this.state.loopingType !== LOOPING_TYPE_ONE
      );
    }
  };

  _onVolumeSliderValueChange = value => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.playbackInstance != null) {
      try {
        await this.playbackInstance.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  _onRateSliderSlidingComplete = async value => {
    this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
  };

  _onPitchCorrectionPressed = async value => {
    this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
  };

  _onSeekSliderValueChange = value => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.playbackInstance != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.playbackInstanceDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      );
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return "";
  }

  _onPosterPressed = () => {
    this.setState({ poster: !this.state.poster });
  };

  _onUseNativeControlsPressed = () => {
    this.setState({ useNativeControls: !this.state.useNativeControls });
  };

  _onFullscreenPressed = () => {
    try {
      this._video.presentFullscreenPlayer();
    } catch (error) {
      console.log(error.toString());
    }
  };

  _onSpeakerPressed = () => {
    this.setState(
      state => {
        return { throughEarpiece: !state.throughEarpiece };
      },
      ({ throughEarpiece }) =>
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: throughEarpiece
        })
    );
  };

  render() {
    return !this.state.fontLoaded ? (
      <View style={styles.emptyContainer} />
    ) : (
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <Video
            ref={this._mountVideo}
            style={[
              styles.video,
              {
                opacity: this.state.showVideo ? 1.0 : 0.0,
                width: 0,
                height: 0,
                display: "none"
              }
            ]}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onError={this._onError}
            onFullscreenUpdate={this._onFullscreenUpdate}
            onReadyForDisplay={this._onReadyForDisplay}
            useNativeControls={this.state.useNativeControls}
          />
            
        </View>
        <View
            style={[
              styles.buttonsContainerBase,
              styles.buttonsContainerTopRow,
              {
                opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0
              }
            ]}
          >
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={this._onBackPressed}
              disabled={this.state.isLoading}
            >
              <Image style={styles.button} source={ICON_BACK_BUTTON.module} />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={this._onPlayPausePressed}
              disabled={this.state.isLoading}
            >
               <View>
                <Text
                  style={[styles.text, { fontFamily: "cutive-mono-regular" }]}
                >
                  {this.state.isPlaying ? (
                    <FontAwesome
                      name={"pause"}
                      size={30}
                      color={"black"}
                    />
                  ) : (
                    <FontAwesome
                      name={"play"}
                      size={30}
                      color={"black"}
                    />
                  )}
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={this._onForwardPressed}
              disabled={this.state.isLoading}
            >
              <Image
                style={styles.button}
                source={ICON_FORWARD_BUTTON.module}
              />
            </TouchableHighlight>
          </View>
        <View
          style={[
            styles.playbackContainer,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0
            }
          ]}
        >
          <Slider
            style={styles.playbackSlider}
            trackImage={ICON_TRACK_1.module}
            thumbImage={ICON_THUMB_1.module}
            value={this._getSeekSliderPosition()}
            onValueChange={this._onSeekSliderValueChange}
            onSlidingComplete={this._onSeekSliderSlidingComplete}
            disabled={this.state.isLoading}
          />
          <View style={styles.timestampRow}>
            <Text
              style={[
                styles.text,
                styles.buffering,
                { fontFamily: "cutive-mono-regular" }
              ]}
            >
              {this.state.isBuffering ? BUFFERING_STRING : ""}
            </Text>
            <Text
              style={[
                styles.text,
                styles.timestamp,
                { fontFamily: "cutive-mono-regular" }
              ]}
            >
              {this._getTimestamp()}
            </Text>
          </View>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: "stretch",
    backgroundColor: BACKGROUND_COLOR
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: BACKGROUND_COLOR,
    maxHeight: 150
  },
  wrapper: {},
  nameContainer: {
    height: FONT_SIZE
  },
  space: {
    height: FONT_SIZE
  },
  videoContainer: {
    height: 0,
    display: "none"
  },
  video: {
    maxWidth: DEVICE_WIDTH
  },
  playbackContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: ICON_THUMB_1.height * 2.0,
    maxHeight: ICON_THUMB_1.height * 2.0
  },
  playbackSlider: {
    alignSelf: "stretch"
  },
  timestampRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    minHeight: FONT_SIZE,
    marginBottom:5
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE
  },
  buffering: {
    textAlign: "left",
    paddingLeft: 20
  },
  timestamp: {
    textAlign: "right",
    paddingRight: 20
  },
  button: {
    backgroundColor: BACKGROUND_COLOR
  },
  buttonsContainerBase: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonsContainerTopRow: {
    maxHeight: ICON_PLAY_BUTTON.height,
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0
  },
  buttonsContainerMiddleRow: {
    maxHeight: ICON_MUTED_BUTTON.height,
    alignSelf: "stretch",
    paddingRight: 20
  },
  volumeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width
  },
  buttonsContainerBottomRow: {
    maxHeight: ICON_THUMB_1.height,
    alignSelf: "stretch",
    paddingRight: 20,
    paddingLeft: 20
  },
  rateSlider: {
    width: DEVICE_WIDTH / 2.0
  },
  buttonsContainerTextRow: {
    maxHeight: FONT_SIZE,
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    minWidth: DEVICE_WIDTH,
    maxWidth: DEVICE_WIDTH
  }
});
