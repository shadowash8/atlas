import { View, type ViewProps } from 'react-native';
import { useMaterialColors, type MaterialColors } from '@expo/ui/jetpack-compose';

export type MaterialColorType = keyof Omit<
    MaterialColors,
    'isDynamicColorAvailable' | 'getMaterialColors'
>;

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    type?: MaterialColorType;
};

export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
    const colors = useMaterialColors();

    const resolvedBackgroundColor = lightColor || darkColor || colors[type ?? 'background'];

    return (
        <View
            style={[{ backgroundColor: resolvedBackgroundColor }, style]}
            {...otherProps}
        />
    );
}
