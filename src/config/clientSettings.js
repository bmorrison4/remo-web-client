const { serverPort } = require("./serverSettings");

const reCaptchaKey = "6Lfg_KYUAAAAAH1hvQdp-qDOUToVn6FQWFOvbySo";
const host = {
  local: "http://localhost"
};

const api = {
  api: "/api",
  signup: "/signup",
  auth: "/auth",
  login: "/login",
  robotServers: "/robot-server",
  listRobotServers: "/list"
};

module.exports = {
  defaultRate: 1000, //Message rate limit for most people
  minRate: 250, //Message rate limit for admins / server owners etc..
  slowMo: 30000, //Message rate limit for when we need to slow things down!
  reCaptchaSiteKey: reCaptchaKey,
  socketUrl: `${host.local}:${serverPort}`,
  apiUrl: `${host.local}:${serverPort}${api.api}`,
  apiAuth: `${host.local}:${serverPort}${api.api}${api.auth}`,
  apiSignup: `${host.local}:${serverPort}${api.api}${api.signup}`,
  apiLogin: `${host.local}:${serverPort}${api.api}${api.login}`,
  listRobotServers: `${host.local}:${serverPort}${api.api}${api.robotServers}${
    api.listRobotServers
  }`,
  addServer: `${host.local}:${serverPort}${api.api}/robot-server/create`,
  addChannel: `${host.local}:${serverPort}${api.api}/channels/create`,
  deleteChannel: `${host.local}:${serverPort}${api.api}/channels/delete`
};
