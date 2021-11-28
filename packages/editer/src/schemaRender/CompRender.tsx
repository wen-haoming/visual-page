import React, { FC, ComponentClass, useLayoutEffect } from 'react';

type RE = FC | ComponentClass;

export interface CompRenderProps {
  componentName: string;
  props?: any;
  install: {
    [componentName: string]: {
      comp: RE;
      compProps?: Partial<any>;
    };
  };
}

const CompRender: FC<CompRenderProps> = (props) => {
  const { componentName, install, props: eleProps = {} } = props;

  const Ele = install[componentName].comp;

  useLayoutEffect(() => {
    if (install[componentName].compProps) {
      Object.assign(eleProps, install[componentName].compProps);
    }
  }, []);

  return <Ele {...eleProps}/>;
};

export default CompRender;
