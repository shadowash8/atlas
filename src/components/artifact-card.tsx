import { Dimensions, Pressable, StyleSheet } from "react-native";
import type { Artifact } from "@/types/artifact";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { useState } from "react";
import { BottomSheet, Button } from "@expo/ui";
import { deleteArtifact, updateArtifact } from "@/db/artifacts";
import { useSQLiteContext } from "expo-sqlite";
import EditArtifactSheet from "./edit-artifact-sheet";

type ArtifactCardProps = {
    artifact: Artifact;
    refresh: () => void | Promise<void>
};

export function ArtifactCard({ artifact, refresh }: ArtifactCardProps) {
    const db = useSQLiteContext();
    const [sheet, setSheet] = useState(false);
    const [editSheet, setEditSheet] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const deleteItem = () => {
        deleteArtifact(db, artifact.id);
        refresh();
    }

    const handleSaveUpdate = async (updatedFields: Partial<Artifact>) => {
        const finalPayload: Artifact = {
            ...artifact,
            ...updatedFields,
        };

        await updateArtifact(db, finalPayload);
        await refresh();
    };
    return (
        <Pressable
            onPress={() => setIsExpanded(!isExpanded)}
            onLongPress={() => setSheet(true)}>
            {({ pressed }) => (
                <ThemedView
                    type="backgroundElement"
                    style={[
                        styles.card,
                        pressed && styles.cardPressed,
                    ]}
                >
                    <ThemedText type="code">
                        #{artifact.id}
                    </ThemedText>

                    <ThemedText type="smallBold">
                        {artifact.title}
                    </ThemedText>

                    <ThemedText type="small" numberOfLines={isExpanded ? 0 : 2}>
                        {artifact.description}
                    </ThemedText>

                    <ThemedText type="small">
                        {artifact.updatedAt}
                    </ThemedText>

                    <EditArtifactSheet
                        isPresented={editSheet}
                        onDismiss={() => setEditSheet(false)}
                        onSave={handleSaveUpdate}
                        passedArtifact={artifact}
                    />
                    <BottomSheet
                        isPresented={sheet}
                        onDismiss={() => setSheet(false)}
                        snapPoints={["half"]}
                    >
                        <Button
                            label="Edit"
                            onPress={() => {
                                setSheet(false);
                                setEditSheet(true);
                            }}
                            variant="text"
                            style={styles.listItem}
                        />
                        <Button label="Delete" onPress={() => deleteItem()} variant="text" style={styles.listItem} />
                    </BottomSheet>
                </ThemedView>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 16,
        gap: 6,
        marginBottom: 12,
    },
    cardPressed: {
        opacity: 0.85,
    },
    listItem: {
        width: Dimensions.get("window").width,
        textAlign: "left"
    }
});
