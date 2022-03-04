import {PlatformTest} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import {TestMongooseContext} from "@tsed/testing-mongoose";
import {expect} from "chai";
import * as SuperTest from "supertest";
import {Server} from "../../src/Server";

describe("Rest", () => {
  // bootstrap your Server to load all endpoints before run your test
  let request: SuperTest.SuperTest<SuperTest.Test>;

  before(TestMongooseContext.bootstrap(Server, {platform: PlatformExpress})); // Create a server with mocked database
  before((done) => {
    request = SuperTest(PlatformTest.callback());
    done();
  });

  after(TestMongooseContext.reset); // reset database and injector

  describe("GET /rest/caches", () => {
    it("should do something", async () => {
      const response = await request.get("/rest/caches").expect(200);

      expect(response.body).to.be.an("array");
    });
  });

  // Other teset bluh bluh bluh
  /**
   * We can make cache and control it on timeoutes
   * In order to check if it exists and is different from before or not
   */
});
