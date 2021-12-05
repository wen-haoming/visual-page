import { useDragLayer } from 'react-dnd';
import { memo, useEffect, useCallback, useState, useRef } from 'react';
import { usePrefix, useStore } from '@/hooks';
import { MOVE_FLAG } from './Insertion';
import './dragCompBox.less';
import { getAttributeNode, judgePointAt, swap } from '@/utils';

const DragLayer = (props: { dropEndCb: (node:HTMLElement,dir:'left' | 'right') => void }) => {
  const { dropEndCb } = props;
  const prefixCls = usePrefix('drag-comp-box');
  const [styles, setStyles] = useState({});
  const replaceDomRef = useRef<{ node?: HTMLElement; dir?: 'left' | 'right' }>(
    {},
  );

  const { isDragging } = useDragLayer((monitor) => {
    if ((monitor.getItem() || {}).dragFlag === MOVE_FLAG) {
      return {
        isDragging: monitor.isDragging(),
      };
    }
    return {};
  });

  useEffect(() => {
    const dragover = (e: ElementEventMap['fullscreenchange']) => {
      const Node = getAttributeNode(e.target as HTMLElement, 'data-schema-id');
      if (Node) {
        const { left, top, right } = Node.getBoundingClientRect();

        const dir = judgePointAt({
          offsetX: e.offsetX,
          width: Node.offsetWidth,
        });

        if (dir === 'left') {
          setStyles({
            width: 3,
            height: Node.offsetHeight,
            left,
            top,
          });
          replaceDomRef.current = { node: Node, dir: 'left' };
        } else if (dir === 'right') {
          setStyles({
            width: 3,
            height: Node.offsetHeight,
            left: right,
            top,
          });
          replaceDomRef.current = { node: Node, dir: 'right' };
        }
      }
    };

    const dragend = (e: ElementEventMap['fullscreenchange']) => {
      const { node, dir } = replaceDomRef.current;
      if (!node || !dir) return;
      dropEndCb(node,dir)
    };

    document.addEventListener('dragover', dragover, false);
    document.addEventListener('dragend', dragend);
    return () => {
      document.removeEventListener('dragover', dragover, false);
      document.removeEventListener('dragend', dragend, false);
    };
  }, []);

  return <>{isDragging && <div className={prefixCls} style={styles}></div>}</>;
};

export default memo(DragLayer);
