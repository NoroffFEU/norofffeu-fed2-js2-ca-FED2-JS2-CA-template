class LogoutService {
    async logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('usre');

        console.log('User has been logged out')
    }
}

export default new LogoutService();