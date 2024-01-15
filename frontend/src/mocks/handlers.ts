import {
  authHandlers,
  userHandlers,
  gameHandlers,
  fileHandlers,
  userGamesHandlers,
} from "./handlers/index";

export const handlers = authHandlers
  .concat(userHandlers)
  .concat(gameHandlers)
  .concat(fileHandlers)
  .concat(userGamesHandlers);
