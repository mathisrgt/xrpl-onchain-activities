export enum TextType {
    title = 'Title',
    body = 'Body',
    link = 'Link',
    code = 'Code'
}

export type ContentText = {
    title: string;
    description: string;
    sections: { type: TextType, value: string }[]
}