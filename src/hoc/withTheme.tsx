import React, { ComponentType } from 'react';
import { useTheme, ThemeContextType } from '../ThemeContext';

//theme prop의 타입을 명시
interface WithThemeProps {
    theme: ThemeContextType;
}

//<P extends object>: HOC가 어떤 props 타입도 래핑
//ComponentType<P & WithThemeProps>: 원래 props에 추가로 theme prop을 받을 수 있음
const withTheme = <P extends object>(WrappedComponent: ComponentType<P & WithThemeProps>) => {
    //React.FC<Omit<P, keyof WithThemeProps>>: WithThemeProps에 정의된 prop들을 제외한 나머지 props를 전달
    const WithTheme: React.FC<Omit<P, keyof WithThemeProps>> = (props) => {
        const theme = useTheme();
        return (
            <WrappedComponent
                {...props as P}
                theme={theme}
            />
        );
    };
    return WithTheme;
};

export default withTheme;