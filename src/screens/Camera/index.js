/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { StatusBar, Image, SafeAreaView, View, Text } from 'react-native';

import Logo from '../../assets/images/white-logo.png';
import Header from '../../components/Header';

import NetInfo from '@react-native-community/netinfo';

import { withTheme } from 'react-native-paper';
import {
  MainContainer,
  PhotoContainer,
  SaveButton,
  ButtonText,
  ShowButton,
  SelectButton
} from './styles';

import appTheme from '../../design/apptheme';

import ImagePicker from 'react-native-image-crop-picker';
import { ActionSheetCustom } from 'react-native-actionsheet';

import { useDispatch, useSelector } from 'react-redux';
import { Creators as PhotoActions } from '../../store/ducks/photo';

import PouchDB from 'pouchdb-react-native';

const Camera = ({ navigation, theme }) => {
    
  let actionSheet;
  const db = new PouchDB('photoguest_database');

  const [count, setCount] = useState(false);

  const [photo, setPhoto] = useState(false);
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const savingPhoto = useSelector(store => store.photo.saving);
  const successSaved = useSelector(store => store.photo.successSaved);
  const dispatch = useDispatch();

  const updateAction = () => {
    setCount(!count);
  };

  useEffect(() => {

    navigation.setParams({ actionSheet: updateAction });

    function handlePhotoSave() {
      
      if (!savingPhoto && !successSaved) {
        savePhotoLocally();
      }
      if (!savingPhoto && successSaved) {
        dispatch(PhotoActions.getPhotos());
        setPhoto('');
        setChecked(false);
        navigation.navigate('Gallery');
        setLoadingPhoto(false);
      }

      if((count || !count) && !photo) {
        actionSheet.show();
        navigation.navigate('Camera');
      }
     
    }
    
    return handlePhotoSave();
  }, [savingPhoto, successSaved, count]);

  async function selectImage() {
    await actionSheet.show();
  }

  async function optionSelected(index) {
    setLoadingPhoto(true);
    switch (index) {
      case 0:
        ImagePicker.openPicker({
          compressImageQuality: 0.3,
          cropping: edit,
          includeBase64: true,
        })
          .then(handleImageReady)
          .catch(err => {
            setLoadingPhoto(false);
          });
        break;
      case 1:
        ImagePicker.openCamera({
          compressImageQuality: 0.3,
          cropping: edit,
          includeBase64: true,
        })
          .then(handleImageReady)
          .catch(() => {
            setLoadingPhoto(false);
          });
        break;
      case 2:
        setLoadingPhoto(false);
        break;
    }
  }

  async function handleImageReady(image) {
    setPhoto(image.data);
    setLoadingPhoto(false);
  }

  function renderPhotoContainerContent() {
    if (!photo) {
      return (
        <SelectButton onPress={selectImage} loading={photo} disabled={photo} background={theme.colors.primary}>
          <ButtonText color={theme.colors.background}>Selecionar</ButtonText>
        </SelectButton>
      );
    }
    if (photo) {
      return (
        <PhotoContainer background={theme.colors.primary} onPress={selectImage}>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
            resizeMode="stretch"
            source={{ uri: `data:image/png;base64,${photo}` }}
          />
        </PhotoContainer>
      );
    }
  }

  async function savePhoto() {
    setLoadingPhoto(true);

    const connectionInfo = await NetInfo.fetch();
    if (connectionInfo.isConnected && connectionInfo.isInternetReachable) {
      dispatch(PhotoActions.savePhoto(photo, checked));
    } else {
      savePhotoLocally();
    }
  }

  async function savePhotoLocally() {
    await db.post({ base64: photo });
    setPhoto('');
    setChecked(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header background={theme.colors.background} logo={Logo} />
      <MainContainer background={theme.colors.background}>
      <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="dark-content"
        />
        {renderPhotoContainerContent()}
        <ShowButton 
          background={checked ? theme.colors.background : theme.colors.gray} 
          onPress={() => {
             setChecked(!checked);
            }}>
          <Text style={{fontFamily: 'Futura', fontSize: 17}}>Exibir no Telão</Text>
        </ShowButton>
        <SaveButton
          mode="contained"
          loading={loadingPhoto}
          disabled={!photo}
          onPress={() => {
            savePhoto();
          }}>
          <Text style={
            {fontFamily: 'Futura', 
            fontSize: 16, 
            color: !photo ? 'white': theme.colors.background}}>
            SALVAR
          </Text>
        </SaveButton>
        <ActionSheetCustom
          ref={actionSheetRef => (actionSheet = actionSheetRef)}
          title={'Selecionar imagem'}
          options={['Galeria', 'Câmera', 'Cancelar']}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          tintColor={theme.colors.background}
          onPress={optionSelected}
        />
      </MainContainer>
    </SafeAreaView>
  );
};

Camera.navigationOptions = ({ navigation}) => ({
  title: '',
  tabBarIcon: ({ tintColor }) => (
    <View style={{marginTop: 15}}>
      <Image source={require ('../../assets/images/camera.png')} style={{width: 26, height:33}}/>
    </View>
  ),
  headerStyle: {
    backgroundColor: appTheme.colors.header,
  },
  headerTintColor: appTheme.colors.header,
  tabBarOnPress: ({navigation, defaultHandler}) => {
    
    defaultHandler()
    try {
      navigation.state.params.actionSheet();
      if(true) {
        navigation.navigate('Camera');
      }
    } catch(e) {
      console.log('erro')
    }    
  }
});


export default withTheme(Camera);