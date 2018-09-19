import Test from '../models/Test';

export default class TestService {
  public static findAll() {
    return Test.findAll();
  }

  public static create(test) {
    return Test.create(test);
  }
}
