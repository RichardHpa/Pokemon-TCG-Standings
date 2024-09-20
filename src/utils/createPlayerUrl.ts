export const createPlayerUrl = (input: string): string => {
    // Convert to lowercase
    let result = input;

    // Replace whitespaces with -
    result = result.replace(/\s+/g, '_');

    return result;
};
