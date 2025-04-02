import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Linking, Platform } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useFonts } from 'expo-font';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Job = () => {

    let [fontsLoaded] = useFonts({
        "ProductSans-Bold": require("../../assets/fonts/Product Sans Bold.ttf"),
        "ProductSans": require("../../assets/fonts/Product Sans Regular.ttf"),
    })

    const { item } = useLocalSearchParams();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);
    const jobItem = JSON.parse(item);
    let content = {};
    if (jobItem.content) {
        content = JSON.parse(jobItem.content);
    }

    useFocusEffect(
        React.useCallback(() => {
            const getBookmark = async () => {
                setLoading(true);
                try {
                    const bookmarks = await AsyncStorage.getItem('bookmarks');
                    let array = JSON.parse(bookmarks);
                    const value = array?.some((element) => element.id === jobItem.id);
                    setIsBookmarked(value);
                } catch (error) {
                    console.log('Error: ', error);
                    alert(error);
                } finally {
                    setLoading(false);
                }
            }
            getBookmark();
        }, [])
    )

    const saveBookmark = async (jobItem) => {
        setLoading(true);
        try {
            const bookmarks = await AsyncStorage.getItem('bookmarks');
            let array = [];
            if (bookmarks) array = JSON.parse(bookmarks);
            const temp = array.filter((item) => item.id === jobItem.id);

            if (temp.length !== 0) {
                array = array.filter((item) => item.id !== jobItem.id);
                await AsyncStorage.setItem('bookmarks', JSON.stringify(array));
                setIsBookmarked(false);
                Alert.alert("Success", "Job removed successfully");
                return;
            }
            array.push(jobItem);
            await AsyncStorage.setItem('bookmarks', JSON.stringify(array));
            setIsBookmarked(true);
            Alert.alert("Success", "Job Bookmarked successfully");
            return;
        } catch (error) {
            console.log('Error: ', error);
            Alert.alert("Error", error);
        } finally {
            setLoading(false);
        }
    }


    //console.log('ITEM:', jobItem);


    if (loading) {
        return <Loader />
    }


    return (
         <SafeAreaView>
            <ScrollView>
                <TouchableOpacity style={styles.cb}>
                    <Ionicons name='chevron-back' size={32} color='black' onPress={() => router.back()} />
                </TouchableOpacity>
                <View style={styles.maindiv}>
                    <View style={styles.flexrow}>
                        <Image style={styles.img} source={{ uri: jobItem.img }} />
                        <View style={styles.flexcol}>
                            <Text style={styles.tb1}>{jobItem.title}</Text>
                        </View>
                        <FontAwesome name={isBookmarked ? 'bookmark' : 'bookmark-o'} size={32} color='black' style={styles.shareIcon} onPress={() => saveBookmark(jobItem)} />
                    </View>
                    <View style={styles.middleRow}>
                        <FontAwesome name='money' size={24} color='black' style={styles.middleRowFirst}>
                            <View style={styles.moveup}>
                                <Text style={styles.small}>{jobItem.salary}</Text>
                            </View>
                        </FontAwesome>
                        <FontAwesome name='building-o' size={24} color='black' style={styles.middleRowFirst}>
                            <View style={styles.moveup}>
                                <Text style={styles.small}>{jobItem.category}</Text>
                            </View>
                        </FontAwesome>
                        <EvilIcons name='location' size={24} color='black' style={styles.middleRowFirst}>
                            <View style={styles.moveup}>
                                <Text style={styles.small2}>{jobItem.location}</Text>
                            </View>
                        </EvilIcons>
                    </View>
                    <Text style={styles.greybox}>{jobItem.vacancies}</Text>
                </View>
                <View style={styles.greyborder}></View>

                <View style={styles.bluebox}>
                    <Text style={styles.h1}>Job Highlights</Text>
                    <View style={styles.rowdiv}>
                    <AntDesign name='staro' size={18} white='black' />
                    <Text style={styles.greyc}>Experience: <Text style={styles.span}>{jobItem.exp}</Text></Text>
                    </View>
                    <View style={styles.rowdiv}>
                    <SimpleLineIcons name='graduation' size={18} color='black' />
                    <Text style={styles.greyc}>Qualification: <Text style={styles.span}>{jobItem.qua}</Text></Text>
                    </View>

                    <View style={styles.rowdiv}>
                    <Ionicons name='people-outline' size={18} color='black' />
                    <Text style={styles.greyc}>Gender: <Text style={styles.span}>{jobItem.gender}</Text></Text>
                    </View>
                    <Text style={[styles.h1, styles.up]}>Preferences</Text>
                    
                    <View style={styles.rowdiv}>
                    <Feather name='sun' size={18} color='black' />
                    <Text style={styles.greyc}>Shift Timing: <Text style={styles.span}>{jobItem.shift}</Text></Text>
                    </View>
                </View>
                <View style={styles.greyborder}></View>


                <View style={styles.div}>
                    <Text style={[{ marginBottom: 6 }, styles.jdt]}>Job Description</Text>
                    <Text style={styles.text}>{jobItem.jd}
                    </Text><Text style={styles.title}>{jobItem.title}</Text>
                    <Text style={styles.text}>{content.block1 || ''}</Text>
                    <Text style={styles.text}>{content.block2 || ''}</Text>
                    <Text style={styles.text}>{content.block3 || ''}</Text>
                </View>

                <View style={styles.greyborder}></View>

                <View style={styles.div}>
                    <Text style={styles.jdt}>Fee not required</Text>
                    <View style={styles.greyco}>
                        <View style={styles.fr}>
                            <MaterialIcons name='error' size={24} color='orange' />
                            <Text style={styles.apf}> Avoid Paying Fees</Text>
                        </View>
                        <Text style={styles.small}>Recruiter should not charge you any fee. In case they do, please complain to us.</Text>
                    </View>
                </View>
                <View style={styles.greyborder}></View>

                <View style={styles.div}>
                    <Text style={styles.jdt}>Disclaimer</Text>
                    <Text style={styles.t}>Lokal App is not responsible for the accuracy of the job
                        details or the claims made by the advertiser in this job post.</Text>
                    <View style={styles.lastdiv}>
                        <Text style={styles.t}>Posted on {jobItem.time}</Text>
                        <Text style={styles.t}>{jobItem.views} views</Text>
                    </View>
                </View>

                <View style={styles.greyborder}></View>


                <View style={styles.flexrow}>
                    <TouchableOpacity style={[styles.flexrow, styles.chatbtn]}  onPress={() => Linking.openURL(jobItem.wha)}>
                        <FontAwesome name='whatsapp' size={24} color='green' />
                        <Text style={styles.call}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.callbtn}  onPress={() => Linking.openURL(jobItem.tel)}>
                        <Text style={styles.call}>{jobItem.btntext}</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Job

