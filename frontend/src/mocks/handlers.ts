import {
  authHandlers,
  userHandlers,
  gameHandlers,
  fileHandlers,
} from "./handlers/index";

export const handlers = authHandlers
  .concat(userHandlers)
  .concat(gameHandlers)
  .concat(fileHandlers);
