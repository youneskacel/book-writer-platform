export type User = {
    id: string;
    name: string;
    email: string;
    role: 'author' | 'collaborator';
    password?: string
}