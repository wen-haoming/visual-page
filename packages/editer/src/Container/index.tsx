import type { FC } from 'react'

const Container: FC = (props) => {

    return <div>{
        props.children
    }</div>
}

export default Container