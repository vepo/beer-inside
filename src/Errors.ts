export class ConflictError extends Error {
  constructor(message) {
    super(message);
  }
}

export function getErrorStatus(err: Error) {
  if (err instanceof ConflictError) {
    return 409;
  }
}
