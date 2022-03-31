import {useEffect, useCallback} from 'react'
import { useWeb3React } from '@web3-react/core';

const useWallet = () => {
    const {library} = useWeb3React();
    console.log(useWeb3React());

    const signMessage = useCallback(async () => {
        const msg = "FASTNFT";
        console.log("library", library);
        const signer = library.getSigner();
        const signature = await signer.signMessage(msg);
        const address = await signer.getAddress();
        const signData = {
            msg,
            signature,
            address,
        }
        console.log(msg, signature, address);
        return signData;
    }, []);

    return {signMessage}
}

export default useWallet;