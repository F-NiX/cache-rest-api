import {PlatformApplication} from "@tsed/common";
import {Configuration, Inject} from "@tsed/di";
import "@tsed/mongoose";
import "@tsed/platform-express";
import "@tsed/swagger";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
const { json, urlencoded } = require("express");

@Configuration({
  rootDir: __dirname,
  acceptMimes: ["application/json"],
  port: process.env.PORT || 8000,
  httpsPort: false,
  passport: {},
  mongoose: {
    url: process.env.mongoose_url || "mongodb://127.0.0.1:27017/hoory",
    connectionOptions: {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  swagger: [{
    path: "/api-docs"
  }],
  debug: false
})
export class Server {
  @Inject()
  app: PlatformApplication;

  $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(json())
      .use(urlencoded({
        extended: true
      }));

    return null;
  }
}
