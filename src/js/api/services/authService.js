import authRepository from "../repositories/authRepository";

class AuthService {
    async login(data){
        console.log('loginService', data);
        try{
            const response = await authRepository.login(data)
            return {response}
        }catch (error){
            console.log('AuthService (login) error', error);
            return error.message
        }
    }

    async register (data) {
        console.log('registerService', data)
        try{
            const response = await authRepository.register(data)
            return {response}
        }
        catch(error){
            console.error('AuthService (register) error:', error);
            return error.message 
        }
    }
}

export default new AuthService(); 