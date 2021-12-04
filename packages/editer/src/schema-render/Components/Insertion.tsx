import { useEffect, useState, useRef} from 'react';
import { usePrefix } from '@/hooks';
import { FC, memo } from 'react';
import { getAttributeNode } from '@/utils';
import { DragOutlined } from '@ant-design/icons';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import DragCompBox from './DragCompBox';

interface Props {
  canvasClassName: string;
}

export const MOVE_FLAG = 'COMPONENT_MOVE';
export const TYPE_FLAG = 'box1';

const Insertion: FC<Props> = (props) => {
  const { canvasClassName } = props;
  const prefixCls = usePrefix('insertion');
  const [currentDom, setCurrentDom] = useState<HTMLElement | null>(null);
  const [dragEnd, setDragEnd] = useState(false);
  const boxMenuRef = useRef<HTMLElement | null>();

  const [{ isDragging }, drag, preview] = useDrag({
    type: TYPE_FLAG,
    item(item) {
      return {
        didDrop:item.didDrop(),
        dragFlag: MOVE_FLAG,
      };
    },
    collect: (monitor) => {
        if( monitor.isDragging()){
          setDragEnd(false)
        }
      return ({
      isDragging: monitor.isDragging(),
    })},
    
    end() {
      setDragEnd(true) 
    },
  });

  useEffect(() => {
    const canvasDom = document.querySelector(`.${canvasClassName}`);
    if (canvasDom) {
      const mousemove = (e: ElementEventMap['fullscreenchange']) => {
        const targetDom = e.target as HTMLElement;
        if (
          targetDom &&
          (targetDom === canvasDom || boxMenuRef.current === targetDom)
        ) {
          return;
        }

        if (targetDom && canvasDom.contains(targetDom)) {
          const Node = getAttributeNode(targetDom, 'data-schema-id');
          if (Node) {
            setCurrentDom(Node);
          }
        }
      };
      canvasDom.addEventListener('mousemove', mousemove, false);

      return () => {
        canvasDom.removeEventListener('mousemove', mousemove, false);
      };
    }
  }, []);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <>
      <DragCompBox
      dragEnd={dragEnd}
        currentDomId={currentDom?.getAttribute('data-schema-id') || ''}
      />
      {currentDom && (
        <>
          <div className={prefixCls}>
            <div
              className={`${prefixCls}-box`}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: currentDom?.offsetWidth,
                height: currentDom?.offsetHeight,
                transform: `translate3d(${currentDom?.offsetLeft}px, ${currentDom?.offsetTop}px,0)`,
                border: isDragging ? 'none' : '',
                background: 'rgba(0,0,0,.2)',
              }}
            >
              <div ref={boxMenuRef} className={`${prefixCls}-box-menu`}>
                <div className={`${prefixCls}-box-menu-item`} ref={drag}>
                  {!isDragging && (
                    <div className={`${prefixCls}-box-menu-item-bg`}>
                      <DragOutlined />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default memo(Insertion);
