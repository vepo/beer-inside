import { BadRequestError } from "./BadRequestError";
import { ConflictError } from "./ConflictError";
import { NotFoundError } from "./NotFoundError";

export * from "./BadRequestError";
export * from "./ConflictError";
export * from "./NotFoundError";

export function getErrorStatus(err: Error) {
  if (err instanceof BadRequestError) {
    return 400;
  } else if (err instanceof NotFoundError) {
    return 404;
  } else if (err instanceof ConflictError) {
    return 409;
  } else {
    return 500;
  }
}
