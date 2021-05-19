import React, { FunctionComponent } from 'react'
import OpenedSvg from '../images/opened'
import ClosedSvg from '../images/closed'
import config from '../../../config'
import Link from '../link'
import { INode } from '../../types/SidebarType'
import { existIndex } from '../../utils/mdUtils'
import styled from '@emotion/styled'

const IndexBox = styled('span')`
    border: 1px solid;
    border-radius: 10px;
    margin-right: 5px;
    padding: 0 5px;
`

interface IProps {
    key?: string
    className?: string
    setCollapsed?: any
    collapsed?: any
    items?: INode[]
    title?: string
    index?: number
    lobal?: string
    url?: string
    [key: string]: any
}

const TreeNode: FunctionComponent<IProps> = ({
    className = '',
    setCollapsed,
    collapsed,
    url,
    title,
    items,
    index,
    ...rest
}) => {
    const isCollapsed = collapsed[url]

    const collapse = () => {
        setCollapsed(url)
    }

    const hasChildren = items.length !== 0

    let location

    if (typeof document != 'undefined') {
        location = document.location
    }
    const active = location && (location.pathname === url || location.pathname === config.gatsby.pathPrefix + url)

    const calculatedClassName = `${className} item ${active ? 'active' : ''}`

    return (
        <li className={calculatedClassName}>
            {title && (
                <Link to={url} className="treeNode">
                    {/* index - 0이면 생략합니다. */}
                    {existIndex(index) && <IndexBox>{index}</IndexBox>}
                    {title}

                    {/* collapse */}
                    {!config.sidebar.frontLine && title && hasChildren ? (
                        <button onClick={collapse} aria-label="collapse" className="collapser">
                            {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
                        </button>
                    ) : null}
                </Link>
            )}

            {!isCollapsed && hasChildren ? (
                <ul>
                    {items.map((item, index) => (
                        <TreeNode
                            key={item.url + index.toString()}
                            setCollapsed={setCollapsed}
                            collapsed={collapsed}
                            {...item}
                        />
                    ))}
                </ul>
            ) : null}
        </li>
    )
}

export default TreeNode
