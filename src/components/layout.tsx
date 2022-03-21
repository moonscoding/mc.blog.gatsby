import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'

import ThemeProvider from './theme/themeProvider'
import mdxComponents from './mdxComponents'
import SidebarLayout from './sidebar/SidebarLayout'
import RightSidebarLayout from './tableOfContents/RightSidebarLayout'
import config from '../../config.js'

const Wrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.background};

    .sideBarUL li a {
        color: ${({ theme }) => theme.colors.text};
    }

    .sideBarUL .item > a:hover {
        background-color: #1ed3c6;
        color: #fff !important;

        /* background: #F8F8F8 */
    }

    @media only screen and (max-width: 767px) {
        display: block;
    }
`

const Content = styled('main')`
    display: flex;
    flex-grow: 1;
    margin: 0px 88px;
    /* margin: 0 30px; */
    padding-top: 3rem;
    background: ${({ theme }) => theme.colors.background};

    table tr {
        background: ${({ theme }) => theme.colors.background};
    }

    // 반응형
    @media only screen and (max-width: 1023px) {
        padding-left: 0;
        margin: 0 10px;
        padding-top: 3rem;
    }
`

const MaxWidth = styled('div')`
    width: 100%;

    // 반응형
    @media only screen and (max-width: 50rem) {
        width: 100%;
        position: relative;
    }
`

const LeftSideBarWidth = styled('div')`
    width: 298px;
`

const RightSideBarWidth = styled('div')`
    width: 348px;

    transition: all 0.5s;
    &.hide {
        -webkit-transform: translate(100%, 0);
        -moz-transform: translate(100%, 0);
        -ms-transform: translate(100%, 0);
        -o-transform: translate(100%, 0);
    }
`

const Layout = ({ children, location }) => {
    return (
        <ThemeProvider location={location}>
            <MDXProvider components={mdxComponents}>
                <Wrapper>
                    {/* Left SideBar */}
                    <LeftSideBarWidth className={'hiddenMobile'}>
                        <SidebarLayout location={location} />
                    </LeftSideBarWidth>

                    {/*  */}
                    {config.sidebar.title ? (
                        <div
                            className={'sidebarTitle sideBarShow'}
                            dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
                        />
                    ) : null}

                    {/* Contents */}
                    <Content>
                        <MaxWidth>{children}</MaxWidth>
                    </Content>

                    {/* Right SideBar (OnlyPC) */}
                    <RightSideBarWidth className="hiddenMobile">
                        <RightSidebarLayout location={location} />
                    </RightSideBarWidth>
                </Wrapper>
            </MDXProvider>
        </ThemeProvider>
    )
}

export default Layout
