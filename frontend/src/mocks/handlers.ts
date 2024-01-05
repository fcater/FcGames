import { authHandlers } from "./handlers/auth";
import { userHandlers } from "./handlers/user";

export const handlers = authHandlers.concat(userHandlers);
