const parsedBoolean = (param) => {
    // if (typeof value !== "string") return;

    // return value === "true" || "false" ? value : false;
    const isString = typeof param === 'string';

    if (!isString) return;

    const isBoolean = ['true', 'false'].includes(param);

    if (isBoolean) return param;
}
export const parseContactFilterParams = ({ isFavourite }) => {
    const parseIsFavourite = parsedBoolean(isFavourite);

    return {
        isFavourite: parseIsFavourite
    }
}