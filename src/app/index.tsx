import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { ArtifactCard } from '@/components/artifact-card';

const artifacts = [
    {
        id: "#7KF2A",
        title: "Passport",
        description: "Indian passport with visa documents...",
        metadata: "28 Jun 2026 • 3 attachments",
    },
    {
        id: "#AB813",
        title: "ESP32",
        description: "Development board with OLED display...",
        metadata: "Today • 5 attachments",
    },
    {
        id: "#91DF2",
        title: "Bike Service",
        description: "Invoice and replacement parts...",
        metadata: "Yesterday • 2 attachments",
    },
];

export default function HomeScreen() {
    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {artifacts.map((artifact) => (
                    <ArtifactCard
                        key={artifact.id}
                        {...artifact}
                    />
                ))}
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
});
