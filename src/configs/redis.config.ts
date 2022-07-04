interface RedisConfig {
  host: string;
  port: number;
}

export const redisConfig: RedisConfig = {
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
};
