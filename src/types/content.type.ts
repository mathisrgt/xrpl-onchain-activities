import { Wallet } from "./wallet.type";

export type GeneratedMemoOnchainContent = {
    studentWallet: Wallet;
    metaData: {
        memoSent: {
            randomSenderAddress: string;
            studentClassicAddress: string;
            txHash: string;
            memo: string;
            memoHex: string;
        };
        solutionWallet: Wallet;
    };
}

export type WatchResultMemoOnchainContent = 
    | { username: string; found: true; txHash: string }
    | { username: string; found: false; }