import { useDrag, useDrop } from 'react-dnd';
import type {
  FactoryOrInstance,
  DropTargetHookSpec,
  DragSourceHookSpec,
} from 'react-dnd';

// 生成拖拽源
export const createDnd = (type: string) => {
  return {
    useDndDrag<DragObject, DropResult, CollectedProps>(
      specArg: FactoryOrInstance<
        Omit<DragSourceHookSpec<DragObject, DropResult, CollectedProps>,'type'>
      >,
      deps?: unknown[],
    ) {
      return useDrag(
        () => ({
          ...specArg,
          type,
        }),
        deps,
      );
    },
    useDndDrop<DragObject, DropResult, CollectedProps>(
      props: FactoryOrInstance<
        Omit<DropTargetHookSpec<DragObject, DropResult, CollectedProps>,'accept'>
      >,
      deps?: unknown[],
    ) {
      return useDrop(
        () => ({
          ...props,
          accept: type,
        }),
        deps,
      );
    },
  };
};
