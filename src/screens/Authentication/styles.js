import styled from 'styled-components/native';

import { Button, Text } from 'react-native-paper';

export const LogoContainer = styled.View`
  margin-top: 80;
`;

export const Slogan = styled(Text)`
  font-family: Futura;
  margin-top: 2;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 290;
`;
 
export const TokenInput = styled.TextInput`
  height: 50;
  width: 250;
  text-align: center; 
  background-color: white;
  font-style: italic;
  textAlignVertical= 'center'; 
  font-size: 17;
  font-family: Futura;
  color: ${props => props.color};
`;

export const SendButton = styled(Button)`
  margin-top: 48;
  width: 250;
  height: 50;
  justify-content: center;
`;

export const ButtonText = styled(Text)`
  color: ${props => props.color};
  font-family: Futura;
  font-size: 19;
`;

export const ErrorText = styled(Text)`
  color: ${props => props.color};
  align-self: center;
  margin-top: 10;
  font-size: 15;
`;

export const BottomLabel = styled(Text)`
  color: white;
  margin-bottom: 12;
`;
