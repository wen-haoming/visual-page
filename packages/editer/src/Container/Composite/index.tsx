import { usePrefix } from '@/hooks/usePrefix';
import { memo, useState } from 'react';
import { Collapse } from 'antd';
import {
  FormOutlined,
  ApartmentOutlined,
  HistoryOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import DragItem from './DragItem';

import './index.less';

const { Panel } = Collapse;
import { install } from '../defaultSetting';

const Header = () => {
  const prefixCls = usePrefix('composite');
  const [currentMenu, setCurrentMenu] = useState(0);

  return (
    <aside className={prefixCls}>
      <div className={`${prefixCls}-menu`}>
        <div
          className={`${prefixCls}-menu-btn ${
            currentMenu === 0 ? 'active' : ''
          }`}
          onClick={() => setCurrentMenu(0)}
        >
          <FormOutlined />
        </div>
        <div
          className={`${prefixCls}-menu-btn  ${
            currentMenu === 1 ? 'active' : ''
          }`}
          onClick={() => setCurrentMenu(1)}
        >
          <ApartmentOutlined />
        </div>
        <div
          className={`${prefixCls}-menu-btn ${
            currentMenu === 2 ? 'active' : ''
          }`}
          onClick={() => setCurrentMenu(2)}
        >
          <HistoryOutlined />
        </div>
      </div>
      <div className={`${prefixCls}-comp`}>
        <div className={`${prefixCls}-comp-tt`}>组件物料</div>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className={`${prefixCls}-comp-collapse`}
        >
          <Panel
            header="基础组件"
            key="1"
            className={`${prefixCls}-comp-collapse-panel`}
          >
            <div className={`${prefixCls}-comp-box`}>
              {Object.entries(install).map(([key, val]) => {
                return (
                  <DragItem
                    key={key.toString()}
                    title={val.componentNameCN}
                    itemData={{ componentName: key, ...val }}
                  />
                );
              })}
            </div>
          </Panel>
          <Panel
            header="远程组件"
            key="2"
            className={`${prefixCls}-comp-collapse-panel`}
          ></Panel>
          <Panel
            header="模板组件"
            key="3"
            className={`${prefixCls}-comp-collapse-panel`}
          ></Panel>
        </Collapse>
      </div>
    </aside>
  );
};

export default memo(Header);
