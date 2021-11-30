import { usePrefix } from '@/hooks';
import { getAttributeNode } from '@/utils';
import {
  FC,
  memo,
  ReactChildren,
  ReactElement,
  useEffect,
  useRef,
} from 'react';
import CompRender, { CompRenderProps } from './CompRender';
import Insertion from './Insertion';
import './index.less';
export interface Schema {
  componentName: string;
  id: string;
  props?: {
    children?: ReactChildren | string | ReactElement;
    [key: string]: any;
  };
  children?: Schema[] | string | number;
  [key: string]: any;
}

export type Install = CompRenderProps['install'];

interface Props {
  schema: Schema[];
  install: CompRenderProps['install'];
  onChange?: (schema: Schema[]) => void;
}

const SchemaRender: FC<Props> = (props) => {
  const { schema, install } = props;
  const prefixCls = usePrefix('schema-render');

  return (
    <>
      <div className={prefixCls}>
        {schema.map((schemaItem, idx) => {
          if (
            schemaItem?.props?.children &&
            Array.isArray(schemaItem?.props?.children)
          ) {
            return (
              <SchemaRender
                key={idx.toString()}
                schema={schemaItem.props.children}
                install={install}
              />
            );
          }
          return (
            <CompRender
              key={schemaItem.id}
              install={install}
              componentName={schemaItem.componentName}
              idx={idx}
              id={schemaItem.id}
              props={schemaItem.props}
            />
          );
        })}
      </div>
      <Insertion canvasClassName={prefixCls}  />
    </>
  );
};

export default memo(SchemaRender);
