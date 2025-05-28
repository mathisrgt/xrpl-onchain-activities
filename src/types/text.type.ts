export enum TextType {
    title = 'Title',
    body = 'Body',
    link = 'Link',
    code = 'Code'
}

export interface contentText {
    title: string;
    description: string;
    sections: { type: TextType, value: string }[]
}