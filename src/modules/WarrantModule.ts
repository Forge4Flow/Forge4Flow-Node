import Forge4FlowClient from "../Forge4FlowClient";
import Query from "../types/Query";
import Warrant, {
  isSubject,
  isWarrantObject,
  ListWarrantOptions,
  WarrantParams,
} from "../types/Warrant";

export default class WarrantModule {
  public static async create(warrant: WarrantParams): Promise<Warrant> {
    try {
      return await Forge4FlowClient.httpClient.post({
        url: "/v1/warrants",
        data: {
          objectType: isWarrantObject(warrant.object)
            ? warrant.object.getObjectType()
            : warrant.object.objectType,
          objectId: isWarrantObject(warrant.object)
            ? warrant.object.getObjectId()
            : warrant.object.objectId,
          relation: warrant.relation,
          subject: isSubject(warrant.subject)
            ? warrant.subject
            : {
                objectType: warrant.subject.getObjectType(),
                objectId: warrant.subject.getObjectId(),
              },
          context: warrant.context,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  public static async delete(warrant: WarrantParams): Promise<void> {
    try {
      return await Forge4FlowClient.httpClient.delete({
        url: "/v1/warrants",
        data: {
          objectType: isWarrantObject(warrant.object)
            ? warrant.object.getObjectType()
            : warrant.object.objectType,
          objectId: isWarrantObject(warrant.object)
            ? warrant.object.getObjectId()
            : warrant.object.objectId,
          relation: warrant.relation,
          subject: isSubject(warrant.subject)
            ? warrant.subject
            : {
                objectType: warrant.subject.getObjectType(),
                objectId: warrant.subject.getObjectId(),
              },
          context: warrant.context,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  public static async queryWarrants(
    query: Query,
    listOptions: ListWarrantOptions = {}
  ): Promise<Warrant[]> {
    try {
      return await Forge4FlowClient.httpClient.get({
        url: "/v1/query",
        params: {
          ...query.toObject(),
          ...listOptions,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
