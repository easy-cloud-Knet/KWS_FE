import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}

interface AuthActions {
  refreshAccessToken: () => Promise<string | null>;
  logout: () => void;
}

let isInterceptorSetup = false;
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const createAxiosResponseInterceptor = (authActions: AuthActions) => {
  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;
      if (!error.response || error.response.status !== 401) {
        return Promise.reject(error);
      }

      if ((originalRequest as AxiosRequestConfig & { _retry?: boolean })._retry) {
        return Promise.reject(error);
      }

      (originalRequest as AxiosRequestConfig & { _retry?: boolean })._retry = true;

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest && originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            if (originalRequest) {
              return axios(originalRequest);
            }
            return Promise.reject(new Error("Original request is undefined"));
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        const refreshAccessToken = async () => {
          try {
            const newAccessToken = await authActions.refreshAccessToken();
            if (newAccessToken) {
              axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
              if (originalRequest && originalRequest.headers) {
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              }
              processQueue(null, newAccessToken);
              if (originalRequest) {
                resolve(axios(originalRequest));
              } else {
                reject(new Error("Original request is undefined"));
              }
            } else {
              processQueue(
                {
                  ...error,
                  message: "Failed to refresh token",
                  isAxiosError: true,
                  toJSON: () => ({}),
                } as AxiosError,
                null
              );
              authActions.logout();
              window.location.href = "/signin";
              reject(error);
            }
          } catch (err) {
            processQueue(err as AxiosError, null);
            authActions.logout();
            window.location.href = "/signin";
            reject(err);
          } finally {
            isRefreshing = false;
          }
        };
        refreshAccessToken();
      });
    }
  );
};

export const setupAxiosInterceptors = (authActions: AuthActions): void => {
  if (isInterceptorSetup) return;

  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  createAxiosResponseInterceptor(authActions);
  isInterceptorSetup = true;
};
