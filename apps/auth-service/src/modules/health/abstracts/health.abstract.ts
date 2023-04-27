export abstract class AbstractHealthService {
  abstract ping(): Promise<string>;
}
