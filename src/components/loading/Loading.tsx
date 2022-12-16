import React from 'react'

const Loading = (props: any) => {
    return (
        <div className={`skeleton ${props.className}`} style={{
            width: props.width || '100%',
            height: props.height,
            borderRadius: props.radius
        }}>Loading</div>
    )
}

export default Loading