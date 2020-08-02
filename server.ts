import Koa from "koa";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const app = new Koa();
const port = process.env.PORT || 8080

const key = process.env.KEY || "";
const key_id = process.env.KEY_ID || "";
const team_id = process.env.TEAM_ID || "";

const token = () => jwt.sign({}, key, {
  algorithm: "ES256",
  issuer: team_id,
  expiresIn: "180d",
  header: {
    alg: "ES256",
    kid: key_id,
  },
});

app.use(async ctx => {
    ctx.body = {token: token()}
})

app.listen(port)