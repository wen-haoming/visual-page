import { Button, Input, Select } from 'antd';
import { Schema, Install } from '@/schemaRender';
const { Option } = Select;

export const schema: Schema[] = [
  {
    componentName: 'Button',
    props: {
      type: 'primary',
      children: '按钮组件',
    },
  },
  {
    componentName: 'Input',
    props: {
      placeholder: 'Basic usage',
    },
  },
  {
    componentName: 'Input',
    props: {
      placeholder: 'Basic usage2',
    },
  },
  {
    componentName: 'Select',
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
];

export const install: Install = {
  Button: {
    comp: Button,
  },
  Input: {
    comp: Input,
  },
  Select: {
    comp: Select,
  },
};
