
export function formatRelativeDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInSecs = Math.round(diffInMs / 1000);
    const diffInMins = Math.round(diffInSecs / 60);
    const diffInHours = Math.round(diffInMins / 60);
    const diffInDays = Math.round(diffInHours / 24);
    const diffInWeeks = Math.round(diffInDays / 7);
    const diffInMonths = Math.round(diffInDays / 30);
    const diffInYears = Math.round(diffInDays / 365);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (diffInSecs < 60) return 'just now';
    if (diffInMins < 60) return rtf.format(-diffInMins, 'minute');
    if (diffInHours < 24) return rtf.format(-diffInHours, 'hour');
    if (diffInDays < 7) return rtf.format(-diffInDays, 'day');
    if (diffInWeeks < 4) return rtf.format(-diffInWeeks, 'week');
    if (diffInMonths < 12) return rtf.format(-diffInMonths, 'month');
    return rtf.format(-diffInYears, 'year');
}

