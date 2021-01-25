import api, { accessKey } from './api';
import AsyncStorage from '@react-native-community/async-storage';

function checkContains(arr, value, param="token") {
  return arr.some(item => item[param] === value)
}

export const tryAuth = async token => {
  const response = await api.get(
    `login.php?chave_de_acesso=${accessKey}&cod_fotografo=${token}`,
  );

  if (response.data.sucess == 200) {
    const event = { name: response.data.nome_evento, token }
    try {
      const eventHistory = await AsyncStorage.getItem('@eventHistory')
      if (eventHistory != null) {
        let events = JSON.parse(eventHistory)
        checkContains(events, token, "token") ? events : events.push(event)
        try {
          await AsyncStorage.setItem('@eventHistory', JSON.stringify(events))
        } catch (err) {
          console.error(err)
        }
      } else {
        try {
          await AsyncStorage.setItem('@eventHistory', JSON.stringify([event]))
        } catch (err) {
          console.error(err)
        }
      }
    } catch (err) {
      console.error(err)
    }
    await AsyncStorage.setItem('@authData', JSON.stringify(response.data))
    return {
      success: true,
      data: {
        name: response.data.nome_evento,
        date: response.data.data_evento,
        time: response.data.horario_evento,
        location: response.data.local_evento,
        capacity: response.data.capacidade_evento,
        fotoCapa: response.data.foto_capa_evento
      },
    };
  }

  return { success: false, message: 'Invalid photographer code' };
};
