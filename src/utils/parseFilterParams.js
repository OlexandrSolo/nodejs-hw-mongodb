import { typeList } from "../constants/contacts.js"

const filterType = (type) => {
    // if (typeof type !== "string") return
    // if ([...typeList].includes(type)) return type
    const isString = typeof type === 'string';
    if (!isString) return;

    const isKnownType = ['work', 'home', 'personal'].includes(type);

    if (isKnownType) return type;
}

const filterIsFavorite = (param) => {
    // if (typeof param !== "string") return;
    // if (['true', 'false'].includes(param)) return param
    const isString = typeof param === 'string';

    if (!isString) return;

    const isBoolean = ['true', 'false'].includes(param);

    if (isBoolean) return param;
}

export const parseContactFilterParams = (query) => {
    // const { contactType, isFavourite } = query;

    // const parsedType = filterType(contactType);
    // const parsedIsFavourite = filerIsFavorite(isFavourite);

    // return {
    //     type: parsedType,
    //     isFavourite: parsedIsFavourite,
    // }
    const { contactType, isFavourite } = query;

    const parsedType = filterType(contactType);
    const parsedIsFavourite = filterIsFavorite(isFavourite);

    return {
        type: parsedType,
        isFavourite: parsedIsFavourite,
    };
}