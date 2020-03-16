/** @format */

import { useState, useEffect } from 'react';
import { isObject, isString, isFunction, hasIn } from 'lodash-es';
import produce from 'immer';
import equal from 'fast-deep-equal';
import compose from './compose';

/**
 * Utils
 */
const throwError = errMsg => {
  if (errMsg) console.error(errMsg);
};

const modelError = ({ type, key, value }) =>
  type &&
  throwError(
    {
      notExist: `modelError："${key}：${value}" does not exist`,
      notString: `modelError："${key}：${value}" must be a string`,
      notObject: `modelError："${key}：${value}" must be a object`,
      notFunction: `modelError："${key}：${value}" must be a function`,
      modelHasExist: `modelError："${key}：${value}" model has exist`,
    }[type] || 'modelError: no type',
  );

/**
 * Initialized models
 */

const models = {};
const middlewares = [];
const middlewareCallback = compose(middlewares);

export const useMiddleware = fn => {
  if (typeof fn !== 'function') return throwError('middleware must be a function!');
  middlewares.push(fn);
  return middlewares;
};
// useDispatch
export const useDispatch = ({ type, payload }) => {
  if (!isString(type)) return modelError({ type: 'notString', key: 'dispatch-type', value: type });
  const [modelName, actionName] = type.split('/');
  const { actions } = models[modelName] || {};
  if (!hasIn(models, modelName)) {
    modelError({ type: 'notExist', key: `dispatch-model-${modelName}`, value: modelName });
    return Promise.reject();
  }
  if (!hasIn(actions, actionName)) {
    modelError({ type: 'notExist', key: 'dispatch-actionName', value: actionName });
    return Promise.reject();
  }
  const action = actions[actionName];
  return Promise.resolve(action({ type, payload }));
};
// 获取当前model 适用的dispatch
const getDispatch = getModelName => {
  return ({ type, payload }) => {
    if (!isString(type)) return modelError({ type: 'notString', key: `model-put-type`, value: type });
    const arr = type.split('/');
    if (arr.length <= 0) return modelError({ type: 'notExist', key: `model-put-type`, value: type });
    const modelName = (getModelName && getModelName(type)) || '';
    const actionName = arr[arr.length - 1];
    const _type = `${modelName}/${actionName}`;
    return useDispatch({
      type: _type,
      payload,
    });
  };
};
/**
 * Initialize a model
 */

export const createModel = model => {
  if (!isObject(model)) return modelError({ type: 'notObject', key: 'createModel-model', value: model });

  const { namespace, state: initialState, actions: initialActions } = model;

  if (!namespace) return modelError({ type: 'notExist', key: 'createModel-namespace', value: namespace });

  if (!isString(namespace)) return modelError({ type: 'notString', key: 'createModel-namespace', value: namespace });

  if (!isObject(initialState)) return modelError({ type: 'notObject', key: 'createModel-state', value: model });

  if (hasIn(models, namespace)) return modelError({ type: 'modelHasExist', key: 'createModel-model', value: model });

  // model-setState
  const setState = payload => {
    if (!isObject(payload)) {
      return modelError({ type: 'notObject', key: `setState-payload`, value: payload });
    }
    if (!hasIn(models, namespace)) {
      return modelError({ type: 'notExist', key: `setState-model`, value: namespace });
    }
    const { state, setters } = models[namespace] || {};
    const newState = produce(state, draft => ({
      ...draft,
      ...payload,
    }));
    models[namespace].state = newState;
    const shouldUpdate = !equal(state, newState);
    if (shouldUpdate) {
      setters.forEach(function(setter) {
        setter(newState);
      });
    }
    return newState;
  };

  // model-action =>store
  const _select = selector => {
    const store = Object.keys(models).reduce((states, modelName) => {
      states[modelName] = (models[modelName] || {}).state;
      return states;
    }, {});
    const state = selector && isFunction(selector) ? selector(store) : store;
    return state;
  };
  const getDisptchModelName = type => {
    const arr = type.split('/');
    const _name = arr[0];
    const isHasModelName = arr.length > 1 && _name;
    const modelName = isHasModelName ? _name : namespace;
    return modelName;
  };
  const _dispatch = getDispatch(getDisptchModelName);
  // 设置model 对应 actions
  const actions = Object.entries(initialActions).reduce((_actions, [actionName, rawAction]) => {
    _actions[actionName] = (...rest) => {
      const _state = (models[namespace] || {}).state;
      const context = { state: _state, set: setState, select: _select, put: _dispatch };
      const action = () => rawAction(context, ...rest);
      const res = middlewareCallback(context, action);
      return res;
    };
    return _actions;
  }, {});

  models[namespace] = {
    state: produce(initialState, draft => draft),
    actions,
    setters: new Set(),
  };

  return models[namespace];
};

//  获取 useStore 方法
const getUseStore = namespace => {
  if (!isString(namespace)) return modelError({ type: 'notString', key: `getUseStore-namespace`, value: namespace });
  if (!hasIn(models, namespace)) return modelError({ type: 'notExist', key: `getUseStore-model`, value: namespace });

  return selector => {
    const { state, setters } = models[namespace] || {};
    if (!state) return modelError({ type: 'notExist', key: `selector-model-state`, value: namespace });
    const setState = useState(state)[1];
    const store = selector && isFunction(selector) ? selector(state) : state;

    useEffect(() => {
      setters.add(setState);
      return () => setters.delete(setState);
    }, [setters]);

    return store;
  };
};

export const useModel = namespace => {
  const useStore = getUseStore(namespace);
  const _dispatch = getDispatch(() => namespace);
  return [useStore, _dispatch];
};
