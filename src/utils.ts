import { diseases, log, signs } from './index';

export const genSignsTable = () => {
    diseases.find({})
        .then((all) => {
            let sings_collected = new Set<string>();
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

export const getPossibles = async (wanted: string[]) => {
    const possy: any[] = [];
    const all_des = await diseases.find();
    all_des.forEach(e => {
        if (checker(e.signs, wanted)) possy.push(e);
    })
    return possy;
}

const checker = (arr: any[], target: any[]) => target.every(v => arr.includes(v));