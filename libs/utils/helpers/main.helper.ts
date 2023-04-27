import * as crypto from 'node:crypto';

// get type of element
export const typeOf = (value) => Object.prototype.toString.call(value).slice(8, -1);

export const keysOfEnum = (e: unknown) => {
  return Object.keys(e).filter((k) => Number.isNaN(Number(k)));
};

// handle data
export const pickData = <T, K extends keyof T>(data: T, fields: K[]) => {
  const keys = fields as string[];
  return Object.fromEntries(keys.map((key) => [key, data[key]])) as Pick<T, K>;
};

export const hashHmac = (algorithm: string, data: string, secret: string) => {
  return crypto.createHmac(algorithm, Buffer.from(secret, 'hex')).update(data).digest('hex');
};
