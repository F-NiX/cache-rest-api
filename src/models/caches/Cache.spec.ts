import {MongooseModel} from "@tsed/mongoose";
import {TestMongooseContext} from "@tsed/testing-mongoose";
import {expect} from "chai";
import {Cache} from "./Cache";

describe("UserModel", () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  it("should run pre and post hook", TestMongooseContext.inject([Cache], async (cacheModel: MongooseModel<Cache>) => {
    // GIVEN
    const cache = new cacheModel({
      key: "key"
    });

    // WHEN
    await cache.save();

    // THEN
    expect(cache.key).to.equal("key");
  }));
});
