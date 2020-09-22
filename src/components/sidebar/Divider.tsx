import styled from '@emotion/styled'

const Divider = styled(props => (
    <li {...props}>
        <hr />
    </li>
))`
    list-style: none;
    padding: 0.5rem 0;

    hr {
        margin: 0;
        padding: 0;
        border: 0;
        border-bottom: 1px solid #ede7f3;
    }
`

export default Divider
