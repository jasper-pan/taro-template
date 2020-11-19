export interface DayModel {
    date: string;
    day: number;
    week: number;
    isWeekDay: boolean;
    isToday: boolean;
    isPass: boolean;
}

export type DayModelWrap = DayModel | null;

export interface MonthModel {
    title: string;
    calendar: DayModelWrap[];
}

//小于10的数补0
const transeNum = (num: number) => {
    return num < 10 ? '0' + num : num; 
};

const makeCalendar = (y: number, m: number, d: number, isCurMonth: boolean): DayModelWrap[] => {
    const objmonth: DayModelWrap[] = [];
    
    const endDay = new Date(y, m + 1, 0);//下个月的第0天，也说是上个月的最后一天，实例化

    const lastDay = endDay.getDate(); //这个月总天数
    const weekobj = new Date(y, m, 1); //实例化当月第一天
    const firstWeek = weekobj.getDay(); //第1天周几 即可知道前面空几个
    for (let i = 1; i <= lastDay; i++) {
        const _now = new Date(y, m, i); //每一天都实例化
        const _y = _now.getFullYear();
        const _m = _now.getMonth();
        const _d = _now.getDate();
        const _week = _now.getDay();
        const objday: DayModel = {
            date: `${_y}-${transeNum(_m + 1)}-${transeNum(_d)}`,
            day: _d,
            week: _week,
            isWeekDay: _week == 0 || _week == 6,
            isToday: isCurMonth && d == _d,
            isPass: isCurMonth && _d < d
        };
        objmonth.push(objday);
    }
    for (let i = 0; i < firstWeek; i++) {
        objmonth.unshift(null);  //补齐前面的空格
    }
    return objmonth;
};

const makeCalendars = (): MonthModel[] => {
    const calendars: MonthModel[] = [];
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth(); //3 代表4月
    const d = now.getDate();
    const monthnum = 12;

    for (let i = 0; i < monthnum; i++) {
        calendars.push({
            title: `${new Date(y,m+i,1)}`,
            calendar: makeCalendar(y, m + i, d, i === 0)
        });
    }

    return calendars;
};

export default makeCalendars;