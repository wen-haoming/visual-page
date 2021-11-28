import { usePrefix } from '@/hooks/usePrefix';
import { memo } from 'react';
import { Space } from 'antd';
import { SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons';
import SchemaRender from '@/schemaRender';
import { install, schema } from '../defaultSetting';

import './index.less';

const Workspace = () => {
  const prefixCls = usePrefix('workspace');

  return (
    <div className={prefixCls}>
      <Space className={`${prefixCls}-h`}>
        <div className={`${prefixCls}-h-btn`}>
          <SwapLeftOutlined />
        </div>
        <div className={`${prefixCls}-h-btn`}>
          <SwapRightOutlined />
        </div>
      </Space>
      <div className={`${prefixCls}-viewport`}>
        <SchemaRender schema={schema} install={install} />
      </div>
    </div>
  );
};

export default memo(Workspace);
