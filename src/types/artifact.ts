import { Attachment } from "./attachment";

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
