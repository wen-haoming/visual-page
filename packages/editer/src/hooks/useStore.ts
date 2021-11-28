import { useState, useContext, createContext } from 'react';
import { Schema } from '@/schema-render';

type GlobalState = {
  schema: Schema[];
};

interface Store {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

export const schemaContext = createContext<Store>({
  globalState: { schema: [] },
  setGlobalState(val) {
    return val;
  },
});

export const useInitStore = () => {
  const [globalState, setGlobalState] = useState<GlobalState>({ schema: [] });

  return {
    globalState,
    setGlobalState,
  };
};

// 全局数据
export const useStore = () => {
  const { globalState, setGlobalState } = useContext<Store>(schemaContext);

  const changeSchema = (
    changeCb: (props: GlobalState['schema']) => GlobalState['schema'],
  ) => {
    setGlobalState((preGlobalState) => {
      return {
        ...preGlobalState,
        schema: changeCb(preGlobalState.schema),
      };
    });
  };

  return {
    globalState,
    schema: globalState.schema,
    changeSchema,
  };
};
