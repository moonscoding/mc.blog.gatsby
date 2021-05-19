import styled from '@emotion/styled'

export const RightSidebarSwitch = styled(({ show, setShow }) => {
    return (
        <button
            onClick={e => {
                setShow(!show)
            }}>
            {show ? '>' : '<'}
        </button>
    )
})`
    position: absolute;
    padding: 10px;
    top: 50px;
    left: -50px;
`
