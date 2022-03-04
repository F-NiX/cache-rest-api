import {Required, Default} from "@tsed/schema";
import {Model, ObjectID, Unique, PreHook} from "@tsed/mongoose";

async function updating(cache: Cache, next: any) {
  cache.update = new Date();
  next();
}

@Model()
@PreHook("findOneAndUpdate", updating)
@PreHook("findOne", updating)
export class Cache {
  @ObjectID("id")
  _id: string;

  @Unique()
  @Required()
  key: string;

  /**
   * Expire date will be controlled by this field
   * If the last update time is more than this plus 'expireTime',
   * then it should refresh its value after it has been read again
   * and if it is read before that time, the update time refreshes
   */
  // @Indexed()
  // @Property()
  // @Expires(expire)
  @Default(Date.now)
  update: Date;

  @Required()
  value: string;
}
