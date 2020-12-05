import { diseases, log, signs } from './index';

type disease = {
    name: string,
    signs: string[]
}

export const genSignsTable = () : void => {
    diseases.find({})
        .then((all) => {
            const sings_collected = new Set<string>();
            all.forEach(one => {
                one.signs.forEach((element: string) => {
                    sings_collected.add(element);
                });
            })
            setSigns(sings_collected);
        })
}

const setSigns = (possibleSigns: Set<string>) => {
    possibleSigns.forEach(async value => {
        const existing = await signs.findOne({ name: value })
        if (!existing) {
            const created = await signs.insert({ name: value });
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