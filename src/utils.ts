import { diseases, log, signs } from './index';

type disease = {
    name: string,
    signs: string[],
    causes: string,
    complications: string,
    therapy: string
}

export const genSignsTable = (possibleSigns: string[]) : void => {
    possibleSigns.forEach(async e => {
        const existing = await signs.findOne({ name: e });
        if (!existing) {
            const created = await signs.insert({ name: e });
            log.debug(`${JSON.stringify(created)}`);
        }
    })
}

export const getPossibles = async (wanted: string[]) : Promise<disease[]> => {
    const possy: disease[] = [];
    const all_des = await diseases.find();
    all_des.forEach(e => {
        if (checker(e.signs, wanted)) possy.push(e);
    })
    return possy;
}

const checker = (arr: string[], target: string[]) => target.every(v => arr.includes(v));