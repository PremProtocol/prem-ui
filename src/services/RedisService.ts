import axios, { AxiosInstance } from 'axios';
import { createContext } from 'react';

class RedisService {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
    });
  }

  async get(key: string): Promise<any> {
    try {
      const response = await this.client.get(`/GET/${key}`);
      return response.data.GET;
    } catch (error) {
      console.error('Error getting object from Redis:', error);
      throw error;
    }
  }

  async set(key: string, value: any): Promise<any> {
    try {
      const response = await this.client.get(`/SET/${key}/${value}`);
      return response.data;
    } catch (error) {
      console.error('Error setting object in Redis:', error);
      throw error;
    }
  }

  async getObject(key: string): Promise<any> {
    try {
      const response = await this.client.get(`/GET/${key}`);
      return JSON.parse(response.data.GET);
    } catch (error) {
      console.error('Error getting object from Redis:', error);
      throw error;
    }
  }
  
  async setObject(key: string, value: object): Promise<any> {
    try {
      const response = await this.client.get(`/SET/${key}/${JSON.stringify(value,(_, v) => typeof v === 'bigint' ? Number(v) : v)}`);
      return response.data;
    } catch (error) {
      console.error('Error setting object in Redis:', error);
      throw error;
    }
  }

  async delete(key: string): Promise<any> {
    try {
      const response = await this.client.get(`/DEL/${key}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting key from Redis:', error);
      throw error;
    }
  }
}

export default RedisService;