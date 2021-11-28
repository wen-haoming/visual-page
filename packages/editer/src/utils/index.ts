
export const getAttributeNode = (ele: HTMLElement,attribute:string) => {
    if (!ele) return null;
    while (ele.getAttribute && !ele.getAttribute(attribute) && ele !== document.body) {
      // eslint-disable-next-line no-param-reassign
      ele = ele.parentNode;
    }
    return ele;
  };