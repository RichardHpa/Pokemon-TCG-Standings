export const createPlayerName = (input: string): string => {
  // Convert to lowercase
  let result = input;

  // Replace - with whitespaces
  result = result.replace(/_/g, ' ');

  return result;
};
