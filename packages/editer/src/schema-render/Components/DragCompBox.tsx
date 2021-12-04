import { useDragLayer } from 'react-dnd';
import { memo, useEffect, useCallback, useState, useRef } from 'react';
import { usePrefix, useStore } from '@/hooks';
import { MOVE_FLAG } from './Insertion';
import './dragCompBox.less';
import { getAttributeNode, judgePointAt } from '@/utils';

const DragLayer = (props: { currentDomId: string; dragEnd: boolean }) => {
  const { currentDomId, dragEnd } = props;
  const prefixCls = usePrefix('drag-comp-box');
  const [styles, setStyles] = useState({});
  const replaceDomRef = useRef<HTMLElement>();
  const { changeSchema } = useStore();

  const { isDragging } = useDragLayer((monitor) => {
    if ((monitor.getItem() || {}).dragFlag === MOVE_FLAG) {
      return {
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset(),
      };
    }
    return {};
  });

  const dragover = useCallback((e: ElementEventMap['fullscreenchange']) => {
    requestAnimationFrame(() => {
      const Node = getAttributeNode(e.target as HTMLElement, 'data-schema-id');
      if (Node) {
        const { left, top, right } = Node.getBoundingClientRect();

        const dir = judgePointAt({
          offsetX: e.offsetX,
          offsetY: e.offsetY,
          width: Node.offsetWidth,
          height: Node.offsetHeight,
        });

        if (dir === 'left') {
          setStyles({
            width: 3,
            height: Node.offsetHeight,
            left,
            top,
          });
          if (Node.previousElementSibling) {
            replaceDomRef.current = Node.previousElementSibling;
          }
        } else if (dir === 'right') {
          setStyles({
            width: 3,
            height: Node.offsetHeight,
            left: right,
            top,
          });
          if (Node.nextElementSibling) {
            replaceDomRef.current = Node.nextElementSibling;
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    if (dragEnd && currentDomId) {
      if (!currentDomId) return;
      changeSchema((schemaArr) => {
        const replaceIdx = schemaArr.findIndex(
          (item) =>
            item.id === replaceDomRef.current?.getAttribute('data-schema-id'),
        );

        const previosIdx = schemaArr.findIndex(
          (item) => item.id === currentDomId,
        );
        const replaceItem = schemaArr[replaceIdx];

        console.log(replaceIdx, previosIdx);

        // schemaArr[replaceIdx] = schemaArr[previosIdx];
        // schemaArr[previosIdx] = replaceItem;

        return [...schemaArr];
      });
    }
  }, [dragEnd, currentDomId]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('dragover', dragover, false);
      return () => {
        document.removeEventListener('dragover', dragover, false);
      };
    } else {
    }
  }, [isDragging, currentDomId]);

  return <>{isDragging && <div className={prefixCls} style={styles}></div>}</>;
};

export default memo(DragLayer);
