import { Dimensions, Pressable, StyleSheet, ScrollView } from "react-native";
import type { Artifact } from "@/types/artifact";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { useState } from "react";
import { BottomSheet, Button } from "@expo/ui";
import { deleteArtifact, updateArtifact } from "@/db/artifacts";
import { useSQLiteContext } from "expo-sqlite";
import EditArtifactSheet from "./edit-artifact-sheet";
import { LinkifiedText } from "./linkified-text";
import { Host, InputChip, Text, FlowRow } from "@expo/ui/jetpack-compose";
import { formatDate } from "@/hooks/date";

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
        <ThemedView
            type="surfaceContainer"
            style={[
                styles.card,
            ]}
        >
            <Pressable
                style={({ pressed }) => [
                    pressed && styles.cardPressed,
                    styles.pressable
                ]}
                onPress={() => setIsExpanded(!isExpanded)}
                onLongPress={() => setSheet(true)}>
                <ThemedText type="code">
                    #{artifact.id}
                </ThemedText>

                <ThemedText type="smallBold">
                    {artifact.title}
                </ThemedText>

                <LinkifiedText
                    type="small"
                    numberOfLines={isExpanded ? 0 : 2}
                >
                    {artifact.description}
                </LinkifiedText>

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

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {artifact.tags.length > 0 && (
                        <Host matchContents>
                            <FlowRow horizontalArrangement={{ spacedBy: 8 }}>
                                {artifact.tags.map(tag => (
                                    <InputChip
                                        key={tag}
                                        selected
                                    >
                                        <InputChip.Label>
                                            <Text>{tag}</Text>
                                        </InputChip.Label>
                                    </InputChip>
                                ))}
                            </FlowRow>
                        </Host>
                    )}
                </ScrollView>

                <ThemedText type="small">
                    {formatDate(artifact.updatedAt)}
                </ThemedText>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    pressable: {
        gap: 8,
    },
    cardPressed: {
        opacity: 0.85,
    },
    listItem: {
        width: Dimensions.get("window").width,
        textAlign: "left"
    }
});
