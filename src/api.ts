import Router from 'express';
import { log, diseases, signs } from './index';
import { genSignsTable, getPossibles } from './utils';

export const router = Router();

router.post('/new_disease', async (req, res) => {
    log.debug(`Received following POST data: ${JSON.stringify(req.body)}`);
    const { name, signs } = req.body;

    if (name === '') {
        log.warn(`Received new disease without name. Data: ${JSON.stringify(req.body)}`);
        res.status(409).json({
            msg: `Error: No name provided.`
        });
    }   else if (!signs || signs.length === 0) {
        log.warn(`Received new disease without signs. Data: ${JSON.stringify(req.body)}`);
        res.status(409).json({
            msg: `Error: No sings provided.`
        });
    } else {
        const exisiting = await diseases.findOne({ name: name });
        
        if (exisiting) {
            res.status(403).json({
                msg: `Error: Disease already in database. Use Update if you wanna change the signs.`
            });
            log.warn(`Attempt to insert already exisiting disease (${name})`);
        } else {
            const new_dis = {
                name: name,
                signs: signs
            }

            await diseases.insert(new_dis);
            log.debug(`Inserted new diseases: ${JSON.stringify(new_dis)}`);
            res.json({
                msg: `Created disease.`
            });
            genSignsTable();
        }
    }
});

router.get('/get_disease/:id', (req, res) => {
    const { id:name } = req.params;

    diseases.findOne({ name: name })
        .then((doc) => {
            if (doc) res.json(doc);
            else res.json({ msg: `No disease present with this name.`});
        })
        .catch((err) => {
            log.warn(`Error getting a disease from database (${err})`);
            res.json({
                msg: `Error: Can't fetch disease. (${err})`
            });
        });
});

router.post('/update', (req, res) => {
    log.debug(`Received following POST data: ${JSON.stringify(req.body)}`);
    const { name, signs } = req.body;

    diseases.findOneAndUpdate({ name: name }, { $set: { signs: signs } })
        .then((doc) => {
            log.debug(`Updated ${name} to: ${JSON.stringify(doc)}`);
            res.json({
                msg: `${name} updated.`
            });
            genSignsTable();
        })
        .catch((err) => {
            log.warn(`Error getting a disease from database (${err})`);
            res.json({
                msg: `Error: Can't update disease. (${err})`
            });
        });
});

router.get('/signs', (req, res) => {
    log.debug(`Returning all singns present in db.`);
    signs.find()
        .then(all => {
            const clean: string[] = [];
            all.forEach(e => clean.push(e.name));
            res.json(clean);
        })
});

router.get('/possible_disease', async (req, res) => {
    const { signs } = req.body;
    if (!signs || signs.length === 0) {
        log.warn(`Getting possible disease without signs.`)
        res.status(403).json({
            msg: `Error: No signs provided.`
        });
    } else {
        log.debug(`Getting possible diseases for these signs: ${signs}`)
        const possibles = await getPossibles(signs)
    
        res.json(possibles);
    }
});