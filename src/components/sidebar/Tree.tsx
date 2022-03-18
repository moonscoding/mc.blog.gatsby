/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useRef, RefObject } from 'react'
import config from '../../../config'
import TreeNode from './TreeNode'
import { INode } from '../../types/SidebarType'
import { parseFile, sortByIndexAndLabel } from 'utils/mdUtils'

const calculateTreeData = edges => {
    const originalData = config.sidebar.ignoreIndex
        ? edges.filter(
              ({
                  node: {
                      fields: { slug },
                  },
              }) => slug !== '/',
          )
        : edges

    /**
     * node 배열을 트리로 구성합니다.
     * accu = {
     *  label : A
     *  items : [
     *      {
     *          label : B,
     *          items : [
     *              {
     *                  label : D,
     *                  items : [],
     *                  prev : B,
     *              },
     *              {
     *                  label : E,
     *                  items : [],
     *                  prev : B,
     *              }
     *          ],
     *          prev : A,
     *      },
     *      {
     *          label : C,
     *          items : [],
     *          prev : A,
     *      }
     *  ]
     * }
     */
    const tree = originalData.reduce(
        (
            accu,
            {
                node: {
                    fields: { slug, title },
                    frontmatter: { hide },
                },
            },
        ) => {
            // console.log('slug', slug)
            const parts = slug.split('/') // File 경로 (/hello/coding/world)
            let { items: currentItems } = accu // 하위의 아이템 목록

            // ['FRONT', 'REAR']
            const slicedParts = config.gatsby && config.gatsby.trailingSlash ? parts.slice(1, -2) : parts.slice(1, -1)

            // 'FRONT'가 없다면 '빈 FRONT' NODE를 만듭니다.
            let current,
                prev = accu

            for (const part of slicedParts) {
                if (current) {
                    prev = current
                }
                current = currentItems && currentItems.find(({ label }) => label == part)
                if (current) {
                    if (!current.items) {
                        current.items = []
                    }
                } else {
                    current = { label: part, items: [], prev }
                    currentItems.push(current)
                }
                currentItems = current.items
            }

            const slicedLength = config.gatsby && config.gatsby.trailingSlash ? parts.length - 2 : parts.length - 1

            // My CustomIndex
            // const parent = prev.items.find(({ label }) => label === parts[slicedLength - 1])
            // let parentIndex, childIndex
            // if (parent && parent.index) {
            //     parentIndex = parent.index + '.'
            // }
            // if (existIndex(index)) {
            //     childIndex = parentIndex ? parentIndex + index : index
            // }

            // 파일이름규칙 '1__filename.md'
            const { index, filename } = parseFile(parts[parts.length - 1])

            // [1] 기존 노드를 변경함 (임시 노드일 수 있음)
            const child = currentItems.find(({ label }) => label === parts[slicedLength])
            if (child) {
                child.url = slug
                child.index = index
                child.title = filename
                child.hide = hide
                // existingItem.collapsed = collapsed
            }
            // [2] 새로운 노드를 추가함
            else {
                currentItems.push({
                    label: parts[slicedLength],
                    url: slug,
                    items: [],
                    index,
                    title: filename,
                    hide,
                    // collapsed,
                })
            }
            return accu
        },
        { items: [], prev: null },
    )

    const {
        sidebar: { forcedNavOrder = [] },
    } = config

    const tmp = [...forcedNavOrder]

    if (config.gatsby && config.gatsby.trailingSlash) {
        //
    }

    tmp.reverse()
    return tmp.reduce((accu, slug) => {
        const parts = slug.split('/')

        let { items: prevItems } = accu

        const slicedParts = config.gatsby && config.gatsby.trailingSlash ? parts.slice(1, -2) : parts.slice(1, -1)

        for (const part of slicedParts) {
            let tmp = prevItems.find(item => item && item.label == part)

            if (tmp) {
                if (!tmp.items) {
                    tmp.items = []
                }
            } else {
                tmp = { label: part, items: [] }
                prevItems.push(tmp)
            }
            if (tmp && tmp.items) {
                prevItems = tmp.items
            }
        }
        // sort items alphabetically.
        prevItems.map(item => {
            item.items.map(innerItem => {
                innerItem.items = sortByIndexAndLabel(innerItem.items)
            })
            item.items = sortByIndexAndLabel(item.items)
        })
        const slicedLength = config.gatsby && config.gatsby.trailingSlash ? parts.length - 2 : parts.length - 1
        const index = prevItems.findIndex(({ label }) => label === parts[slicedLength])

        if (prevItems.length) {
            accu.items.unshift(prevItems.splice(index, 1)[0])
        }
        return accu
    }, tree)
}

const Tree = ({ edges, tab }) => {
    // * ref
    const entryTree: RefObject<INode> = useRef(calculateTreeData(edges))

    // * state
    const [treeData, setTreeData] = useState<INode>({ items: [] })
    const [collapsed, setCollapsed] = useState<any>({})

    useEffect(() => {
        entryTree.current.items.forEach((node: INode) => {
            if (node.label === tab) {
                setTreeData({ items: setHide(node.items) })
            }
        })
    }, [tab])

    const setHide = (items: INode[]) => {
        const filteredItems = items.filter((node: INode) => {
            return !node.hide
        })

        return filteredItems
    }

    // TODO
    const setCollapsedNav = (items: INode[]) => {
        const defaultCollapsed = {}
        items.forEach((node: INode) => {
            if (config.sidebar.propertyNav[node.url].collapsed) {
                defaultCollapsed[node.url] = true
            } else {
                defaultCollapsed[node.url] = false
            }
        })
        setCollapsed(defaultCollapsed)
    }

    const toggle = url => {
        setCollapsed({
            ...collapsed,
            [url]: !collapsed[url],
        })
    }

    return (
        <TreeNode
            className={`${config.sidebar.frontLine ? 'showFrontLine' : 'hideFrontLine'} firstLevel`}
            setCollapsed={toggle}
            collapsed={collapsed}
            {...treeData}
        />
    )
}

export default Tree