const styles = StyleSheet.create({
    centrediv: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center'
    },
    SafeAreaView: {
        margin: 0,
        padding: 0,
    },

    middleRow: {
        display: "flex",
        flexDirection: "column",
        margin: 6,
        marginTop: 45,
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
    },
    tb: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: "ProductSans",
        position: 'absolute',
        left: -18,
        width: 200
    },
    tb1: {
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: "ProductSans-Bold",
        position: 'absolute',
        left: -18,
        width: 220,
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
        fontSize: 14,
        color: '#555',
        fontFamily: "ProductSans",
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
    rowdiv:{
        display: 'flex',
        flexDirection: 'row', 
        gap:5 
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
        marginBottom:20
    },
    greybox: {
        backgroundColor: '#e0e0e0',
        textAlign: "center",
        padding: 8,
        width: 120,
        borderRadius: 8,
        marginBottom: 5,
        marginTop: -15
    },
    img: {
        height: 75,
        width: 75,
        borderRadius: 8,
    },


    //grey-border styling
    greyborder: {
        height: 1,
        width: "100%",
        backgroundColor: "grey"
    },

    //blue-box
    bluebox: {
        backgroundColor: "lightblue",
        borderRadius: 6,
        width: "90%",
        alignSelf: "center",
        marginVertical: 20,
        padding: 15,
        gap: 10
    },
    h1: {
        fontSize: 16,
        fontFamily: "ProductSans-Bold",
        fontWeight: "600",
        color: "black"
    },
    span: {
        fontSize: 14,
        fontFamily: "ProductSans",
        color: "black"
    },
    up: {
        marginTop: 10
    },
    greyc: {
        color: "grey"
    },

    div: {
        padding: 12,
    },
    lastdiv: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
    },
    jdt: {
        fontSize: 17,
        fontFamily: "ProductSans-Bold",
        color: "black",
        fontWeight: '700'
    },
    title:{

    },
    text: {
        color: "grey",
        lineHeight: 25,
        fontWeight: '700',
    },
    t: {
        color: "grey",
        fontWeight: "400",
        fontSize: 14,
        fontFamily: "ProductSans",
        lineHeight: 16,
        marginTop: 10
    },
    greyco: {
        backgroundColor: "#D4C9BE",
        borderRadius: 6,
        width: "96%",
        alignSelf: "center",
        marginVertical: 20,
        padding: 15,
        gap: 10
    },
    fr: {
        display: "flex",
        flexDirection: "row"
    },
    apf: {
        fontSize: 13,
        fontFamily: "ProductSans-Bold",
        fontWeight: "600",
        marginLeft: 6,
        marginTop: 4
    },


    //buttons
    cb:{
       marginLeft: Platform.OS === 'ios' ? 0 : 12,
       marginTop: Platform.OS === 'ios' ? 0 : 6
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
        width: 170,
        justifyContent: "center"
    },
    callbtn: {
        display: "flex",
        alignItems: "center",
        borderRadius: 8,
        borderColor: 'black',
        padding: 5,
        paddingHorizontal: 20,
        backgroundColor: '#ffcc00',
        margin: 0,
        width: 170,
        justifyContent: "center"
    },
    call: {
        padding: 0,
        marginTop: 6
    },
    arrowbtn: {
        padding: 8,
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
    },
    call: {
        color: 'black',
        fontWeight: '600',
        marginLeft: 6,
    }
})