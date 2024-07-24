

/**
 * Checks if all the provided texts are empty or not.
 * @param texts - The texts to be checked.
 * @returns true if all the texts are not empty, false otherwise.
 */
export function emptyTexts(...texts: string[]): boolean {
    return texts.every(text => text.trim().length > 0);
};