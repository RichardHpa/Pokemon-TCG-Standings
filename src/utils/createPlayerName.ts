export const createPlayerName = (input: string): string => {
    let result = input;

    // Replace - with whitespaces
    result = result.replace(/_/g, ' ');

    return result;
};
