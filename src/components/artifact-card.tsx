import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type ArtifactCardProps = {
    id: string;
    title: string;
    description: string;
    metadata: string;
};

export function ArtifactCard({
    id,
    title,
    description,
    metadata,
}: ArtifactCardProps) {
    return (
        <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="code">{id}</ThemedText>

            <ThemedText type="smallBold">
                {title}
            </ThemedText>

            <ThemedText type="small" numberOfLines={2}>
                {description}
            </ThemedText>

            <ThemedText type="small">
                {metadata}
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 16,
        gap: 6,
        marginBottom: 12,
    },
});
