export default function two_crystal_balls(breaks: boolean[]): number {
    const jump = Math.floor(Math.sqrt(breaks.length));
    let prev = 0;

    for (let i = 0; i < breaks.length; i += jump) {
        if (breaks[i] === true) {
            for (let j = prev; j <= i; j++) {
                if (breaks[j]) {
                    return j;
                }
            }
        }
        prev = i;
    }
    return -1;
}
