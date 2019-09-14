import { Toast } from 'antd-mobile';
import axios from 'axios';
import { logError } from './error';

const HTTP_STATUS = {
  CLIENT_ERROR: {
    statusCode: 400,
    message: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  },
  AUTHENTICATE: {
    statusCode: 401,
    message: '用户没有权限（令牌、用户名、密码错误）。',
  },
  FORBIDDEN: {
    statusCode: 403,
    message: '用户得到授权，但是访问是被禁止的。',
  },
  NOT_FOUND: {
    statusCode: 404,
    message: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  },
  SERVER_ERROR: {
    statusCode: 500,
    message: '服务器发生错误，请检查服务器。',
  },
  BAD_GATEWAY: {
    statusCode: 502,
    message: '网关错误。',
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    message: '服务不可用，服务器暂时过载或维护。',
  },
  GATEWAY_TIMEOUT: {
    statusCode: 504,
    message: '网关超时。',
  },
};

class Request {
  defaultOptions = {
    isShowLoading: false,
    loadingContent: '加载中...',
    loadingDuration: 0,
    params: {},
    data: {},
    url: '',
    method: 'GET',
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  /**
   * 检查http状态值
   * @param response
   * @returns {*}
   */
  checkHttpStatus(response, requestOptions, resolve, reject) {
    const { code, data, message, errMsg } = response || {};
    if (response && code === 0 && data && typeof data === 'object') {
      return resolve(response);
    }
    const httpStatus = Object.values(HTTP_STATUS).filter(v => v.statusCode === code)[0] || {
      statusCode: code,
      message: message || errMsg,
    };
    const info = {
      httpStatus,
      requestOptions,
      response,
    };
    logError('requestApi', 'reject', info);
    return reject(response);
  }

  /**
   * 检查环境 配置相应的 fetch 工具
   * @param options
   * @returns {Promise}
   */
  request(options) {
    const { header: optionsHeader = {} } = options || {};
    const header = {
      ...this.defaultOptions.header,
      ...optionsHeader,
    };

    const requestOptions = {
      ...this.defaultOptions,
      ...options,
      header,
    };
    const { isShowLoading, loadingContent, loadingDuration, ...data } = requestOptions;
    return new Promise((resolve, reject) => {
      isShowLoading && Toast.loading(loadingContent, loadingDuration);
      axios(data)
        .then(response => {
          isShowLoading && Toast.hide();
          return response;
        })
        .then(response => this.checkHttpStatus(response, requestOptions, resolve, reject))
        .catch(info => logError('requestApi', 'catch', info));
    });
  }

  get = (url, params, options) => this.request({ url, params, ...(options || {}), method: 'GET' });

  post = (url, data, options) => this.request({ url, data, ...(options || {}), method: 'POST' });
}

export default new Request();
