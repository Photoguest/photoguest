import styled from 'styled-components/native';

import {Button, Text} from 'react-native-paper';

export const MainContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
  },
})`
  background-color: ${props => props.background};
`;

export const PhotoContainer = styled.TouchableOpacity`
  margin-top: 55;
  border-width: 8;
  border-color: ${props => props.background};
  min-height: 320;
  margin-horizontal: 70;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const ShowButton = styled(Button)`
  height: 50;
  margin-horizontal: 70;
  borderColor: white;
  borderBottomWidth: 8;
  borderLeftWidth: 8;
  borderRightWidth: 8;
  backgroundColor: ${props => props.background};
`;

export const SelectButton = styled.TouchableOpacity`
  margin-top: 55;
  height: 190;
  margin-horizontal: 70;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.background};
`;

export const SaveButton = styled(Button).attrs({
  uppercase: true,
})`
  justify-content: center;
  margin-top: 40;
  margin-horizontal: 70;
  height: 45;
  margin-bottom: 45;
`;

export const ButtonText = styled(Text)`
  color: ${props => props.color};
  text-transform: uppercase
  font-size: 14
`;
