import { Fragment } from "react";
import { Text } from "react-native";
import { ExternalLink } from "./external-link";
import { ThemedText } from "./themed-text";
import { useMaterialColors } from "@expo/ui/jetpack-compose";
import { Href } from "expo-router";

const URL_REGEX = /((?:https?:\/\/|www\.)[^\s/$.?#].[^\s]*)/gi;

type Props = {
    children: string;
    numberOfLines?: number;
    type?: "default" | "small" | "smallBold" | "subtitle" | "code";
};

export function LinkifiedText({
    children,
    numberOfLines,
    type = "default",
}: Props) {
    const colors = useMaterialColors();
    const parts = children.split(URL_REGEX);

    return (
        <ThemedText type={type} numberOfLines={numberOfLines}>
            {parts.map((part, index) => {
                if (!/^(?:https?:\/\/|www\.)/i.test(part)) {
                    return <Fragment key={index}>{part}</Fragment>;
                }

                const href = part.startsWith("http")
                    ? part
                    : `https://${part}`;

                return (
                    <ExternalLink key={index} href={href as Href & string}>
                        <Text
                            style={{
                                color: colors.primary,
                                textDecorationLine: "underline",
                            }}
                        >
                            {part}
                        </Text>
                    </ExternalLink>
                );
            })}
        </ThemedText>
    );
}
