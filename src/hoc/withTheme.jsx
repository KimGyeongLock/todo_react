import React from 'react';
import { useTheme } from '../ThemeContext';

const withTheme = (WrappedComponent) => {
    return (props) => {
        const theme = useTheme();
        return (
            <WrappedComponent
                {...props}
                theme={theme}
            />
        );
    };
};

export default withTheme;