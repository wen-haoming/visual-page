import { Button, Input, Select } from 'antd';
// import { Schema, Install } from '@/schema-render';

type Schema = any
type Install = any

const { Option } = Select;

export const schema: Schema[] = [];

export const install: Install = {
  Button: {
    comp: Button,
    componentNameCN: '按钮组件',
    props: {
      type: 'primary',
      children: 'Basic usage1',
    },
  },
  Input: {
    comp: Input,
    componentNameCN: '输入组件',
    props: {
      placeholder: 'Basic usage2',
    },
  },
  Select: {
    comp: Select,
    componentNameCN: '选择组件',
    props: {
      children: (
        <>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
        </>
      ),
      style: {
        width: 200,
      },
    },
  },
};
