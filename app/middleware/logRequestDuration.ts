import type { unstable_MiddlewareFunction } from "react-router";

/** リクエストにかかった時間(単位:ms)をログに出力する */
export const logRequestDurationMiddleware: unstable_MiddlewareFunction = async (
  { request },
  next
) => {
  const start = performance.now();

  const res = await next();
  let duration = performance.now() - start;
  console.log(`Navigated to ${request.url} (${duration}ms)`);
  return res;
};
