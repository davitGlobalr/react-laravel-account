import {
    createTheme,
    ThemeProvider

} from '@mui/material/styles';
import type {ThemeOptions} from '@mui/material/styles';
import * as React from 'react';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { inputsCustomizations } from './customizations/inputs';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';
import { colorSchemes, shape, shadows, typography } from './themePrimitives';

type AppThemeProps = React.PropsWithChildren<{
    disableCustomTheme?: boolean;
    themeComponents?: ThemeOptions['components'];
}>;

export default function AppTheme({
    children,
    disableCustomTheme = false,
    themeComponents,
}: AppThemeProps) {
    const theme = React.useMemo(
        () =>
            disableCustomTheme
                ? createTheme()
                : createTheme({
                      cssVariables: {
                          colorSchemeSelector: 'data-mui-color-scheme',
                          cssVarPrefix: 'template',
                      },
                      colorSchemes,
                      typography,
                      shadows,
                      shape,
                      components: {
                          ...inputsCustomizations,
                          ...dataDisplayCustomizations,
                          ...feedbackCustomizations,
                          ...navigationCustomizations,
                          ...surfacesCustomizations,
                          ...themeComponents,
                      },
                  }),
        [disableCustomTheme, themeComponents],
    );

    if (disableCustomTheme) {
        return <>{children}</>;
    }

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
