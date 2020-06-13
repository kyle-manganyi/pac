import * as WebBrowser from 'expo-web-browser'
import * as React from 'react'
import { View ,TextInput, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import Colors from '../../constants/Colors';




const Searchbar = ()  => {

    const [ value, setValue ] = React.useState('')    

    const handleSearch = value => setValue(value)

    return (
        <View style={styles.searchBar}>
            <TextInput 
                placeholder={'Search'}
                style={{width:"90%"}}
                onChangeText={ handleSearch }
                value={value}
            />
            <FontAwesome
                name={"search"}
                size={30}
                style={{marginTop:5}}
                color={Colors.tabIconSelected}
            />
      </View>   
    )
}

const styles = StyleSheet.create({
    searchBar: {
        borderColor: Colors.tabIconSelected,
        borderWidth: .9,
        marginBottom: 10,
        lineHeight: 50,
        height: 50,
        flexDirection: "row",
      }
})

export default Searchbar