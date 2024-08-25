import readline from "readline";

export async function input(str:string){
    return new Promise((resolve)=>{
        process.stdout.write(str);
        const rl = readline.createInterface({
            input:process.stdin,
            output:process.stdout
        });
        rl.question(str,(line)=>{
            //console.log(line);
            rl.close();
            resolve(line);
        });
    });
}