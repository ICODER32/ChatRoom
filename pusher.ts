import Pusher from "pusher";
import ClientPusher from "pusher-js";
export const serverPusher = new Pusher({
  appId: "1557177",
  key: "c4f44b214dd3bdb36248",
  secret: "ceb269bf41e9fd6e1a46",
  cluster: "ap2",
  useTLS: true,
});
export const clientPusher = new ClientPusher("c4f44b214dd3bdb36248", {
  cluster: "ap2",
  forceTLS: true,
});
