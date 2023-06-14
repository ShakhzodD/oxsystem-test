import lodashGet from "lodash/get";

export interface IAuthState {
  isFetched?: boolean;
  isAuthenticated?: boolean;
  data?: object;
  token?: string;
}
export const authInitialState: IAuthState = {
  isFetched: false,
  isAuthenticated: false,
  data: {},
  token: "",
};

export interface IAuthFunc {
  signIn: (data: { data?: any | undefined; token?: string } | undefined) => any;
  getMe: (data: { data?: object | undefined; token?: string }) => any;
  logOut: () => void;
}
export const authReducer = (set: any, get: any): IAuthFunc => {
  return {
    signIn: (action: any) => {
      return set((state: any) => {
        return {
          auth: {
            ...lodashGet(state, "auth"),
            isFetched: true,
            isAuthenticated: true,
            token: lodashGet(action, "token"),
            data: lodashGet(action, "data"),
          },
        };
      });
    },
    getMe: ({ data = {}, token = "" }) =>
      set((state: any) => {
        return {
          auth: {
            ...lodashGet(state, "auth"),
            isFetched: true,
            isAuthenticated: true,
            token: token ? token : lodashGet(state, "auth.token"),
            data: data,
          },
        };
      }),
    logOut: () =>
      set((state: any) => {
        return {
          auth: {
            ...lodashGet(state, "auth"),
            isFetched: false,
            isAuthenticated: false,
            token: "",
            data: {},
          },
        };
      }),
  };
};
