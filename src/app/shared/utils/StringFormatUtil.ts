function areaCapacityToString(areaCapacity: number[] | undefined): string | undefined {
    if (!areaCapacity || areaCapacity.length === 0) return undefined;

    if (areaCapacity.length === 1) {
        const n = areaCapacity[0];
        return `for ${n} ${n === 1 ? 'person' : 'people'}`;
    }

    const allButLast = areaCapacity.slice(0, -1).join(', ');
    const last = areaCapacity[areaCapacity.length - 1];
    const lastText = `${last} ${last === 1 ? 'person' : 'people'}`;

    return `for ${allButLast} and ${lastText}`;
}

export const StringFormatUtil = {
    areaCapacityToString
}