import { create, State, StateCreator, StoreMutatorIdentifier } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";
import { authInitialState, authReducer, IAuthFunc, IAuthState } from "./auth";

type Logger = <
  T extends State,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T extends State>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  type T = ReturnType<typeof f>;

  const loggedSet: typeof set = (...a) => {
    set(...a);

    console.log(
      "%cstore state:",
      "color: #4CAF50; font-weight: bold",
      ...(name ? [`${name}:`] : []),
      get()
    );
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

type TUseStore = {
  auth: IAuthState;
};

type MyPersist = (
  config: StateCreator<TUseStore>,
  options: PersistOptions<TUseStore>
) => StateCreator<TUseStore & IAuthFunc>;

export const useStore = create<TUseStore & IAuthFunc>(
  logger(
    (persist as MyPersist)(
      (set, get) => ({
        auth: { ...authInitialState },
        ...authReducer(set, get),
      }),
      {
        name: "apoint-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
