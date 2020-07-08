import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import * as Linking from 'expo-linking';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

const ENTRIES1 = [
  {
    illustration: 'https://streamz-storage.s3.af-south-1.amazonaws.com/streamz/WhatsApp+Image+2020-07-07+at+11.48.28+AM.jpeg',
    url: "https://astoundworx.weebly.com/"
  },
  {
    illustration: 'https://streamz-storage.s3.af-south-1.amazonaws.com/streamz/WhiteLogo.jpg',
    url: "http://workboxx.co.za/"
  }
];
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const MyCarousel = props => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);


  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity 
      onPress={() =>     Linking.openURL(item.url).catch(err => console.error("Couldn't load page", err))}
      style={styles.item}>
        <ParallaxImage
          source={{uri: item.illustration}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={200}
        itemWidth={screenWidth - 80}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 80,
    height: screenHeight * 0.28
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});