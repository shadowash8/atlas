import { useCallback, useMemo, useState } from "react";
import {
    FlatList,
    Platform,
    StyleSheet,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSQLiteContext } from "@/db/database";
import { getArtifacts } from "@/db/artifacts";
import { Artifact } from "@/types/artifact";
import { ArtifactCard } from "@/components/artifact-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
    MaxContentWidth,
    Spacing,
} from "@/constants/theme";
import { useFocusEffect } from "expo-router";
import { useMaterialColors } from "@expo/ui/jetpack-compose";

export default function SearchScreen() {
    const db = useSQLiteContext();
    const colors = useMaterialColors();

    const [query, setQuery] = useState("");
    const [artifacts, setArtifacts] = useState<Artifact[]>([]);

    useFocusEffect(
        useCallback(() => {
            async function load() {
                setArtifacts(await getArtifacts(db));
            }

            load();
        }, [db])
    );

    const filteredArtifacts = useMemo(() => {
        if (!query.trim()) return artifacts;

        const q = query.toLowerCase();

        return artifacts.filter(
            (artifact) =>
                artifact.id.toLowerCase().includes(q) ||
                artifact.title.toLowerCase().includes(q) ||
                artifact.description.toLowerCase().includes(q)
        );
    }, [artifacts, query]);

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <ThemedView style={styles.container}>
                <ThemedText type="title" style={styles.heading}>
                    Search
                </ThemedText>
                <ThemedView
                    style={[
                        {
                            backgroundColor: colors.surfaceContainer,
                        },
                        styles.searchBar,
                    ]}
                >
                    <Ionicons
                        name="search"
                        size={20}
                        color={colors.onSurface}
                    />

                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search artifacts..."
                        placeholderTextColor={colors.onSecondaryFixedVariant}
                        selectionColor={colors.primary}
                        cursorColor={colors.primary}
                        style={[
                            styles.input,
                            {
                                color: colors.onSurface,
                            },
                        ]}
                    />
                </ThemedView>
                <FlatList
                    data={filteredArtifacts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ArtifactCard artifact={item} refresh={() => { }} />
                    )}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.content,
                        Platform.select({
                            android: {
                            },
                            web: {
                                paddingTop: Spacing.six,
                                paddingBottom: Spacing.four,
                            },
                        }),
                    ]}
                    ListHeaderComponent={
                        <>
                            {query.length > 0 && (
                                <ThemedText
                                    themeColor="onSurfaceVariant"
                                    style={styles.results}
                                >
                                    {filteredArtifacts.length} result
                                    {filteredArtifacts.length !== 1 ? "s" : ""}
                                </ThemedText>
                            )}
                        </>
                    }
                    ListEmptyComponent={
                        <ThemedView style={styles.empty}>
                            <Ionicons
                                name="search"
                                size={48}
                                color={colors.primary}
                            />

                            <ThemedText type="subtitle">
                                No artifacts found
                            </ThemedText>
                        </ThemedView>
                    }
                />
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.three,
    },
    heading: {
        marginBottom: Spacing.three
    },
    content: {
        alignSelf: "center",
        width: "100%",
        maxWidth: MaxContentWidth,
        paddingBottom: Spacing.three,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.three,

        borderRadius: 16,
        padding: 16,

        marginBottom: Spacing.three
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 0,
    },
    results: {
        marginBottom: Spacing.three,
    },
    empty: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 64,
        gap: Spacing.two,
    },
    emptyText: {
        textAlign: "center",
    },
});
