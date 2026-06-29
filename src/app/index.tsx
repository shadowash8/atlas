import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useSQLiteContext } from "@/db/database";
import { createArtifact, getArtifacts } from '@/db/artifacts';
import Artifacts from '@/components/ui/artifacts';
import { useEffect, useState } from 'react';
import { Artifact } from '@/types/artifact';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const db = useSQLiteContext();
    const scheme = useColorScheme();
    const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

    const [artifacts, setArtifacts] = useState<Artifact[]>([]);
    const [refreshing, setRefreshing] = useState(false);

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

    return (
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
            <Pressable
                style={({ pressed }) => [
                    styles.fab,
                    {
                        backgroundColor: colors.accent,
                    },
                    pressed && styles.fabPressed,
                ]}
                onPress={async () => {
                    await createArtifact(
                        db,
                        "Passport",
                        "Indian passport with visa documents",
                    );

                    await refresh();
                }}
            >
                <Ionicons name="add" size={30} color="white" />
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.five,
    },
    heading: {
        marginBottom: Spacing.two
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
