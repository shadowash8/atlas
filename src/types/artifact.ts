export interface Artifact {
    id: string;

    title: string;
    description: string;

    createdAt: string;
    updatedAt: string;

    favorite: boolean;
    color: string | null;
}
