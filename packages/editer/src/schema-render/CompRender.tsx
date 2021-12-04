import { useStore } from '@/hooks';
import React, { useRef, FC, ComponentClass, useMemo, memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
type RE = FC | ComponentClass;

export interface CompRenderProps {
  componentName: string;
  id: string;
  props?: any;
  idx: number;
  install: {
    [componentName: string]: {
      componentNameCN: string;
      comp: RE;
      props?: Partial<any>;
    };
  };
}

const CompRender: FC<CompRenderProps> = (CompRenderProps) => {
  const { componentName, install, id, props = {} } = CompRenderProps;

  const Ele = install[componentName].comp;


  return <Ele {...props} data-schema-id={id} />;
};

export default memo(CompRender);
