import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

export const timestampColumns = {
  updatedAt: t
    .timestamp({ mode: "date", precision: 3 }) // Note: jsのDateが3桁なのでそれに合わせる
    .$onUpdate(() => new Date()),
  createdAt: t.timestamp().defaultNow().notNull(),
  deletedAt: t.timestamp(),
};
