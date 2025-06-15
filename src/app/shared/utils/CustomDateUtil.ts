function compareTime(date1: Date, date2: Date) {
    const h1 = date1.getHours();
    const m1 = date1.getMinutes();
    const h2 = date2.getHours();
    const m2 = date2.getMinutes();

    if (h1 !== h2) return h1 - h2;
    return m1 - m2;
}

function compareDate(date1: Date, date2: Date) {
    const y1 = date1.getFullYear();
    const m1 = date1.getMonth();
    const d1 = date1.getDate();
    const y2 = date2.getFullYear();
    const m2 = date2.getMonth();
    const d2 = date2.getDate();

    if (y1 !== y2) return y1 - y2;
    if (m1 !== m2) return m1 - m2;
    return d1 - d2;
}

function isSameDate(d1: Date, d2: Date) {
    return compareDate(d1, d2) === 0;
}

function dateFormat(date: Date | undefined): string | undefined {
    if (!date) return undefined;
    const dateString = date.toLocaleDateString(undefined, {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
    return dateString;
}

function timeFormat(date: Date | undefined): string {
    if (!date) return '';
    const timeString = date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
    });
    return timeString;
}

function dateTimeFormat(date: Date | undefined): string {
    if (!date) return '';
    const dateString = date.toLocaleDateString(undefined, {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
    const timeString = date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
    });

    return `${dateString}, ${timeString}`;
}

function toUtcDate(date: Date | undefined): Date | undefined {
    if (!date) return undefined;
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return newDate;
}

function getOverlappingDate(startDate: Date, maxDate: Date, bookedDates: Date[]): Date | undefined {
    const overlappingDate = bookedDates.find(date => CustomDateUtil.compareDate(date, startDate) > 0 && CustomDateUtil.compareDate(date, maxDate) < 0);
    return overlappingDate;
}

function fixUtcString(date: string): Date {
    return new Date(date.includes('Z') ? date : date + 'Z');
}

export const CustomDateUtil = {
    compareTime,
    compareDate,
    isSameDate,
    dateFormat,
    dateTimeFormat,
    timeFormat,
    toUtcDate,
    getOverlappingDate,
    fixUtcString
}