import styled from 'styled-components/native';

export const HeaderLogo = styled.Image`
  flex: 1;
  resizeMode: contain;
`;

export const Header = styled.View`
  padding-vertical: 6;
  padding-top: 8;
  background-color: ${props => props.background};
  align-items: center;
  height: 48;
`;