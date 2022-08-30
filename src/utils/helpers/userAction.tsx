import internal from "stream";

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
            console.log(userData);
            return userData;
    } catch (error) {
        console.error('Unable to fetch data:', error)
        return false;
    }
}

const addWallet = async (_email:string, _address: string, _networkId: string,  _signature: string) => {
    try{
        let user = {
            email: _email,
            address: _address,
            network_id: _networkId,
            signature: _signature,
        };
        console.log("user", user);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        let res = await fetch('http://localhost:8001/api/user/addwallet', requestOptions)
        let userData = await res.json();
        console.log(userData);
        if(userData.success) return userData;
    }catch (error) {
        console.error('Unable to fetch data:', error)
        return false;
    }
}

export const userAction ={
    registerUser, signIn, addWallet
}