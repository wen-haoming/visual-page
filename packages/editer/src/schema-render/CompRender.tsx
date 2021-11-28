import React, { FC, ComponentClass, useMemo, memo } from 'react';

type RE = FC | ComponentClass;

export interface CompRenderProps {
  componentName: string;
  props?: any;
  install: {
    [componentName: string]: {
      componentNameCN: string;
      comp: RE;
      props?: Partial<any>;
    };
  };
}

const CompRender: FC<CompRenderProps> = (CompRenderProps) => {
  const { componentName, install, props = {} } = CompRenderProps;

  const Ele = install[componentName].comp;

  useMemo(() => {
    if (install[componentName].props) {
      Object.assign(props, install[componentName].props);
    }
  }, []);

  return <Ele {...props} />;
};

export default memo(CompRender);
