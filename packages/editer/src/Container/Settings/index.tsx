import { usePrefix } from '@/hooks/usePrefix';
import { memo,useState } from 'react';
import './index.less';

const Header = () => {
  const prefixCls = usePrefix('settings');
  const [cMenu,setCmenu] = useState(0)

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-menu`}>
        <div className={`${prefixCls}-menu-item ${cMenu === 0? 'active':''}`} onClick={()=>setCmenu(0)} >样式</div>
        <div className={`${prefixCls}-menu-item ${cMenu === 1? 'active':''}`} onClick={()=>setCmenu(1)}>属性</div>
        <div className={`${prefixCls}-menu-item ${cMenu === 2? 'active':''}`} onClick={()=>setCmenu(2)}>事件</div>
        <div className={`${prefixCls}-menu-item ${cMenu === 3? 'active':''}`} onClick={()=>setCmenu(3)}>数据</div>
      </div>
    </div>
  );
};

export default memo(Header);
