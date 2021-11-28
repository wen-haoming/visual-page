import { useStore } from '@/hooks';
import React, { useRef, FC, ComponentClass, useMemo, memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
type RE = FC | ComponentClass;

export interface CompRenderProps {
  componentName: string;
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
  const { componentName, install, idx, props = {} } = CompRenderProps;

  const Ele = install[componentName].comp;
  const ref = useRef(null);
  const { changeSchema } = useStore();

  const [{ handlerId }, drop] = useDrop({
    accept: 'ele',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = idx;
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      
      changeSchema((scheme) => {
        const hoverItem = scheme[dragIndex];
        const currentItem = scheme[idx];
        
        scheme[dragIndex] = currentItem;
        scheme[idx] = hoverItem;

        return [...scheme];
      });
    },
  },[]);

  const [{ isDragging }, drag] = useDrag({
    type: 'ele',
    item: () => {
      return { id: idx, index: idx };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  useMemo(() => {
    if (install[componentName].props) {
      Object.assign(props, install[componentName].props);
    }
  }, []);

  drag(drop(ref));


  return (
      <Ele {...props} data-v-schema-idx={idx} />
  );
};

export default memo(CompRender);
