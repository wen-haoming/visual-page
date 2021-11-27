import { usePrefix } from "@/hooks/usePrefix"
import { memo, useState } from "react"
import { Collapse, Row, Col } from 'antd'
import { AppstoreOutlined, FormOutlined, ApartmentOutlined, HistoryOutlined, CaretRightOutlined } from '@ant-design/icons'
import './index.less';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


const Header = () => {
    const prefixCls = usePrefix('composite')
    const [currentMenu, setCurrentMenu] = useState(0)

    return <aside className={prefixCls}>
        <div className={`${prefixCls}-menu`} >
            <div className={`${prefixCls}-menu-btn ${currentMenu === 0 ? 'active' : ''}`} onClick={() => setCurrentMenu(0)}>
                <FormOutlined />
            </div>
            <div className={`${prefixCls}-menu-btn  ${currentMenu === 1 ? 'active' : ''}`} onClick={() => setCurrentMenu(1)}>
                <ApartmentOutlined />
            </div>
            <div className={`${prefixCls}-menu-btn ${currentMenu === 2 ? 'active' : ''}`} onClick={() => setCurrentMenu(2)} >
                <HistoryOutlined />
            </div>
        </div>
        <div className={`${prefixCls}-comp`}>
            <div className={`${prefixCls}-comp-tt`}>组件物料</div>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className={`${prefixCls}-comp-collapse`}
            >
                <Panel header="基础组件" key="1" className={`${prefixCls}-comp-collapse-panel`}>
                    <div className={`${prefixCls}-comp-box`}>
                        <div className={`${prefixCls}-comp-box-item`}>
                            <AppstoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
                            <div>组件1</div>
                        </div>
                        <div className={`${prefixCls}-comp-box-item`}>
                            <AppstoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
                            <div>组件2</div>
                        </div>
                        <div className={`${prefixCls}-comp-box-item`}>
                            <AppstoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
                            <div>组件3</div>
                        </div>
                        <div className={`${prefixCls}-comp-box-item`}>
                            <AppstoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
                            <div>组件4</div>
                        </div>
                    </div>

                </Panel>
                <Panel header="远程组件" key="2" className={`${prefixCls}-comp-collapse-panel`}>
                    <div className={`${prefixCls}-comp-box`}>
                        <div className={`${prefixCls}-comp-box-item`}>
                            <AppstoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
                            <div>组件1</div>
                        </div>
                        <div className={`${prefixCls}-comp-box-item`}>
                            <AppstoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
                            <div>组件2</div>
                        </div>
                        <div className={`${prefixCls}-comp-box-item`}>
                            <AppstoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
                            <div>组件3</div>
                        </div>
                        <div className={`${prefixCls}-comp-box-item`}>
                            <AppstoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
                            <div>组件4</div>
                        </div>
                    </div>
                </Panel>
                <Panel header="模板组件" key="3" className={`${prefixCls}-comp-collapse-panel`}>
                    <div className={`${prefixCls}-comp-box`}>
                        <div className={`${prefixCls}-comp-box-item`}>
                            <AppstoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
                            <div>组件1</div>
                        </div>
                        <div className={`${prefixCls}-comp-box-item`}>
                            <AppstoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
                            <div>组件2</div>
                        </div>
                        <div className={`${prefixCls}-comp-box-item`}>
                            <AppstoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
                            <div>组件3</div>
                        </div>
                        <div className={`${prefixCls}-comp-box-item`}>
                            <AppstoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
                            <div>组件4</div>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>
    </aside>
}

export default memo(Header)