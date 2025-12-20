export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const randomInt = (max) => Math.floor(Math.random() * max);

export const shuffle = (array) => {
    const newArray = [...array]; // Kopia
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};