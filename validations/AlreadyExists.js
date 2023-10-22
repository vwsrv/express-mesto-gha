export default class AlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
