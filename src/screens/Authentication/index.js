import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { StatusBar} from 'react-native';
import {
  LogoContainer,
  Logo,
  Slogan,
  TokenInput,
  SendButton,
  Content,
  ErrorText,
  ButtonText,
  BottomLabel
} from './styles';

import { withTheme } from 'react-native-paper';

import ImageLogo from '../../assets/images/white-logo.png';

import { useDispatch, useSelector } from 'react-redux';
import { Creators as AuthActions } from '../../store/ducks/auth';

const Authentication = ({ navigation, theme }) => {
  const [token, setToken] = useState('');

  const authenticated = useSelector(store => store.auth.authenticated);
  const loading = useSelector(store => store.auth.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    function openGallery() {
      if (authenticated) {
        navigation.navigate('Gallery');
      }
    }

    return openGallery();
  }, [authenticated, navigation]);

  const tryToAuthenticate = async () => {
    dispatch(AuthActions.authenticate(token));
  };

  return (
    <LinearGradient 
      style={{flex: 1, alignItems: 'center'}} 
      start={{x: 0, y: 0}} colors={['#901CA6', '#8C1BA0', '#600E70']}>
      <StatusBar backgroundColor={theme.colors.background} />
      <LogoContainer>
        <Logo source={ImageLogo} />
      </LogoContainer>
      <Slogan>Veja seu evento por novos ângulos.</Slogan>
      <Content>
        <TokenInput
          value={token}
          color={theme.colors.placeholder}
          placeholder="Digite seu código"
          placeholderTextColor={theme.colors.placeholder}
          onChangeText={setToken}
        />
        { authenticated === false && 
          loading === false && (
          <ErrorText color={theme.colors.text}>Token inválido</ErrorText>
        )}
        <SendButton
          mode="contained"
          onPress={() => {
            tryToAuthenticate();
          }}
          loading={loading}
          disabled={!token || loading}>
          { !loading && (
            <ButtonText color={ !token ? "white" :
              theme.colors.background}>
                ACESSAR
          </ButtonText> )
          }
        </SendButton>
      </Content>
      <BottomLabel onPress={() => {navigation.navigate('NewEvent')}}>
        Histórico de eventos
      </BottomLabel>
    </LinearGradient>
  );
};

Authentication.navigationOptions = () => ({
  header: null,
});

export default withTheme(Authentication);
