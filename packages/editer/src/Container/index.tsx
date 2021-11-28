import type { FC } from 'react';
import { layoutContext } from '@/context';
import Header from './Header';
import Composite from './Composite';
import Workspace from './Workspace';
import Settings from './Settings';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useInitStore, schemaContext } from '@/hooks';
import './index.less';
interface Props {
  prefix: string;
}

const Container: FC<Props> = (props) => {
  const { prefix } = props;
  const store = useInitStore();

  return (
    <layoutContext.Provider value={{ prefixCls: props.prefix }}>
      <schemaContext.Provider value={store}>
        <DndProvider backend={HTML5Backend}>
          <main className={`${prefix}-container`}>
            <Header />
            <main className={`${prefix}-container-layout`}>
              <Composite />
              <Workspace />
              <Settings />
            </main>
          </main>
        </DndProvider>
      </schemaContext.Provider>
    </layoutContext.Provider>
  );
};

Container.defaultProps = {
  prefix: 'vb',
};

export default Container;
