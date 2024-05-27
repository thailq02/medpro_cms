import store from "@/redux/store";
import displayError from "@/apiRequest/ErrorMessage/errors";
import Config from "@/config";
import {IStatus, ParamsType} from "@/apiRequest/common";
import {handleRefreshToken} from "@/apiRequest/ApiAuth";
import {notification} from "antd";

type EntityErrorPayload = {
  message: string;
  errors: {
    [key: string]: {
      msg: string;
      path: string;
      [key: string]: any;
    };
  };
};

export interface IDataError {
  errorCode: string;
  errorMessage?: any;
}

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({status, payload}: {status: number; payload: any}) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status = 422;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: number;
    payload: EntityErrorPayload;
  }) {
    super({status, payload});
    this.status = status;
    this.payload = payload;
  }
}

type CustomOptions = Omit<IFetcherOptions, "method"> & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;
const BAD_REQUEST_ERROR_STATUS = 400;
interface IFetcherOptions extends RequestInit {
  token?: string;
  withToken?: boolean;
  withMetadata?: boolean;
  displayError?: boolean;
  isFormData?: boolean;
  params?: ParamsType;
}

function getAuthorization(defaultOptions: IFetcherOptions) {
  if (defaultOptions.token) {
    return `Bearer ${defaultOptions.token}`;
  }
  if (defaultOptions.withToken) {
    const state = store.getState();
    const token = state.user.access_token;
    if (token) {
      return `Bearer ${token}`;
    }
  }
  return undefined;
}

const request = async <TResponse>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  options?: CustomOptions | undefined,
): Promise<{status: number; payload: TResponse}> => {
  const defaultOptions: CustomOptions = {
    withToken: Config.NETWORK_CONFIG.USE_TOKEN,
    withMetadata: Config.NETWORK_CONFIG.WITH_METADATA,
    displayError: Config.NETWORK_CONFIG.DISPLAY_ERROR,
    ...options,
  };

  /**
   * Nếu không truyền baseUrl hoặc baseUrl = undefined thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
   * Nếu truyền baseUrl thì lấy từ baseUrl, truyền vào rỗng thì đồng nghĩa với việc gọi api đến next server
   */
  const baseUrl =
    options?.baseUrl === undefined
      ? process.env.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  let fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

  if (options?.params) {
    const queryString = new URLSearchParams(options.params as any).toString();
    fullUrl += `?${queryString}`;
  }
  // fullUrl = http://localhost:4004/users?limit=5&page=1

  // Đối với upload file thì ko thể dùng JSON.stringify nên phải check xem body có FormData hay không
  const body = options?.body
    ? options?.body instanceof FormData || options?.isFormData
      ? options?.body
      : JSON.stringify(options.body)
    : undefined;
  const baseHeaders =
    options?.isFormData || options?.body instanceof FormData
      ? {
          Authorization: getAuthorization(defaultOptions),
        }
      : {
          "Content-Type": "application/json",
          "Authorization": getAuthorization(defaultOptions),
        };
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    method,
    body,
  });

  const payload: TResponse = await res.json();
  console.log("request ~ payload", payload);
  const data = {
    status: res.status,
    payload,
  };

  // Interseptor
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      const dataError: IDataError = {
        errorCode: "unique.ValidatorInvalid",
        errorMessage: "Lỗi validate",
      };
      displayError(dataError);
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        },
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      await handleRefreshToken();
      await request<TResponse>(method, url, options);
    } else if (res.status === BAD_REQUEST_ERROR_STATUS) {
      notification.error({
        message: (data.payload as any).message || "Xóa danh mục thất bại",
        duration: 3,
      });
      throw data;
    } else {
      throw new HttpError(data);
    }
  }
  if (data.payload === undefined) {
    const dataEmpty: IDataError = {
      errorCode: "ERROR???",
      errorMessage: "Data is empty",
    };
    if (defaultOptions.displayError) {
      displayError(dataEmpty);
    }
    throw new HttpError({status: IStatus.SUCCESS, payload: dataEmpty});
  }
  return data;
};

const http = {
  get<TResponse>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<TResponse>("GET", url, options);
  },
  post<TResponse>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<TResponse>("POST", url, {...options, body});
  },
  put<TResponse>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<TResponse>("PUT", url, {...options, body});
  },
  patch<TResponse>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<TResponse>("PATCH", url, {...options, body});
  },
  delete<TResponse>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<TResponse>("DELETE", url, {...options});
  },
};

export default http;
