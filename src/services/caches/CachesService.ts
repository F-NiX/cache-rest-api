import {Inject, Service} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {$log} from "@tsed/logger";
import {Cache} from "../../models/caches/Cache";
import util from "../../util/helpers";
import config from "../../config";

@Service()
export class CachesService {
  @Inject(Cache)
  private Cache: MongooseModel<Cache>;

  constructor(@Inject(Cache) private model: MongooseModel<Cache>) {
    this.model = model;
  }

  $onInit() {
    this.clear();
  }

  /**
   *
   * @param key
   * @param value (optional)
   * @returns {Promise<String>}
   */
  async upsert(key: string, value?: string): Promise<String> {
    value = value || util.generateRandomString();
    await this.Cache.findOneAndUpdate(
      { key },
      { value, update: Date.now() },
      { upsert: true, useFindAndModify: false, new: true },
    ).exec();
    return value;
  }

  /**
   *
   * @param key
   * @returns {String}
   */
  async fetch(key: string): Promise<String> {
    const cache = await this.Cache.findOne({ key }).exec();
    if (
      cache &&
      (Date.now() - cache.update.getTime() < config.expireTime * 1000)
    ) {
      $log.debug("Cache hit");
      console.log("Cache hit");
      return this.upsert(key, cache.value);
    }
    else {
      $log.debug("Cache miss");
      console.log("Cache miss");
      return await this.upsert(key);
    }
  }

  /**
   *
   * @returns {String[]}
   */
  async keys(): Promise<String[]> {
    const keys = await this.Cache.find({}, "key");
    return keys.map((item) => item.key);
  }

  /**
   *
   * @param key
   * @returns {Promise<Cache>}
   */
  async remove(key: string): Promise<Cache> {
    return await this.Cache.findOneAndDelete({ key });
  }

  exists() {
    return new Promise((resolve, reject) => {
      this.model.db.db.listCollections({ name: "caches" }).next(async (err, info) => {
        if (!!err) return reject(err);
        resolve(info);
      });
    });
  }

  /**
   *
   * @returns {Promise<Cache>}
   */
  async clear() {
    if (await this.exists()) {
      await this.model.collection.drop();
    }
    this.model.createCollection({
      capped : true,
      size : config.maximumSize,
      max : config.maximumLimit
    });
    return 'OK';
  }

  /**
   *
   * @returns {Promise<Cache>}
   */
  async count() {
    return await this.Cache.count({});
  }
}
