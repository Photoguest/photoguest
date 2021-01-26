import React, { useEffect } from 'react'

import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { Creators as ErrorActions } from '../store/ducks/error'
import { Creators as PhotoActions } from '../store/ducks/photo'

import Modal from '../components/Modal'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator, } from 'react-navigation-material-bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Authentication from '../screens/Authentication';
import EventHistory from '../screens/EventHistory'

import Gallery from '../screens/Gallery';
import Camera from '../screens/Camera';

import { withTheme } from 'react-native-paper';
import theme from '../design/apptheme';

const bottomNavigator = createBottomTabNavigator(
  {
    Camera: {
      screen: Camera,
    },
    Gallery,
  },
  {
    tabBarOptions: {
      style: {
        borderTopColor: theme.colors.background,
      },
      labelStyle: {
        color: theme.colors.primary,
      },
      tabStyle: {
        backgroundColor: theme.colors.background,
      }
    },
  }

);

const stackNavigatior = createStackNavigator(
  {
    Authentication,
    Home: {
      screen: bottomNavigator,
      navigationOptions: {
        header: null,
        headerMode: 'float',
      },
    },
    EventHistory: {
      screen: EventHistory,
      navigationOptions: ({ navigation }) => ({
        title: 'Histórico de eventos',
        headerStyle: {
          backgroundColor: '#901CA6',
          textAlign: 'center'
        },
        headerTitleStyle: {
          color: '#fff',
          textAlign: 'center',
          flex: 1,
        },
        headerTitleContainerStyle: {
          left: 0
        },
        headerLeft: () => (
          <HeaderBackButton tintColor="#FFF" onPress={() => navigation.goBack()} />
        ),
      })
    }
  },
  {
    initialRouteName: 'Authentication',
  },
  
);

const AppContainer = createAppContainer(stackNavigatior);

const AppContainerComponent = ({ theme }) => {

  const error = useSelector(store => store.error.error)
  const errorMessage = useSelector(store => store.error.errorMessage)
  const dispatch = useDispatch()

  useEffect(() => {
    setInterval(() => dispatch(PhotoActions.uploadPhotos()), 15000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppContainer />
      <Modal
        isVisible={error}
        onBackdropPress={() => { dispatch(ErrorActions.dismissError()) }}
        modalBackground={theme.colors.background}
        iconName="alert-outline"
        iconColor={theme.colors.primary}
        modalTitle="Alerta"
        modalTitleColor={theme.colors.primary}
        content={errorMessage}
        closeText="Fechar"
        confirmText="Ok"
        closeAction={() => { dispatch(ErrorActions.dismissError()) }}
        confirmAction={() => { dispatch(ErrorActions.dismissError()) }}
      />
    </View >
  )
}

export default withTheme(AppContainerComponent);
