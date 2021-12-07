import { usePrefix } from '../hooks/usePrefix';
import { memo } from 'react';
import { Space } from 'antd';
import { SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons';
import { useDrop } from 'react-dnd';
import { useStore } from '../hooks';
import './index.less';

const Workspace = () => {
  const prefixCls = usePrefix('workspace');
  const { globalState } = useStore();

  const [, dropRef] = useDrop(() => ({
    accept: ['component'],
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        item: monitor.getItem(),
      };
    },
  }));


  return (
    <div className={prefixCls} >
      <Space className={`${prefixCls}-h`}>
        <div className={`${prefixCls}-h-btn`}>
          <SwapLeftOutlined />
        </div>
        <div className={`${prefixCls}-h-btn`}>
          <SwapRightOutlined />
        </div>
      </Space>
      <div className={`${prefixCls}-viewport`} ref={dropRef}>
        {/* <SchemaRender schema={globalState.schema} install={install} /> */}
      </div>
    </div>
  );
};

export default memo(Workspace);
