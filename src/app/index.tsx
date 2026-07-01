import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useSQLiteContext } from "@/db/database";
import { createArtifact, getArtifacts } from '@/db/artifacts';
import Artifacts from '@/components/ui/artifacts';
import { useEffect, useState } from 'react';
import { Artifact } from '@/types/artifact';
import { useMaterialColors } from '@expo/ui/jetpack-compose';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import AddArtifactSheet from '@/components/add-artifact-sheet';
import { useIncomingShare, clearSharedPayloads } from 'expo-sharing';

export default function HomeScreen() {
    const db = useSQLiteContext();
    const colors = useMaterialColors();

    const { resolvedSharedPayloads } = useIncomingShare();

    const [artifacts, setArtifacts] = useState<Artifact[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [sharedContent, setSharedContent] = useState<string | undefined>(undefined);

    async function refresh() {
        setRefreshing(true);
        try {
            setArtifacts(await getArtifacts(db));
        } finally {
            setRefreshing(false);
        }
    }

    useEffect(() => {
        refresh();
    }, []);

    // 4. Watch for incoming shared payloads directly in this view context
    useEffect(() => {
        const payload = resolvedSharedPayloads?.[0];

        if (!payload) return;

        // create a stable fingerprint for deduping
        const id = payload.contentUri ?? payload.value;

        if (!id) return;

        if (payload.contentType === 'text' || payload.contentType === 'website') {
            const value = payload.value?.trim();

            if (value) {
                setSharedContent(value);
                setSheetOpen(true);

                clearSharedPayloads();
            }
        }
    }, [resolvedSharedPayloads]);

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <ThemedView style={styles.container}>
                <ThemedText type="title" style={styles.heading}>Atlas</ThemedText>
                <Artifacts
                    artifacts={artifacts}
                    refreshing={refreshing}
                    onRefresh={refresh}
                    contentContainerStyle={{
                        paddingBottom: 88,
                    }}
                />
                <AddArtifactSheet
                    isPresented={sheetOpen}
                    onDismiss={() => setSheetOpen(false)}
                    initialDescription={sharedContent}
                    onSave={async (title, description, tags) => {
                        await createArtifact(db, title, description, tags);
                        await refresh();
                    }}
                />
                <Pressable
                    style={({ pressed }) => [
                        styles.fab,
                        {
                            backgroundColor: colors.primary,
                        },
                        pressed && styles.fabPressed,
                    ]}
                    onPress={() => setSheetOpen(true)}
                >
                    <Ionicons name="add" size={30} color={colors.onPrimary} />
                </Pressable>
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
    fab: {
        position: "absolute",
        right: 24,
        bottom: 24,

        width: 56,
        height: 56,
        borderRadius: 28,

        alignItems: "center",
        justifyContent: "center",

        elevation: 6, // Android shadow
    },

    fabPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.96 }],
    },
});
