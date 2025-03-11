import {
  unstable_createContext,
  unstable_RouterContextProvider,
  type unstable_MiddlewareFunction,
} from "react-router";

/** 環境変数 */
type Env = {
  mode: "development" | "production";
};

/** 環境変数コンテキスト */
const envContext = unstable_createContext<Env>();

/** 環境変数を取得する */
export const getEnv = (context: unstable_RouterContextProvider) => {
  const env = context.get(envContext);
  if (!env) {
    throw new Error("envContext not found");
  }
  return env;
};

/** 環境変数を設定する */
export const envMiddleware: unstable_MiddlewareFunction = async (
  { context },
  next
) => {
  context.set(envContext, {
    mode: import.meta.env.MODE === "production" ? "production" : "development",
  });
  return next();
};
