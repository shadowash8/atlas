import { forwardRef } from "react";
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
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
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.backgroundElement,
                        borderColor: colors.border,
                    },
                    containerStyle,
                ]}
            >
                <TextInput
                    ref={ref}
                    {...props}
                    placeholderTextColor={colors.textSecondary}
                    selectionColor={colors.tint}
                    cursorColor={colors.tint}
                    style={[
                        styles.input,
                        { color: colors.text },
                        inputStyle,
                    ]}
                />
            </View>
        );
    }
);

ThemedInput.displayName = "ThemedInput";

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,

        paddingHorizontal: Spacing.four,
        paddingVertical: 14,
    },

    input: {
        fontSize: 16,
        padding: 0,
    },
});
