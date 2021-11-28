import { FC, memo, ReactChildren,ReactElement } from 'react';
import CompRender, { CompRenderProps } from './CompRender';

export interface Schema {
  componentName: string;
  props?: {
    children?: ReactChildren | string | ReactElement;
    [key: string]: any;
  };
  children?: Schema[] | string | number;
  [key: string]: any;
}

export type Install  = CompRenderProps['install']

interface Props {
  schema: Schema[];
  install: CompRenderProps['install'];
}

const SchemaRender: FC<Props> = (props) => {
  const { schema, install } = props;

  return (
    <>
      {schema.map((comp, idx) => {
        if (comp?.props?.children && Array.isArray(comp?.props?.children)) {
          return (
            <SchemaRender
              key={idx.toString()}
              schema={comp.props.children}
              install={install}
            />
          );
        }
        return (
          <CompRender
            key={idx.toString()}
            install={install}
            componentName={comp.componentName}
            props={comp.props}
          />
        );
      })}
    </>
  );
};

export default memo(SchemaRender);
