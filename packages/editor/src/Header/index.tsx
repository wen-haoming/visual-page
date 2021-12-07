import { usePrefix } from "../hooks/usePrefix"
import { memo } from "react"
import { Space, Button } from 'antd'
import { GithubOutlined,CloudDownloadOutlined,SendOutlined } from '@ant-design/icons';
import './index.less';

const Header = () => {
    const prefixCls = usePrefix('header');

    return <header className={prefixCls}>
        <span className={`${prefixCls}-tt`}>
            <span className={`${prefixCls}-tt-left`}>Visual</span> <span>build</span>
        </span>
        <Space className={`${prefixCls}-btns`}>
            <Button icon={<CloudDownloadOutlined />}>保存</Button>
            <Button target="_blank" href="https://github.com/wen-haoming/visual-build" icon={<GithubOutlined />}>github</Button>
            <Button icon={<SendOutlined />} type="primary">发布</Button>
        </Space>
    </header>
}

export default memo(Header)