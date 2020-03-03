function compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
  middleware.forEach(fn => {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
  });

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function(context, next) {
    // 记录上一次执行中间件的位置
    let index = -1;
    let result = null;
    function dispatch(i) {
      // 理论上 i 会大于 index，因为每次执行一次都会把 i递增，如果相等或者小于，则说明next()执行了多次
      // if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      if (i <= index) return new Error('next() called multiple times');
      index = i;
      const fn = middleware[i];
      //  if (!fn) return Promise.resolve();
      if (i === middleware.length) {
        result = next();
        return result;
      }
      if (!fn) return null;
      try {
        // return Promise.resolve(fn(context, () => dispatch(i + 1)));
        return fn(context, () => dispatch(i + 1));
      } catch (err) {
        return err;
      }
    }
    dispatch(0);
    return result;
  };
}

export default compose;
