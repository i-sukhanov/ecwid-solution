import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';
import { EActionsApi } from '@/enums/Actions';

const BASE_URL = 'http://localhost:3000/api';
const TOKEN = 'public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD';

export const makeURL = (
  path: string,
  query: Record<string, string>
): string => {
  const url = new URL(`${BASE_URL}/${path}`);
  if (url.pathname.endsWith('/')) {
    url.pathname = url.pathname.substring(0, url.pathname.length - 1);
  }
  url.search = new URLSearchParams(query).toString();
  return url.toString();
};

const normalisePath = (path: string) => path.replace(/^\/?api\//, '');

export const baseApi = defineStore('baseApi', {
  state: () => {
    return { requests: {} as Record<string, AbortController> };
  },
  getters: {
    BASE_URL: () => BASE_URL,
  },
  actions: {
    [EActionsApi.SET_REQUEST]({
      requestId,
      handler,
    }: {
      requestId: string;
      handler: AbortController;
    }) {
      this.requests[requestId] = handler;
    },
    [EActionsApi.DELETE_REQUEST](requestId: string): void {
      const controller: AbortController = this.requests[requestId];
      if (controller && typeof controller.abort === 'function') {
        controller.abort();
        delete this.requests[requestId];
      }
    },
    [EActionsApi.CANCEL_REQUEST](requestId: string): void | Promise<boolean> {
      if (this.requests[requestId]) {
        this[EActionsApi.DELETE_REQUEST](requestId);
      }
      return Promise.resolve(true);
    },
    [EActionsApi.CANCEL_ALL_REQUESTS](): void | Promise<boolean> {
      Object.keys(this.requests).forEach((key) => {
        this[EActionsApi.CANCEL_REQUEST](key);
      });
      return Promise.resolve(true);
    },
    async [EActionsApi.REQUEST]<T>(config: any): Promise<T> {
      const {
        method = 'GET',
        path = '',
        body = null,
        query = {},
        headers = {},
        cancel = () => { },
      } = config;

      const requestId = nanoid();
      const controller = new AbortController();
      const signal = controller.signal;
      signal.addEventListener('abort', cancel);

      try {
        this[EActionsApi.SET_REQUEST]({ requestId, handler: controller });

        const response = await fetch(makeURL(normalisePath(path), query), {
          method,
          headers: {
            Accept: 'application/json',
            ContentType: 'application/json',
            AccessControlAllowOrigin: '*',
            Authorization: `Bearer ${TOKEN}`,
            ...headers,
          },
          body,
          signal,
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        return data;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        this[EActionsApi.DELETE_REQUEST](requestId);
      }
    },
  },
});
