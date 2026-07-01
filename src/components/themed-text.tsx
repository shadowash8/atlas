import { Platform, StyleSheet, Text, type TextProps } from 'react-native';
import { useMaterialColors } from '@expo/ui/jetpack-compose';
import { Fonts } from '@/constants/theme';
import type { MaterialColorType } from './themed-view';

export type ThemedTextProps = TextProps & {
    type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
    themeColor?: MaterialColorType;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
    const colors = useMaterialColors();

    const getFallbackColor = (): MaterialColorType => {
        switch (type) {
            case 'link':
            case 'linkPrimary':
                return 'primary';
            case 'small':
            case 'code':
                return 'onSurfaceVariant';
            default:
                return 'onSurface';
        }
    };

    const resolvedTextColor = colors[themeColor ?? getFallbackColor()];

    return (
        <Text
            style={[
                { color: resolvedTextColor },
                type === 'default' && styles.default,
                type === 'title' && styles.title,
                type === 'small' && styles.small,
                type === 'smallBold' && styles.smallBold,
                type === 'subtitle' && styles.subtitle,
                type === 'link' && styles.link,
                type === 'linkPrimary' && styles.linkPrimary,
                type === 'code' && styles.code,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    small: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
    },
    smallBold: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
    },
    default: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '500',
    },
    title: {
        fontSize: 48,
        fontWeight: '600',
        lineHeight: 52,
    },
    subtitle: {
        fontSize: 32,
        lineHeight: 44,
        fontWeight: '600',
    },
    link: {
        lineHeight: 30,
        fontSize: 14,
    },
    linkPrimary: {
        lineHeight: 30,
        fontSize: 14,
    },
    code: {
        fontFamily: Fonts.mono,
        fontWeight: Platform.select({ android: '700' }) ?? '500',
        fontSize: 12,
    },
});
