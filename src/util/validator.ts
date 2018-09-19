import * as _ from 'lodash';

interface ErrInfo {
  message?: string;
  type?: string;
  param?: string;
  value?: any;
}

export interface ValidatorResult {
  status: number;
  message?: ErrInfo[];
  hasError: boolean;
}

/**
 * Request params validator.
 * @param {Object} body - An object need to validate
 * @param {Object} params - Key is a property of `body` need to validate, value is the expected type for `key`
 * @returns {Object} it has a property include all errors' message when occur error, otherwise return null.
 */

export const validator = (body, params): ValidatorResult => {
  const errArr: ErrInfo[] = [];

  const validate = (value, key, ...enumFields) => {
    switch (value.toLowerCase()) {
      case 'number':

        body[key] = Number(body[key]);

        if (isNaN(body[key])) {
          errArr.push({
            message: `Param \`${key}\` must be Number`,
            type: 'Request Params Invalid',
            param: key,
            value: body[key]
          });
        }

        break;

      case 'boolean':

        if (typeof body[key] === 'string' && body[key].toLowerCase() === 'true') {
          body[key] = Boolean(true);
        } else if (typeof body[key] === 'string' && body[key].toLowerCase() === 'false') {
          body[key] = Boolean(false);
        } else if (body[key] !== 'boolean') {
          errArr.push({
            message: `Param \`${key}\` must be Boolean`,
            type: 'Request Params Invalid',
            param: key,
            value: body[key]
          });
        }

        break;

      /**
       * When you want to validate value whose type is `enum`,
       * the `params` can be:
       * { key: ['value'] } or
       * { key: { type: `enum`, values: [`enumValue`]}}
       */
      case 'enum':

        if (enumFields[0].indexOf(body[key]) === -1) {
          errArr.push({
            message: `Value of param \`${key}\` must be in [ ${enumFields[0]} ]`,
            type: 'Request Params Invalid',
            param: key,
            value: body[key]
          });
        }

        break;

      case 'required':

        if (!body[key]) {
          errArr.push({
            message: `Param \`${key}\` is Required`,
            type: 'Request Params Invalid',
            param: key
          });
        }

        break;
    }
  };

  _.map(params, (paramValue, paramName) => {
    if (typeof paramValue === 'object') {

      if (Array.isArray(paramValue)) {
        validate('enum', paramName, paramValue);
      } else {
        validate(paramValue.type, paramName, paramValue.values);
      }

    } else {
      validate(paramValue, paramName);
    }
  });

  if (errArr.length === 0) {
    return {
      status: 200,
      hasError: false
    };

  } else {
    return {
      status: 400,
      message: errArr,
      hasError: true
    };
  }
};
