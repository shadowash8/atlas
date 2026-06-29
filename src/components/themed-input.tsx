import { forwardRef } from "react";
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    ViewStyle,
    useColorScheme,
} from "react-native";

import { Colors, Spacing } from "@/constants/theme";

type ThemedInputProps = TextInputProps & {
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
};

export const ThemedInput = forwardRef<TextInput, ThemedInputProps>(
    ({ containerStyle, inputStyle, ...props }, ref) => {
        const scheme = useColorScheme();
        const colors =
            Colors[scheme === "unspecified" ? "light" : scheme];

        return (
            <TextInput
                ref={ref}
                {...props}
                placeholderTextColor={colors.textSecondary}
                selectionColor={colors.accentSoft}
                cursorColor={colors.accent}
                style={[
                    styles.container,
                    {
                        color: colors.text,
                        backgroundColor: colors.backgroundElement,
                        borderColor: colors.accentSoft,
                    },
                    inputStyle,
                ]}
            />
        );
    }
);

ThemedInput.displayName = "ThemedInput";

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: Spacing.two,
        minWidth: 600
    },
});
