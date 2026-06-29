import { useState, useEffect } from "react";
import { BottomSheet, Button, Column, Row } from "@expo/ui";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedInput } from "./themed-input";
import { Artifact } from "@/types/artifact";

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

    useEffect(() => {
        if (passedArtifact) {
            setTitle(passedArtifact.title);
            setDescription(passedArtifact.description || "");
        }
    }, [passedArtifact, isPresented]);

    async function handleUpdate() {
        if (!title.trim() || !passedArtifact) return;

        await onSave({
            title: title.trim(),
            description: description.trim(),
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
