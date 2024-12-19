import { Query } from "mongoose";

class QueryBuilder<T>{
    public modelQuery : Query<T[], T>
    public query : Record<string, unknown>
}