import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, Alert, Linking } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import Loader from '../../components/Loader';
import { Entypo, EvilIcons, Feather, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Bookmarks = () => {

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    "ProductSans-Bold": require("../../assets/fonts/Product Sans Bold.ttf"),
    "ProductSans": require("../../assets/fonts/Product Sans Regular.ttf"),
  })

  useFocusEffect(
    React.useCallback(() => {
      const getBookmarks = async () => {
        setLoading(true)
        try {
          const bookmarks = await AsyncStorage.getItem('bookmarks');
          setBookmarks((JSON.parse(bookmarks)) || []);
        } catch (error) {
          console.log('Error: ', error)
          Alert.alert("Error", error);
        } finally {
          setLoading(false)
        }
      }
      getBookmarks();
    }, [])
  )

  const handlePress = (item) => {
    router.push({ pathname: "/(stack)/Job", params: { item: JSON.stringify(item) } })
  }

  if (bookmarks.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sometext}>No bookmarks</Text>
      </View>
    )
  }

  if (loading) {
    return <Loader />
  }

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="#151515" />
        <View>
          <Text style={styles.title}>Bookmarks</Text>
          {bookmarks.length>0 && bookmarks.map((item, index) => {
            return (
              <TouchableOpacity key={index} style={styles.maindiv} onPress={() => handlePress(item)}>
                <View style={styles.flexrow}>
                  <Image style={styles.img} source={{ uri: item.img }} />
                  <View style={styles.flexcol}>
                    <Text style={styles.tb}>{(item.title && item.title.length > 10) ? `${item.title.slice(0, 26)}...` : item.title}</Text>
                    <Text style={styles.tdiv}>{item.salary}</Text>
                  </View>
                  <Entypo name='share' size={24} color='black' style={styles.shareIcon} />
                </View>
                <View style={styles.middleRow}>
                  <FontAwesome name='building-o' size={24} color='black' style={styles.middleRowFirst}>
                    <View style={styles.moveup}>
                      <Text style={styles.small}>{item.company_name}</Text>
                    </View>
                  </FontAwesome>
                  <EvilIcons name='location' size={24} color='black' style={styles.middleRowFirst}>
                    <View style={styles.moveup}>
                      <Text style={styles.small2}>{item.location}</Text>
                    </View>
                  </EvilIcons>
                </View>
                <Text style={styles.greybox}>{item.vacancies}</Text>
                <View style={styles.flexrow}>
                  <TouchableOpacity style={[styles.flexrow, styles.chatbtn]} onPress={() => Linking.openURL(item.wha)}>
                    <FontAwesome name='whatsapp' size={24} color='green' />
                    <Text style={styles.call1}>Chat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.callbtn} onPress={() => Linking.openURL(item.tel)}>
                    <Text style={styles.call}>{item.btntext}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.arrowbtn}>
                    <Feather name='arrow-right' size={24} color='black' />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Bookmarks

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: "black",
    marginLeft: 12,
    fontFamily: "ProductSans-Bold"
  },
  sometext: {
    fontSize: 24,
    color: "grey",
    fontFamily: "ProductSans"
  },
  maindiv: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  tb: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: "ProductSans",
    position: 'absolute',
    left: -18,
    width: 300
  },

  shareIcon: {
    display: "flex",
    alignItems: "center",
    position: 'absolute',
    left: "95%"
  },

  tdiv: {
    color: '#666',
    fontSize: 12,
    fontFamily: "ProductSans",
    position: 'absolute',
    left: -15,
    top: 30
  },
  small: {
    fontSize: 12,
    fontFamily: "ProductSans",
    color: '#555',
    paddingLeft: 5,
    paddingBottom: 2
  },
  small2: {
    fontSize: 12,
    fontFamily: "ProductSans",
    color: '#555',
    paddingLeft: 1,
    paddingBottom: 2
  },
  flexrow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    margin: 6,
    height: 40
  },
  flexcol: {
    marginLeft: 10,
  },
  greybox: {
    backgroundColor: '#e0e0e0',
    textAlign: "center",
    padding: 8,
    fontFamily: "ProductSans",
    width: 120,
    borderRadius: 8,
    marginBottom: 5,
    marginTop: -15
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 8,
  },
  chatbtn: {
    display: "flex",
    alignItems: "center",
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 20,
    margin: 0,
    width: 130,
    fontFamily: "ProductSans",
  },
  callbtn: {
    display: "flex",
    alignItems: "center",
    borderRadius: 8,
    borderColor: 'black',
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: '#ffcc00',
    fontFamily: "ProductSans",
    margin: 0,
    width: 130
  },
  call: {
    padding: 0,
    marginTop: 3,
    fontFamily: "ProductSans-Bold",
  },
  call1: {
    fontFamily: "ProductSans-Bold",
  },
  arrowbtn: {
    padding: 8,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
  },
  btntext: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
    fontFamily: "ProductSans",
  },

  middleRow: {
    display: "flex",
    flexDirection: "column",
    margin: 6,
    marginTop: 25,
    marginBottom: 10,
    textAlign: "center"
  },
  middleRowFirst: {
    height: 40
  },

  safearea: {
    flex: 1,
    backgroundColor: 'white',
  },

})