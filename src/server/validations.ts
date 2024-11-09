import { CleanlinessLevel, dummyChemical, Chemical } from '../framework/chemical.js';
import { FilterType, isNumberInRange } from '../framework/utils.js';
import { Request } from 'express';

export const validateRequest = (req: Request) => {
  let error = validateKeys(req);

  if (!validateQuantity(req)) {
    error += 'quantity must be a positive integer or undefined (for quantity of 1)\n';
  }

  if (!validateAmount(req)) {
    error += 'amout must be a positive number\n';
  }

  if (!validateCleanlinessLevel(req)) {
    error += `cleanlinessLevel must be an integer in range [${CleanlinessLevel.LAB_WORK},${CleanlinessLevel.ANALYTIC}]\n`;
  }

  return error;
};

export const extractQuantity = (req: Request) => {
  return +(req.query['quantity'] ?? 1);
};

const validateQuantity = (req: Request) => {
  const quantity = extractQuantity(req);
  if (!Number.isInteger(quantity)) {
    return false;
  }
  return isNumberInRange(req.body['quantity'] ?? '1', 1, Number.MAX_VALUE);
};

const validateAmount = (req: Request) => {
  return isNumberInRange(req.body['amount'], 0, Number.MAX_VALUE, false);
};

const validateCleanlinessLevel = (req: Request) => {
  const cleanlinessLevel = req.body['cleanlinessLevel'];
  return Number.isInteger(+cleanlinessLevel) && isNumberInRange(cleanlinessLevel, CleanlinessLevel.LAB_WORK, CleanlinessLevel.ANALYTIC);
};

const validateKeys = (req: Request) => {
  let error = '';
  Object.keys(dummyChemical).forEach((key) => {
    if (req.body[key as keyof Chemical] == undefined) {
      error += `Missing ${key} information\n`;
    }
  });
  return error;
};

export const getFilterType = (filterTypeParam: string): FilterType | undefined => {
  switch (filterTypeParam.toLowerCase()) {
    case 'and':
      return 'AND';
    case '':
      return 'AND';
    case 'or':
      return 'OR';
    default:
      return undefined;
  }
};
