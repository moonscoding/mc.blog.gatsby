import React from 'react'
import styled from '@emotion/styled'

import CodeBlock from './codeBlock'
import AnchorTag from './anchor'

const StyledPre = styled('pre')`
    padding: 16px;
    background: ${props => props.theme.colors.preFormattedText};
`

export default {
    h1: props => {
        console.log('[DEBUG] : h1 props', props)
        if (props.children) {
            if (typeof props.children !== 'string' && props.children.length) {
                props = {
                    children: props.children.reduce((a, b) => {
                        return a + b
                    }, ''),
                }
            }
        } else {
            props = {
                children: '',
            }
        }

        if (props.children && props.children.replace) {
            return <h1 className="heading1" id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />
        }
    },
    h2: props => {
        console.log('[DEBUG] : h2 props', props)
        if (props.children) {
            if (typeof props.children !== 'string' && props.children.length) {
                props = {
                    children: props.children.reduce((a, b) => {
                        return a + b
                    }, ''),
                }
            }
        } else {
            props = {
                children: '',
            }
        }
        if (props.children && props.children.replace) {
            return <h2 className="heading2" id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />
        }
    },
    h3: props => {
        console.log('[DEBUG] : h3 props', props)
        if (props.children) {
            if (typeof props.children !== 'string' && props.children.length) {
                props = {
                    children: props.children.reduce((a, b) => {
                        return a + b
                    }, ''),
                }
            }
        } else {
            props = {
                children: '',
            }
        }

        if (props.children && props.children.replace) {
            return <h3 className="heading3" id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />
        }
    },
    h4: props => {
        console.log('[DEBUG] : h4 props', props)
        if (props.children) {
            if (typeof props.children !== 'string' && props.children.length) {
                props = {
                    children: props.children.reduce((a, b) => {
                        return a + b
                    }, ''),
                }
            }
        } else {
            props = {
                children: '',
            }
        }
        if (props.children && props.children.replace) {
            return <h4 className="heading4" id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />
        }
    },
    h5: props => {
        console.log('[DEBUG] : h5 props', props)
        if (props.children) {
            if (typeof props.children !== 'string' && props.children.length) {
                props = {
                    children: props.children.reduce((a, b) => {
                        return a + b
                    }, ''),
                }
            }
        } else {
            props = {
                children: '',
            }
        }
        if (props.children && props.children.replace) {
            return <h5 className="heading5" id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />
        }
    },
    h6: props => {
        console.log('[DEBUG] : h6 props', props)
        if (props.children) {
            if (typeof props.children !== 'string' && props.children.length) {
                props = {
                    children: props.children.reduce((a, b) => {
                        return a + b
                    }, ''),
                }
            }
        } else {
            props = {
                children: '',
            }
        }
        if (props.children && props.children.replace) {
            return <h6 className="heading6" id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />
        }
    },
    p: props => <p className="paragraph" {...props} />,
    pre: props => (
        <StyledPre>
            <pre {...props} />
        </StyledPre>
    ),
    code: CodeBlock,
    a: AnchorTag,
    // TODO add `img`
    // TODO add `blockquote`
    // TODO add `ul`
    // TODO add `li`
    // TODO add `table`
}
