interface Connection {
  query(statement: string, params: any): Promise<any>;
  close(): Promise<void>;
}

export default Connection; 