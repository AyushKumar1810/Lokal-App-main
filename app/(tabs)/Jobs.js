import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, Alert, FlatList, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router, useFocusEffect } from 'expo-router'
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { Entypo, EvilIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Loader from '../../components/Loader';

const Jobs = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  let [fontsLoaded] = useFonts({
    "ProductSans-Bold": require("../../assets/fonts/Product Sans Bold.ttf"),
    "ProductSans": require("../../assets/fonts/Product Sans Regular.ttf"),
  })

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);

      const obj = response.data.results.map((item) => ({
        title: item?.title,
        id: item?.id,
        company_name: item?.company_name,
        vacancies: item?.job_tags?.[0].value || '',
        img: item?.creatives[0].file,
        salary: item?.primary_details?.Salary,
        btntext: item?.button_text,
        location: item?.job_location_slug,
        category: item?.job_category,
        exp: item?.primary_details?.Experience || "N/A",
        qua: item?.primary_details?.Qualification || "N/A",
        gender: item?.contentV3?.V3[1]?.field_value,
        shift: item?.contentV3?.V3[2]?.field_value,
        jd: item?.primary_details?.Job_Type,
        content: item?.content || '',
        views: item?.views,
        wha: item?.contact_preference?.whatsapp_link,
        tel: item?.custom_link,
        time: item?.created_on ? new Date(item.created_on).toISOString().split("T")[0] : "N/A"
      }))

      if (obj.length > 0) {
        setData((prevData) => [...prevData, ...obj]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.log('Error: ', error);
      Alert.alert("Error", error);
    } finally {
      setLoading(false);
    }
  }

  const handlePress = (item) => {
    console.log('Clicked');
    router.push({ pathname: "/(stack)/Job", params: { item: JSON.stringify(item) } })
  }

  if (loading) {
    return <Loader />
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sometext}>No Jobs</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="light-content" backgroundColor="" />
      <View style={styles.rowdiv}>
        <Image style={styles.logo} source={require("../../assets/images/lokal.jpeg")} />
        <Text style={styles.title}>Lokal Jobs</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item, index }) => (
          (item.id && item.title && item.img && item.salary.length > 1) ? (
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
                <TouchableOpacity style={styles.arrowbtn} onPress={() => handlePress(item)}>
                  <Feather name='arrow-right' size={24} color='black' />
                </TouchableOpacity>

              </View>
            </TouchableOpacity>
          ) : null
        )
        } onEndReached={hasMore ? getData : null}
        onEndReachedThreshold={0.5} // Trigger when 50% from the bottom
        ListFooterComponent={loading && <Loader />} // Show loader while loading more data
      />
    </SafeAreaView>
  )
}

export default Jobs

const styles = StyleSheet.create({
  SafeAreaView: {
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sometext: {
    fontSize: 24,
    color: "grey",
    fontFamily: "ProductSans"
  },
  rowdiv: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginLeft: 12,
    marginTop: 4,
    height: 42,
    marginBottom:-5
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: "black",
    marginLeft: 0,
    marginBottom: 12,
    fontFamily: "ProductSans-Bold"
  },
  logo: {
    height: 30,
    width: 30
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
  }
})