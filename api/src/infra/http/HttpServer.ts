/* eslint-disable @typescript-eslint/ban-types */
interface HttpServer {
  on(method: string, url: string, callback: Function): void;
  listen(port: number): void;
}

export default HttpServer;