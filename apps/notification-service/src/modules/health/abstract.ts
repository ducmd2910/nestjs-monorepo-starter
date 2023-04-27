export abstract class AbstractHealthService {
  abstract ping(message: string): void;
  abstract eventTest(message: string): void;
}
