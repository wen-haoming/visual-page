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

export interface Schema {
  componentName: string;
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
  const innerWrapperRef = useRef<HTMLDivElement>(null);
  const previosTargetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mousemove = (e: HTMLElementEventMap['mousemove']) => {
      if (!innerWrapperRef.current?.contains(e.target)) return;

      const targetNode = getAttributeNode(e.target, 'data-v-schema-idx');

      if (targetNode && previosTargetRef.current !== targetNode) {
        previosTargetRef.current?.classList.remove('inspect');
        targetNode.classList.add('inspect');
        previosTargetRef.current = targetNode;
        console.log(targetNode);
      }
    };

    const mouseleave = () => {
      previosTargetRef.current?.classList.remove('inspect');
    };

    document.addEventListener('mousemove', mousemove);
    return () => {
      document.removeEventListener('mousemove', mousemove);
    };
  }, []);

  return (
    <div ref={innerWrapperRef}>
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
            idx={idx}
            props={comp.props}
          />
        );
      })}
    </div>
  );
};

export default memo(SchemaRender);
