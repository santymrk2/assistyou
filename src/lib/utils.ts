import {createHash} from 'node:crypto'

export const generateId = (str: string) => {
    return createHash('sha256').update(str).digest('hex');
}
