import { forwardRef } from "react";
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    ViewStyle,
} from "react-native";
import { Spacing } from "@/constants/theme";
import { useMaterialColors } from "@expo/ui/jetpack-compose";
type ThemedInputProps = TextInputProps & {
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
};

export const ThemedInput = forwardRef<TextInput, ThemedInputProps>(
    ({ containerStyle, inputStyle, ...props }, ref) => {
        const colors = useMaterialColors();

        return (
            <TextInput
                ref={ref}
                {...props}
                placeholderTextColor={colors.onSecondaryFixedVariant}
                selectionColor={colors.primary}
                cursorColor={colors.primary}
                style={[
                    styles.container,
                    {
                        color: colors.onSurface,
                        backgroundColor: colors.surface,
                        borderColor: colors.outlineVariant,
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
