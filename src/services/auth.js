import api, { accessKey } from './api';
import AsyncStorage from '@react-native-community/async-storage';
import { checkContains } from '../utils/checkArray'

export const tryAuth = async token => {
  const response = await api.get(
    `login.php?chave_de_acesso=${accessKey}&cod_fotografo=${token}`,
  );

  if (response.data.sucess == 200) {
    const event = { name: response.data.nome_evento, token }
    let eventHistory = await AsyncStorage.getItem('@eventHistory')
    eventHistory = JSON.parse(eventHistory)

    if (eventHistory != null && !checkContains(eventHistory, token, "token")) {
      eventHistory.push(event)
      await AsyncStorage.setItem('@eventHistory', JSON.stringify(eventHistory))
    }
    else if (eventHistory == null) {
      await AsyncStorage.setItem('@eventHistory', JSON.stringify([event]))
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
