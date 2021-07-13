import React, { useState } from 'react'
import { StaticQuery, graphql } from 'gatsby'

// import Link from './link';
import config from '../../../config'
import { Sidebar, ListItem } from '../styles/Sidebar'
import { ITableOfContents } from 'src/types/TableOfContentType'

const START_LEVEl = 0
const END_LEVEL = 4

const RightSidebarLayout = ({ location }) => {
    const [show, setShow] = useState(true)

    const getListItem = (items: ITableOfContents[], level: number) => {
        return items.map((innerItem, index) => {
            const itemId = innerItem.title ? innerItem.title.replace(/\s+/g, '').toLowerCase() : '#'

            let innerListItem
            if (level !== END_LEVEL && innerItem.items) {
                innerListItem = getListItem(innerItem.items, level + 1)
            }

            return (
                <>
                    <ListItem key={itemId} to={`#${itemId}`} level={level}>
                        {innerItem.title}
                    </ListItem>
                    {innerListItem}
                </>
            )
        })
    }

    return (
        <StaticQuery
            query={graphql`
                query {
                    allMdx {
                        edges {
                            node {
                                fields {
                                    slug
                                }
                                tableOfContents
                            }
                        }
                    }
                }
            `}
            render={({ allMdx }) => {
                let navItems = []

                let finalNavItems

                if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
                    const navItems = allMdx.edges.map((item, index) => {
                        let innerItems

                        if (item !== undefined) {
                            if (
                                item.node.fields.slug === location.pathname ||
                                config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
                            ) {
                                if (item.node.tableOfContents.items) {
                                    innerItems = getListItem(item.node.tableOfContents.items, START_LEVEl)
                                }
                            }
                        }
                        if (innerItems) {
                            finalNavItems = innerItems
                        }
                    })
                }

                if (finalNavItems && finalNavItems.length) {
                    return (
                        <Sidebar>
                            {/* Right SideBar Switch */}
                            {/* <RightSidebarSwitch show={show} setShow={setShow} /> */}

                            <ul className={'rightSideBarUL'}>
                                <li className={'rightSideTitle'}>CONTENTS</li>
                                {finalNavItems}
                            </ul>
                        </Sidebar>
                    )
                } else {
                    return (
                        <Sidebar>
                            <ul></ul>
                        </Sidebar>
                    )
                }
            }}
        />
    )
}

export default RightSidebarLayout
