import _ from 'lodash';

export const StrToNumber = (defaultValue: number, valueStr?: string): number => {
    if (valueStr) {
        const val = +valueStr;
        if (!Number.isNaN(val)) {
            return val;
        }
    }
    return defaultValue;
};

export const stripObject = (obj: any) => {
    const keys1 = _.keys(obj);
    const keys2 = _.remove(keys1, x => !x.startsWith('__'));
    return _.pick(obj, keys2);
};

export const resetDate = (value?: Date): Date => {
    let currentDate = new Date();
    if (value) {
        currentDate = new Date(value);
    }
    currentDate.setDate(currentDate.getDate() + 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 2);
    return endDate;
};

export function prjDelay(t: number) {
    return new Promise(resolve => setTimeout(resolve, t));
}

