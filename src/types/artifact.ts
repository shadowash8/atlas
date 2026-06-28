export interface Artifact {
    id: number;

    title: string;
    description: string;

    createdAt: string;
    updatedAt: string;

    favorite: boolean;
    color: string | null;
}
