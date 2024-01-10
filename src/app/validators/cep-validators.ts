import { isNullOrEmpty } from './string-utils';

export function cepIsValid(cep: string): boolean {
    if (isNullOrEmpty(cep)) {
        return false;
    }

    if (hasInvalidCharacters(cep)){
        return false;
    }

    cep = cep.replaceAll('-', '');
    if (cep.length !== 8){
        return false;
    }

    return true;
}

function hasInvalidCharacters(cep: string): boolean {
    const regex = /[^0-9-]/;
    return regex.test(cep);
}