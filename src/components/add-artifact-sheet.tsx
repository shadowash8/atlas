import { useState } from "react";
import { BottomSheet, Button, Column, Host, Row } from "@expo/ui";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedInput } from "./themed-input";

type AddArtifactSheetProps = {
    isPresented: boolean;
    onDismiss: () => void;
    onSave: (title: string, description: string) => Promise<void>;
};

export default function AddArtifactSheet({
    isPresented,
    onDismiss,
    onSave,
}: AddArtifactSheetProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleSave() {
        if (!title.trim()) return;

        await onSave(title.trim(), description.trim());

        setTitle("");
        setDescription("");

        onDismiss();
    }

    return (
        <BottomSheet
            isPresented={isPresented}
            onDismiss={onDismiss}
            snapPoints={["half"]}
        >

            <Column spacing={8}>
                <ThemedText type="subtitle">
                    New Artifact
                </ThemedText>

                <ThemedText
                    themeColor="textSecondary"
                    style={styles.description}
                >
                    Save anything you want to remember later.
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
                        onPress={handleSave}
                        label="Save"
                    />
                </Row>
            </Column>
        </BottomSheet>);
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 20,
    },
    description: {
        marginTop: -8,
    },
    textareaContainer: {
        minHeight: 120,
    },
    textareaInput: {
        minHeight: 92,
        textAlignVertical: "top",
    },

});
