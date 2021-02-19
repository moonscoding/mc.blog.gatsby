/**
 * key : Sidebar-Title
 * value : Folder
 */
export enum ETab {
    FE = 'frontend',
    DO = 'devops',
    REACT = 'react',
}

export interface INode {
    items: INode[]
    hide?: true
    collapsed?: true
    label?: string
    title?: string
    url?: string
}
