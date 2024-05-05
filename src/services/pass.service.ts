import bcrypt from 'bcrypt';

const SALT_ROUND: number = 10;

export const hashPassword = async(pass:string): Promise<string> =>{
    return await bcrypt.hash(pass, SALT_ROUND);
}

export const comparePassword= async(pass: string, hash: string): Promise<boolean> =>{
    return await  bcrypt.compare(pass, hash);    
}