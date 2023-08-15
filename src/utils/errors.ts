export class CustomError extends Error {
    status: number;
  
    constructor(message: string) {
      super(message);
      this.status = 400;
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(message: string) {
      super(message);
      this.status = 404;
    }
  }