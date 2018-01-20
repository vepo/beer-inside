import { ConflictError } from "./ConflictError";
import { NotFoundError } from "./NotFoundError";

export * from "./ConflictError";
export * from "./NotFoundError";

export function getErrorStatus(err: Error) {
  if (err instanceof ConflictError) {
    return 409;
  } else if (err instanceof NotFoundError) {
    return 404;
  } else {
    return 500;
  }
}