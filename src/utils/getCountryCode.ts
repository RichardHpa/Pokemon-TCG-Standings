export const getCountryCode = (name: string) => {
    const countryCode = name.match(/\[(\w+)\]$/);
    return countryCode ? countryCode[1] : '';
};
