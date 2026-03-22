export function isDev(){
    return process.env.NODE_ENV==='development'
}

/**
 * @param {int} mode (0 = topBar; 1 = table)
 * @returns {string} data formatada, ex: "22 de Mar 2026" p/ mode 0 ou "22/03/2026" p/ mode 1
 */
export function getDate(mode = 0) {
    let date = new Date();
    if(mode==0){
        let data = date.toLocaleDateString("pt-BR", {day: "numeric", month: "short", year: "numeric"});
        let DateParts = data.split(" ");

        let month = DateParts[2].slice(0,1).toUpperCase()+DateParts[2].slice(1,DateParts[2].length-1);

        return `${DateParts[0]} de ${month} ${DateParts[4]}`;
    }
    else if(mode==1){
        let data = date.toLocaleDateString("pt-BR",{day: "numeric", month: "2-digit", year: "numeric"})
        return data;
    }

    return "Date Error";
    
}

export function getTime(date = new Date()) {
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

