/**
 * key : Sidebar-Title
 * value : Folder
 */
export enum ETab {
    JsTs = 'jsts',
    React = 'react',
    DevOps = 'devops',
}

export interface INode {
    items: INode[]
    hide?: true
    collapsed?: true
    label?: string
    title?: string
    url?: string
    index?: number
}
