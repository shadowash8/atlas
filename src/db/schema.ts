export interface Artifact {
    id: string;

    title: string;
    description: string;

    createdAt: string;
    updatedAt: string;

    favorite: boolean;
    color?: string | null;
}

export interface Attachment {
    id: number;

    artifactId: number;

    name: string;
    uri: string;
    type: string;
    size: number;
}
