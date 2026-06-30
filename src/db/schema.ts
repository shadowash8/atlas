export interface Artifact {
    id: string;

    title: string;
    description: string;

    tags: string[];
    attachments: Attachment[];

    createdAt: string;
    updatedAt: string;

    favorite: boolean;
    color: string | null;
}

export interface Attachment {
    id: number;

    artifactId: string;

    name: string;
    uri: string;
    type: "string";
    size: number;
}
