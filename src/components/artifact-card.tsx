import { StyleSheet } from "react-native";
import type { Artifact } from "@/types/artifact";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type ArtifactCardProps = {
    artifact: Artifact;
};

export function ArtifactCard({ artifact }: ArtifactCardProps) {
    return (
        <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="code">
                #{artifact.id.toString().padStart(5, "0")}
            </ThemedText>

            <ThemedText type="smallBold">
                {artifact.title}
            </ThemedText>

            <ThemedText type="small" numberOfLines={2}>
                {artifact.description}
            </ThemedText>

            <ThemedText type="small">
                {artifact.updatedAt}
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
