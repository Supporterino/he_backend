import Router from 'express';
import { log }from './index';

const router = Router();

router.post('/new_disease', (req, res) => {
    log.debug(`Received following POST data: ${JSON.stringify(req.body)}`);
    res.json('Received');
});

module.exports = router;
