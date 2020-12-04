/// <reference path="./index.ts" />

import Router from 'express';

const router = Router();

router.post('/new_disease', (req, res) => {
    log.silly(req.body);
    res.json('Received');
});

module.exports = router;