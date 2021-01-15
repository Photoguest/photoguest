import { DefaultTheme } from 'react-native-paper';

export default {
    ...DefaultTheme,
    dark: false,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FFFFFF',
        background: '#901CA6',
        placeholder: '#656364',
        text: '#FFFFFF',
        error: '#B00020',
        header: '#282828',
        gray: '#636363',
        lightGray: '#d3d3d3'
    },
    fonts: {
        ...DefaultTheme.fonts,
        regular: 'Futura',
    }
};