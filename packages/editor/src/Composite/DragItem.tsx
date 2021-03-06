import { usePrefix } from '../hooks';
import { AppstoreOutlined } from '@ant-design/icons';
import { FC, memo } from 'react';
import { useDrag } from 'react-dnd';
// import { Schema } from '@/schema-render';
import { useStore } from '../hooks';
import { uid } from '@visual-page/shared';


type Schema = any

interface Props {
  itemData: Omit<Schema,'id'>;
  title: string;
}

const DragItem: FC<Props> = (props) => {
  const { itemData } = props;
  const prefixCls = usePrefix('composite');
  const { changeSchema } = useStore();

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'component',
      end(item, monitor) {
        if (monitor.didDrop()) {
          const newItemData  = { ...itemData } ;
          Reflect.deleteProperty(newItemData, 'comp');
          Reflect.deleteProperty(newItemData, 'componentNameCN');
          newItemData.id = uid()

          changeSchema((schemeArr) => {
            return [...schemeArr, newItemData];
          });
        }
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [],
  );

  return (
    <div
      className={`${prefixCls}-comp-box-item`}
      ref={dragRef}
      style={{ opacity }}
      onClick={() => {
        const newItemData = { ...itemData };
        Reflect.deleteProperty(newItemData, 'comp');
        Reflect.deleteProperty(newItemData, 'componentNameCN');
        newItemData.id = uid()

        changeSchema((schemeArr) => {
          return [...schemeArr, newItemData];
        });
      }}
    >
      <AppstoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
      <div>{itemData.componentName}</div>
    </div>
  );
};

export default memo(DragItem);
