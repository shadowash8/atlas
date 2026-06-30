import { useState, useEffect } from "react";
import { BottomSheet, Button, Column, Row } from "@expo/ui";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedInput } from "./themed-input";
import { Artifact } from "@/types/artifact";
import { FlowRow, InputChip, Text } from "@expo/ui/jetpack-compose";

type EditArtifactSheetProps = {
    passedArtifact: Artifact | null;
    isPresented: boolean;
    onDismiss: () => void;
    onSave: (updatedFields: Partial<Artifact>) => Promise<void>;
};

export default function EditArtifactSheet({
    passedArtifact,
    isPresented,
    onDismiss,
    onSave,
}: EditArtifactSheetProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        if (passedArtifact) {
            setTitle(passedArtifact.title);
            setDescription(passedArtifact.description || "");
            setTags(passedArtifact.tags ?? []);
            setTagInput("");
        }
    }, [passedArtifact, isPresented]);

    function addTag(raw: string) {
        const tag = raw.trim().toLowerCase();

        if (!tag) return;
        if (tags.includes(tag)) return;

        setTags(prev => [...prev, tag]);
        setTagInput("");
    }

    function removeTag(tag: string) {
        setTags(prev => prev.filter(t => t !== tag));
    }

    async function handleUpdate() {
        if (!title.trim() || !passedArtifact) return;

        await onSave({
            title: title.trim(),
            description: description.trim(),
            tags,
        });

        onDismiss();
    }

    if (!isPresented) return null;

    return (
        <BottomSheet
            isPresented={isPresented}
            onDismiss={onDismiss}
            snapPoints={["half"]}
        >
            <Column spacing={8}>
                <ThemedText type="subtitle">
                    Edit Artifact #{passedArtifact?.id}
                </ThemedText>

                <ThemedInput
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                />

                <ThemedInput
                    placeholder="Description..."
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    containerStyle={styles.textareaContainer}
                    inputStyle={styles.textareaInput}
                />

                <ThemedInput
                    placeholder="Tags (space or comma to add)"
                    value={tagInput}
                    onChangeText={(text) => {
                        const last = text.at(-1);

                        if (last === " " || last === ",") {
                            addTag(text.slice(0, -1));
                            return;
                        }

                        setTagInput(text);
                    }}
                    onSubmitEditing={() => addTag(tagInput)}
                />
                {tags.length > 0 && (
                    <FlowRow horizontalArrangement={{ spacedBy: 8 }}>
                        {tags.map(tag => (
                            <InputChip
                                key={tag}
                                selected
                                onClick={() => removeTag(tag)}
                            >
                                <InputChip.Label>
                                    <Text>{tag}</Text>
                                </InputChip.Label>
                            </InputChip>
                        ))}
                    </FlowRow>
                )}

                <Row spacing={8}>
                    <Button
                        variant="outlined"
                        label="Cancel"
                        onPress={onDismiss}
                    />

                    <Button
                        onPress={handleUpdate}
                        label="Save Changes"
                    />
                </Row>
            </Column>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    textareaContainer: {
        minHeight: 120,
    },
    textareaInput: {
        minHeight: 92,
        textAlignVertical: "top",
    },
});
