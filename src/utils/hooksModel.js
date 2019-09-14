/** @format */

import { useState, useEffect } from 'react';
import { isObject, isString, isFunction, hasIn, assign } from 'lodash-es';
import { throwError } from './error';
/**
 * Utils
 */

const modelError = (type, key) =>
  type &&
  throwError(
    {
      notString: `modelError："${key}" must be a string`,
      notObject: `modelError："${key}" must be a object`,
      notFunction: `modelError："${key}" must be a function`,
      modelNotExist: `modelError："${key}" model does not exist`,
      modelHasExist: `modelError："${key}" model has exist`,
    }[type] || 'modelError: no type',
  );

/**
 * Initialized models
 */

const models = {};
/**
 * Initialize a model
 */

export const setModel = (name, model) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!isString(name)) return modelError('notString', name);

    if (!isObject(model)) return modelError('notObject', `${name}-model`);

    if (!isObject(model.state)) return modelError('notObject', `${name}-model-state`);

    if (!isFunction(model.actions)) return modelError('notFunction', `${name}-model-actions`);
  }

  if (hasIn(models, name)) return modelError('modelHasExist', `${name}-model`);

  const { state: initialState, actions: getActions } = model;

  const getModel = function getModel(modelName) {
    if (!modelName) {
      modelName = name;
    }

    const _models$modelName = models[modelName];
    const state = _models$modelName.state;
    const actions = _models$modelName.actions;
    return assign({}, state, {}, actions);
  };

  const setState = payload => {
    if (process.env.NODE_ENV !== 'production') {
      if (!isObject(payload)) {
        return modelError('notObject', `${name}-model-setState-payload`);
      }
    }

    const _models$name = models[name];
    const state = _models$name.state;
    const setters = _models$name.setters;

    const newState = assign({}, state, {}, payload);

    models[name].state = newState;
    setters.forEach(function(setter) {
      setter(newState);
    });
    return setters;
  };

  const actions = {};

  const setLoading = function setLoading(actionName, showLoading) {
    actions[actionName].loading = showLoading;
    setState({});
  };

  const rawActions = getActions({
    model: getModel,
    setState,
  });
  Object.entries(rawActions).forEach(function(_ref) {
    const actionName = _ref[0];
    const rawAction = _ref[1];

    actions[actionName] = function() {
      const res = rawAction(...arguments);
      if (!res || typeof res.then !== 'function') return res;
      return new Promise(function(resolve, reject) {
        setLoading(actionName, true);
        res
          .then(resolve)
          .catch(reject)
          .finally(function() {
            setLoading(actionName, false);
          });
      });
    };
  });
  models[name] = {
    state: initialState,
    actions,
    setters: [],
  };
  return models;
};
/**
 * Use a initialized model
 */

export const useModel = function useModel(name) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof name !== 'string') {
      // throw new Error(notString('name'))
      return modelError('notString', name);
    }

    if (!(name in models)) {
      // throw new Error(modelNotExist(name))
      return modelError('modelNotExist', name);
    }
  }

  const _useState = useState();
  const setState = _useState[1];

  const _models$name2 = models[name];
  const state = _models$name2.state;
  const actions = _models$name2.actions;
  const setters = _models$name2.setters;
  useEffect(
    function() {
      const index = setters.length;
      setters.push(setState);
      return function() {
        setters.splice(index, 1);
      };
    },
    [setters],
  );
  return assign({}, state, {}, actions);
};
