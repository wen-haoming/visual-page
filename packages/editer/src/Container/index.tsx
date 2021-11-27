import type { FC } from 'react'
import { layoutContext } from '@/context'
import Header from './Header';
import Composite from './Composite';
import Workspace from './Workspace';
import Settings from './Settings';
import './index.less';
interface Props {
    prefix: string;
}

const Container: FC<Props> = (props) => {
    const { prefix } = props;

    return <layoutContext.Provider value={{ prefixCls: props.prefix }}>
        <main className={`${prefix}-container`}>
            <Header />
            <main className={`${prefix}-container-layout`}>
                <Composite />
                <Workspace />
                <Settings />
            </main>
        </main>
    </layoutContext.Provider>
}

Container.defaultProps = {
    prefix: 'vb'
}

export default Container