import WarrantClient from "../WarrantClient";
import Query from "../types/Query";
import Warrant, { isSubject, ListWarrantOptions, WarrantParams } from "../types/Warrant";

export default class WarrantModule {
    public static async create(warrant: WarrantParams): Promise<Warrant> {
        try {
            return await WarrantClient.httpClient.post({
                url: "/v1/warrants",
                data: {
                    objectType: warrant.object.getObjectType(),
                    objectId: warrant.object.getObjectId(),
                    relation: warrant.relation,
                    subject: isSubject(warrant.subject) ? warrant.subject : { objectType: warrant.subject.getObjectType(), objectId: warrant.subject.getObjectId() },
                    context: warrant.context
                },
            });
        } catch (e) {
            throw e;
        }
    }

    public static async delete(warrant: WarrantParams): Promise<void> {
        try {
            return await WarrantClient.httpClient.delete({
                url: "/v1/warrants",
                data: {
                    objectType: warrant.object.getObjectType(),
                    objectId: warrant.object.getObjectId(),
                    relation: warrant.relation,
                    subject: isSubject(warrant.subject) ? warrant.subject : { objectType: warrant.subject.getObjectType(), objectId: warrant.subject.getObjectId() },
                    context: warrant.context
                },
            });
        } catch (e) {
            throw e;
        }
    }

    public static async queryWarrants(query: Query, listOptions: ListWarrantOptions = {}): Promise<Warrant[]> {
        try {
            return await WarrantClient.httpClient.get({
                url: "/v1/query",
                params: {
                    ...query.toObject(),
                    ...listOptions
                },
            });
        } catch (e) {
            throw e;
        }
    }
}