import {
  unstable_createContext,
  unstable_RouterContextProvider,
  type unstable_MiddlewareFunction,
} from "react-router";
import { getDBInstance, type DB } from "~/db/get-db-instance";

/** コンテキスト */
const dbContext = unstable_createContext<DB | null>();

/** データベースを取得する(初回はインスタンスを作成し、２回目以降はキャッシュを返す) */
export const getDB = (context: unstable_RouterContextProvider) => {
  let db = context.get(dbContext);
  if (!db) {
    db = getDBInstance();
    if (!db) throw new Error("faild to get db instance");
    context.set(dbContext, db);
  }
  return db;
};

/** DB ミドルウェア */
export const dbMiddleware: unstable_MiddlewareFunction = async (
  { context },
  next
) => {
  context.set(dbContext, null);
  return next();
};
