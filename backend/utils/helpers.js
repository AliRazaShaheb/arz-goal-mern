export const msgObj = (str, obj)=>{

    if(obj){
        return {
            msg:str,
            goal:obj || []
        }
    }

    return {
        msg:str,
    }
}