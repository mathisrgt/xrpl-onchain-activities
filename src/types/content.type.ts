import { Wallet } from "./wallet.type";

export type GenerateMemoResponse = {
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

export type WatchMemoResponse = 
    | { username: string; found: true; txHash: string }
    | { username: string; found: false; }