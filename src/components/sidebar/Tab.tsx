import { useState, FunctionComponent, useEffect } from 'react'
import { ETab } from '../../types/SidebarType'

interface IProps {
    tab: ETab
    setTab: (tab: ETab) => void
}

const Tab: FunctionComponent<IProps> = ({ tab, setTab }) => {
    /**
     * 'pathname'에 따른 TAB 설정
     * **/
    useEffect(() => {
        for (let tab in ETab) {
            const value = ETab[tab]
            if (location.pathname.indexOf(value) === 1) {
                setTab(ETab[tab])
                break
            }
        }
    }, [])

    return (
        <div>
            {Object.keys(ETab).map((tab, i) => (
                <button
                    key={i}
                    onClick={() => {
                        setTab(ETab[tab])
                    }}>
                    {tab}
                </button>
            ))}
        </div>
    )
}

export default Tab
