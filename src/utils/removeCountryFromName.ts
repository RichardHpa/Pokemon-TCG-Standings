export const removeCountryFromName = (name: string) => {
    const newName = name.replace(/\s\[(\w+)\]$/, '');

    if (newName.endsWith('.')) {
        return newName.slice(0, newName.length - 1);
    }

    return newName;
};
