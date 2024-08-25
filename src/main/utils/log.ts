
export const ColorMap = {
    "black":"30",
    "red":"31",
    "green":"32",
    "yellow":"33",
    "blue":"34",
    "rosein":"35",
    "cyan":"36",
    "white":"37",
    "brightBlack":"90",
    "brightRed":"91",
    "brightGreen":"92",
    "brightYellow":"93",
    "brightBlue":"94",
    "rosein2":"95",
    "brightCyan":"96",
    "brightWhite":"97"
}


const formatTime = (t:{ dd:any, mm:any, yyyy:any, HH:any, MM:any, SS:any }) => {
    
    const {dd,mm,yyyy,HH,MM,SS} = t;
    return `${yyyy}.${mm}.${dd} ${HH}:${MM}:${SS}`;
};

const getTimeFormat = (date = new Date())=>{

    const formatData = (input:any) => {
        if (input > 9) {
            return input;
        } else return `0${input}`;
    };
    
    // Function to convert
    // 24 Hour to 12 Hour clock
    const formatHour = (input:any) => {
    if (input > 12) {
        return input - 12;
    }
    return input;
    };

    // Data about date
    const format = {
        dd: formatData(date.getDate()),
        mm: formatData(date.getMonth() + 1),
        yyyy: date.getFullYear(),
        HH: formatData(date.getHours()),
        hh: formatData(formatHour(date.getHours())),
        MM: formatData(date.getMinutes()),
        SS: formatData(date.getSeconds()),
    };

    return formatTime(format);
}


function changeColor(input:string, color:string) {
    return `\x1b[${color}m${input}\x1b[0m`
}

export type LogType = {
    symbol:string,
    color:string,
    normalText?:string,
    msg:any[],
    split?:string
}

export class Log{
    private normalText:string;
    public exception:Array<string> = [];
    public statusMap = {
        common:{
            text:"COM",
            color:"97"
        },
        err:{
            text:"ERR",
            color:"91"
        },
        other:{
            text:"OTH",
            color:ColorMap.brightCyan
        },
        debug:{
            text:"DBG",
            color:"94"
        },
        warn:{
            text:"WAR",
            color:"93"
        },
        ok:{
            text:"O K",
            color:"92"
        }
    }

    constructor(normal:string){
        this.normalText = normal;
    }

    log(...msgs:any[]){

        const {text,color} = this.statusMap.common;
        if(this.exception.includes(text)){
            return;
        }

        let fixedStr = `${getTimeFormat()} ${this.normalText} [${text}] /> `
        fixedStr = changeColor(fixedStr,color);
        console.log(fixedStr,...msgs);
    }

    err(...msgs:any[]){
        const {text,color} = this.statusMap.err;
        if(this.exception.includes(text)){
            return;
        }

        let fixedStr = `${getTimeFormat()} ${this.normalText} [${text}] /> `
        fixedStr = changeColor(fixedStr,color);
        console.log(fixedStr,...msgs);
    }

    other(...msgs:any[]){
        const {text,color} = this.statusMap.other;
        if(this.exception.includes(text)){
            return;
        }

        let fixedStr = `${getTimeFormat()} ${this.normalText} [${text}] /> `
        fixedStr = changeColor(fixedStr,color);
        console.log(fixedStr,...msgs);
    }

    warn(...msgs:any[]){
        const {text,color} = this.statusMap.warn;
        if(this.exception.includes(text)){
            return;
        }

        let fixedStr = `${getTimeFormat()} ${this.normalText} [${text}] /> `
        fixedStr = changeColor(fixedStr,color);
        console.warn(fixedStr,...msgs);
    }

    ok(...msgs:any[]){
        const {text,color} = this.statusMap.ok;
        if(this.exception.includes(text)){
            return;
        }

        let fixedStr = `${getTimeFormat()} ${this.normalText} [${text}] /> `
        fixedStr = changeColor(fixedStr,color);
        console.log(fixedStr,...msgs);
    }

    debug(...msgs:any[]){
        const {text,color} = this.statusMap.debug;
        if(this.exception.includes(text)){
            return;
        }
        
        let fixedStr = `${getTimeFormat()} ${this.normalText} [${text}] /> `
        fixedStr = changeColor(fixedStr,color);
        console.log(fixedStr,...msgs);
    }

    custom(style:LogType){
        const {symbol,color,normalText,split} = style;

        let fixedStr = `${getTimeFormat()} ${normalText || this.normalText} [${symbol}] ${split || "/>"} `
        fixedStr = changeColor(fixedStr,color);
        console.log(fixedStr,...style.msg);
    }
}