import { useEffect, useState } from 'react';
import { usePrefix } from '@/hooks';
import { FC, memo } from 'react';
import { getAttributeNode } from '@/utils';

interface Props {
  canvasClassName: string;
}

const Insertion: FC<Props> = (props) => {
  const { canvasClassName } = props;
  const prefixCls = usePrefix('insertion');
  const [currentDom, setCurrentDom] = useState<HTMLElement>();

  useEffect(() => {
    const canvasDom = document.querySelector(`.${canvasClassName}`);
    if (canvasDom) {
      const mousemove = (e: DocumentEventMap['mousemove']) => {
        if (e.target && canvasDom.contains(e.target as HTMLElement)) {
          const Node = getAttributeNode(
            e.target as HTMLElement,
            'data-schema-id',
          );
          if (Node) {
            setCurrentDom(Node);
          }
        }
      };
      document.addEventListener('mousemove', mousemove, false);
    }
  }, []);

  return (
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
        }}
      ></div>
    </div>
  );
};

export default memo(Insertion);
