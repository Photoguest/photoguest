import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar, FlatList, TouchableOpacity, StyleSheet, View, Text, Dimensions } from 'react-native';
import { withTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.text}>{item.name}</Text>
  </TouchableOpacity>
)

const EventHistory = ({ navigation, theme }) => {
  const data = navigation.getParam('data')

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        style={{ flex: 1, alignItems: 'center' }}
        start={{ x: 0, y: 0 }} colors={['#901CA6', '#8C1BA0', '#600E70']}>
        <StatusBar backgroundColor={theme.colors.background} />
        <View style={styles.view}>
          <FlatList
            data={data}
            renderItem={({ item }) => <Item item={item} onPress={() => console.log('Teste eve')} />}
            keyExtractor={(item) => item.token}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  item: {
    width: 320,
    padding: 17,
    marginVertical: 8,
    marginHorizontal: 5,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Futura',
    fontSize: 18,
    textAlign: 'center'
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default withTheme(EventHistory)