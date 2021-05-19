import { FC } from 'react'
import styled from '@emotion/styled'

interface IProps {
    show: boolean
    setShow: (show: boolean) => void
}

const RightSidebarSwitch: FC<IProps> = styled(({ show, setShow, ...props }) => {
    return (
        <button
            {...props}
            onClick={e => {
                setShow(!show)
            }}>
            {show ? '>' : '<'}
        </button>
    )
})`
    position: absolute;
    padding: 10px;
    left: -10px;
`

export default RightSidebarSwitch
