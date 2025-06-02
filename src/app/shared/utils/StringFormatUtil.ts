function roomSizesToString(roomSizes: number[] | undefined): string | undefined {
    if (!roomSizes || roomSizes.length === 0) return undefined;

    if (roomSizes.length === 1) {
        const n = roomSizes[0];
        return `for ${n} ${n === 1 ? 'person' : 'people'}`;
    }

    const allButLast = roomSizes.slice(0, -1).join(', ');
    const last = roomSizes[roomSizes.length - 1];
    const lastText = `${last} ${last === 1 ? 'person' : 'people'}`;

    return `for ${allButLast} and ${lastText}`;
}

export const StringFormatUtil = {
    roomSizesToString
}