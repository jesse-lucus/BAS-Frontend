
const registerUser = async (_email:string, _password:string) => {
    try {
        let user = {
            email: _email,
            password: _password
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
            let res = await fetch('http://localhost:8001/api/user/register', requestOptions)
            let userData = await res.json();
            console.log(userData);
            return userData;
    } catch (error) {
        console.error('Unable to fetch data:', error)
        return false;
    }
}

const signIn = async (_email:string, _password:string) => {
    try {
        let user = {
            email: _email,
            password: _password
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
            let res = await fetch('http://localhost:8001/api/user/login', requestOptions)
            let userData = await res.json();
            console.log(userData.success);
            if(userData.success) return userData;
    } catch (error) {
        console.error('Unable to fetch data:', error)
        return false;
    }
}

const addWallet = async (_email:string, _wallet: string) => {
    try{
        let user = {
            email: _email,
            wallet: _wallet,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        let res = await fetch('http://localhost:8001/api/user/addwallet', requestOptions)
        let userData = await res.json();
        console.log(userData.success);
        if(userData.success) return userData;
    }catch (error) {
        console.error('Unable to fetch data:', error)
        return false;
    }
}

export const userAction ={
    registerUser, signIn, addWallet
}