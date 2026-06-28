import { Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useSQLiteContext } from "@/db/database";
import { createArtifact, getArtifacts } from '@/db/artifacts';
import Artifacts from '@/components/ui/artifacts';
import { useEffect, useState } from 'react';
import { Artifact } from '@/types/artifact';
import { ThemedText } from '@/components/themed-text';

export default function HomeScreen() {
    const db = useSQLiteContext();

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
            <SafeAreaView style={styles.safeArea}>
                <ThemedText type="title" style={styles.heading}>Atlas</ThemedText>
                <Artifacts
                    artifacts={artifacts}
                    refreshing={refreshing}
                    onRefresh={refresh}
                />
                <Button
                    title="Add"
                    onPress={async () => {
                        await createArtifact(
                            db,
                            "Passport",
                            "Indian passport with visa documents",
                        );

                        await refresh(); // optional, immediately updates after adding
                    }}
                />
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    safeArea: {
        flex: 1,
        padding: Spacing.four,
        gap: Spacing.three,
        maxWidth: MaxContentWidth,
    },
    heading: {
        marginBottom: Spacing.two
    }
});
