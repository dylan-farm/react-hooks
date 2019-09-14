/**
 * 请求错误处理
 * @param errMsg
 * @param data
 * @param reject
 */
export const consoleError = (errMsg, errorObj, reject, data) => {
  // eslint-disable-next-line no-console
  console.error(errMsg, errorObj);
  reject && reject(data);
};
export const throwError = errMsg => {
  if (errMsg) throw new Error(errMsg);
};
/**
 * @param {string} name 错误名字
 * @param {string} action 错误动作描述
 * @param {any} info 错误信息，通常是 fail 返回的
 */
export const logError = (name = 'errorName', action = 'errorAction', info = {}) => {
  // let deviceInfo = {};
  // let device = '';
  // try {
  //     deviceInfo = (await getDeviceInfo()) || {};
  //     device = JSON.stringify(deviceInfo);
  // } catch (e) {
  //     consoleError('support getDeviceInfo api', e);
  // }
  // 上报异常工具调用
  // const time = dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
  const errorObj = {
    action,
    info,
    name,
    // time,
  };
  // let errorStr = '';
  // try {
  //     errorStr = JSON.stringify(errorObj);
  // } catch (e) {
  //     errorObj = e
  // }
  // eslint-disable-next-line no-console
  consoleError(`${name}-${action}-error`, errorObj);
  // window.Raven&&window.Raven.captureException(errorStr);
};
