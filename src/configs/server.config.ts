interface ServerConfig {
  port: number;
  stage: string;
}

export const serverConfig: ServerConfig = {
  port: +process.env.SERVER_PORT,
  stage: process.env.SERVER_STAGE,
};
