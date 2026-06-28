import { FlatList } from "react-native";
import { Artifact } from "@/types/artifact";
import { ArtifactCard } from "../artifact-card";

type ArtifactsProps = {
    artifacts: Artifact[];
    refreshing: boolean;
    onRefresh: () => void | Promise<void>;
};

export default function Artifacts({
    artifacts,
    refreshing,
    onRefresh,
}: ArtifactsProps) {
    return (
        <FlatList
            data={artifacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <ArtifactCard artifact={item} />
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
    );
}
