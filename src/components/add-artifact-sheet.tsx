import { useEffect, useState } from "react";
import { BottomSheet, Button, Column, Row } from "@expo/ui";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedInput } from "./themed-input";
import {
    InputChip,
    FlowRow,
    Text,
} from "@expo/ui/jetpack-compose";

type AddArtifactSheetProps = {
    isPresented: boolean;
    initialDescription?: string;
    onDismiss: () => void;
    onSave: (
        title: string,
        description: string,
        tags: string[]
    ) => Promise<void>;
};

export default function AddArtifactSheet({
    isPresented,
    initialDescription,
    onDismiss,
    onSave,
}: AddArtifactSheetProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

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

    useEffect(() => {
        if (isPresented && initialDescription) {
            setDescription(initialDescription);

            // Auto-extract origin application name to append as tag metadata
            if (initialDescription.includes("youtube.com") || initialDescription.includes("youtu.be")) {
                setTitle("YouTube Content Archive");
                addTag("youtube");
            } else if (initialDescription.includes("twitter.com") || initialDescription.includes("x.com")) {
                setTitle("X Thread Post");
                addTag("twitter");
            } else if (initialDescription.startsWith("http")) {
                setTitle("Web Bookmark Link");
                addTag("web");
            } else {
                setTitle("Shared Memo Entry");
                addTag("memos");
            }
        } else if (!isPresented) {
            // Clear fields on layout teardown
            setTitle("");
            setDescription("");
            setTagInput("");
        }
    }, [isPresented, initialDescription]);

    async function handleSave() {
        if (!title.trim()) return;

        await onSave(
            title.trim(),
            description.trim(),
            tags
        );

        setTags([]);
        setTagInput("");
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
                    themeColor="secondary"
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
