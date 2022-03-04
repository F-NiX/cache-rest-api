import {BodyParams, Controller, Delete, Get, PathParams, Post, Put} from "@tsed/common";
import {Required, Status, Description, Summary} from "@tsed/schema";
import {NotFound} from "@tsed/exceptions";
import {Cache} from "../../models/caches/Cache";
import {CachesService} from "../../services/caches/CachesService";

/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 *
 * In this case, EventsCtrl is a dependency of CachesCtrl.
 * All routes of EventsCtrl will be mounted on the `/caches` path.
 */
@Controller({
  path: "/caches"
})
export class CachesCtrl {
  constructor(private cachesService: CachesService) {

  }

  /**
   *
   * @param {string} key
   * @returns {Promise<ICache>}
   */
  @Get("/")
  @Summary("Return all caches (by their keys).")
  @Status(200, {description: "Success", type: Array})
  async all(): Promise<String[]> {

    return await this.cachesService.keys();
  }

  /**
   *
   * @param {string} key
   * @returns {Promise<ICache>}
   */
  @Get("/:key")
  @Summary("Get / Make a cache value.")
  @Status(200, {description: "Success", type: String})
  async get(@Required() @PathParams("key") key: string): Promise<String> {

    return await this.cachesService.fetch(key);
  }

  /**
   *
   * @param id
   * @param cache
   * @returns {Promise<Cache>}
   */
  @Post("/:key")
  @Summary("Insert / Update cache value.")
  @Status(200, {description: "Success", type: Cache})
  async upsert(
    @Required() @PathParams("key") @Required() key: string,
    @BodyParams("value") @Required() value: string
  ): Promise<void> {

    this.cachesService.upsert(key, value);
  }

  /**
   *
   * @param id
   * @returns {{id: string, name: string}}
   */
  @Delete("/")
  @Summary("Remove all caches.")
  @Status(204, {description: "No content"})
  async clear(): Promise<void> {

    await this.cachesService.clear();
  }

  /**
   *
   * @param id
   * @returns {{id: string, name: string}}
   */
  @Delete("/:key")
  @Summary("Remove a cache.")
  @Status(204, {description: "No content"})
  async remove(@Required() @PathParams("key") key: string): Promise<void> {

    await this.cachesService.remove(key);
  }
}
