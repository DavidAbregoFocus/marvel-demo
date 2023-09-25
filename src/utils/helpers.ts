export const formatString = function (...args: any[]) {
    let s = args[0];
    let i = args.length;

    while (i-- > 1) s = s.replace(new RegExp('\\{' + (i - 1) + '\\}', 'gm'), args[i]);
    return s;
};

const add0 = (t: number) => (t < 10 ? `0${t}` : String(t));

export const getDateStandard = (dt: Date | undefined | string) => {
    if (dt === undefined) return '';

    let _dt = new Date();
    if (typeof dt === 'string') _dt = new Date(dt);

    const y = _dt.getFullYear();
    const m = add0(_dt.getMonth() + 1);
    const d = add0(_dt.getDate()); //day of month
    const w = _dt.toDateString().substring(0, 3); //day of week enum, either Mon, Tue, Wed, Thu, Fri, Sat, Sun
    const h = add0(_dt.getHours());
    const min = add0(_dt.getMinutes());
    return `[${y}-${m}-${d} ${w} ${h}:${min}]`;
};
