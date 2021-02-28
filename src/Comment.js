import React from 'react'
import Collapsible from 'react-collapsible'

export default function Comment({ comment }) {
    return (
        <div dangerouslySetInnerHTML={{ __html: comment.body }}/>
    )
}
