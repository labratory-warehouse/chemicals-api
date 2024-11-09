import { Router, Request, Response } from 'express';
import { deleteChemical, getChemicals, insertChemical } from '../framework/chemicals-db.js';
import { Chemical } from '../framework/chemical.js';
import { extractQuantity, getFilterType, validateRequest } from './validations.js';

export const router = Router();

router.get('/chemicals/:filterType?', async (req: Request, res: Response<Chemical[]>) => {
  try {
    const filterType = getFilterType(req.params.filterType ?? '');
    if (filterType == undefined) {
      res.statusMessage = 'Bad filter type';
      res.status(400).end();
      return;
    }
    res.send((await getChemicals(req.query as Partial<Chemical>, filterType)) as Chemical[]);
  } catch (e) {
    console.log(`ERROR in get ${e}`);
  }
});

router.delete('/chemicals', async (req: Request, res: Response<Chemical[] | string>) => {
  try {
    const error = validateRequest(req);
    if (error) {
      res.status(400);
      res.send(error);
      return;
    }
    res.send(await deleteChemical(req.body as Chemical, extractQuantity(req)));
  } catch (e) {
    console.log(`ERROR in delete ${e}`);
  }
});

router.post('/chemicals', async (req: Request, res: Response<Chemical[] | string>) => {
  try {
    const error = validateRequest(req);
    if (error) {
      res.status(400);
      res.send(error);
      return;
    }
    res.send(await insertChemical(req.body as Chemical, extractQuantity(req)));
  } catch (e) {
    console.log(`ERROR in post ${e}`);
  }
});
