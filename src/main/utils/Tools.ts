export const formatTime = (t:{ dd:any, mm:any, yyyy:any, HH:any, MM:any, SS:any }) => {
    
    const {dd,mm,yyyy,HH,MM,SS} = t;
    return `${yyyy}.${mm}.${dd} ${HH}:${MM}:${SS}`;
};

/*
"black":30,
"red":31,
"green":32,
"yellow":33,
"blue":34,
"rosein":35,
"cyan":36,
"white":37,
"brightBlack":90,
"brightRed":91,
"brightGreen":92,
"brightYellow":93,
"brightBlue":94,
"rosein2":95,
"brightCyan":96,
"brightWhite":97
 */


export class Tools{
    /**
     * 生成指定范围内包含最小值的随机数 范围标识：[min,max]
     * @param min 最大值
     * @param max 最小值
     * @returns 
     */
    static randomNum = (min:number,max:number)=>{return  Math.floor(Math.random()*(max - min) + min)}

    static getTimeFormat = (date = new Date())=>{

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
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // 生成一个介于 [0, i] 之间的随机索引
            [array[i], array[j]] = [array[j], array[i]]; // 交换当前元素与随机选取的元素位置
        }
    }
    static disorderArr<T>(arr:Array<T>){
        let newWords = new Array<T>;
        let len = arr.length;
        for(let i = 0; i < len; i++){
            let index = Tools.randomNum(0,arr.length);
            
            newWords[i] = arr[index];
    
    
            arr = arr.filter((item)=>{
                return item !== arr[index]
            });
    
        }

    
        return newWords;
    }
}