import bcrypt from 'bcrypt';

const SALT_ROUND: number = 10;

export const hashPassword = async(pass:string): Promise<string> =>{
    return await bcrypt.hash(pass, SALT_ROUND);
}