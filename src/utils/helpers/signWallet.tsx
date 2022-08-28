import {useCallback} from 'react'
import { useWeb3React } from '@web3-react/core';

const VerifySignatureEVM = () => {
    const signMessageEVM = useCallback(async (library) => {
        const msg = "VOWWalletSignature";
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

    return {signMessageEVM}
}

const VerifySignatureSolana = () => {
    const signMessageSolana = useCallback(async (provider) => {
        const message_from_backend = 'VOWWalletSignature'
        if ("solana" in window && provider) {
          const signResult = provider
          .signMessage(
            new TextEncoder().encode(message_from_backend),
            'utf8'
          );
          console.log(signResult);
          return signResult;
        }
    }, [])

    return {signMessageSolana}
}

const verifySignatureNear = () => {

}

export default VerifySignatureEVM;