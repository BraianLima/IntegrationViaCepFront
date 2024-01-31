import { isNullOrEmptyOrUndefined } from './string-utils';

export function cepIsValid(cep: string): boolean {
    //check if cep is null, empty or undefined, if true return invalid cep
    if (isNullOrEmptyOrUndefined(cep)) {
        return false;
    }
    
    //check if has invalid characters, if has return invalid cep
    if (hasInvalidCharacters(cep)){
        return false;
    }
    
    //replace '-' to '' to check only count numbers equals 8, if true return invalid cep
    cep = cep.replaceAll('-', '');
    if (cep.length !== 8){
        return false;
    }

    return true;
}

//check if has only numbers until 9 characters and has '-'
function hasInvalidCharacters(cep: string): boolean {
    const regex = /[^0-9-]/;
    return regex.test(cep);
}