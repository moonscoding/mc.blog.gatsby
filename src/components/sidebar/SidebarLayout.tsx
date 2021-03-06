import React, { useState, useEffect } from 'react'
import Tree from './Tree'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { ExternalLink } from 'react-feather'
import config from '../../../config'
import ExternalItem from './ExternalItem'
import Divider from './Divider'
import Tab from './Tab'
import { ETab } from '../../types/SidebarType'

export interface IFields {
    slug: string
    title: string
    hide: boolean
}

const SidebarLayout = ({ location }) => {
    const [tab, setTab] = useState<ETab>(ETab.REACT)

    return (
        <StaticQuery
            query={graphql`
                query {
                    allMdx {
                        edges {
                            node {
                                fields {
                                    slug
                                    title
                                }
                                frontmatter {
                                    hide
                                    collapsed
                                }
                            }
                        }
                    }
                }
            `}
            render={({ allMdx }) => {
                return (
                    <Sidebar>
                        {/* config.sidebar.title - 타이틀 */}
                        {config.sidebar.title ? (
                            <div
                                className={'sidebarTitle hiddenMobile'}
                                dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
                            />
                        ) : null}

                        {/* Tab */}
                        <Tab tab={tab} setTab={setTab} />

                        {/* Search */}
                        {/* <input /> */}

                        {/*  */}
                        <ul className={'sideBarUL'}>
                            {/*  */}
                            <Tree edges={allMdx.edges} tab={tab} />

                            {/* config.sidebar.links - 외부 연동 링크 */}
                            {config.sidebar.links && config.sidebar.links.length > 0 && <Divider />}
                            {config.sidebar.links.map((link, key) => {
                                if (link.link !== '' && link.text !== '') {
                                    return (
                                        <ExternalItem key={key} to={link.link}>
                                            {link.text}
                                            <ExternalLink size={14} />
                                        </ExternalItem>
                                    )
                                }
                            })}
                        </ul>
                    </Sidebar>
                )
            }}
        />
    )
}

const Sidebar = styled('aside')`
    width: 100%;
    height: 100vh;
    overflow: auto;
    position: fixed;
    padding-left: 0px;
    position: -webkit-sticky;
    position: -moz-sticky;
    position: sticky;
    top: 0;
    padding-right: 0;
    -webkit-box-shadow: -1px 0px 4px 1px rgba(175, 158, 232, 0.4);

    @media only screen and (max-width: 1023px) {
        width: 100%;
        /* position: relative; */
        height: 100vh;
    }

    @media (min-width: 767px) and (max-width: 1023px) {
        padding-left: 0;
    }

    @media only screen and (max-width: 767px) {
        padding-left: 0px;
        height: auto;
    }
`

export default SidebarLayout
