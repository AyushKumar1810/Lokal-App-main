import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#ffcc00' />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
})