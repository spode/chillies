// place files you want to import through the `$lib` alias in this folder.

export function delayed(value, ms = 500) {
    return new Promise((f) => {
        setTimeout(() => f(value), ms);
    });
}