import styled from 'styled-components/native';

import { Title, Text } from 'react-native-paper';

export const Container = styled.ScrollView.attrs({})`
  background-color: ${props => props.background};
`;

export const EventContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-horizontal: 15;
`;

export const EventPhoto = styled.Image`
  flex: 1;
  margin-top: 5;
  min-height: 160;
`;

export const EventDetails = styled.View`
  flex: 8;
  margin-top: 15;
  flex-direction: row;
  justify-content: center;
`;

export const EventMainDetails = styled.View`
  flex: 2;
  flex-direction: column;
`;

export const EventMainDetailsTitle = styled(Title)`
  color: ${props => props.color};
  font-size: 18;
  font-family: 'Futura';
  margin: 0;
`;

export const EventMainDetailsRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

export const EventMainDetailsRowTitle = styled(Text)`
  color: ${props => props.color};
  font-family: 'Futura';
`;

export const EventMainDetailsRowData = styled(Text)`
  color: ${props => props.color};
  margin-left: 8;
  font-family: 'Futura';
`;

export const EventCapacityContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 7;
`;

export const EventCapacityQuantity = styled(Text)`
  color: ${props => props.color};
  font-size: 18;
  padding: 0;
  margin: 0;
`;

export const EventCapacityText = styled(Text)`
  color: ${props => props.color};
  font-size: 12;
  padding: 0;
  margin: 0;
`;

export const EventName = styled(Text)`
  color: ${props => props.color};
  font-size: 18;
`;

export const PhotosContainer = styled.View`
  margin-top: 20;
  flex: 1;
  align-items: center;
  flex-direction: row;
`;

export const PhotoBox = styled.TouchableOpacity`
    width: ${props => props.width};
    height: ${props => props.width};
    flex-direction: row;
    justify-content: space-evenly
    margin-vertical: 2;
`;

export const Photo = styled.Image`
  resize-mode: cover;
  flex: 1;
  margin-horizontal: 2;
  border-width: 1;
  border-color: ${props => props.color};
`;

export const EmptyGalleryContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyGalleryText = styled(Title)`
  margin-top: 10;
  color: ${props => props.color};
`;
