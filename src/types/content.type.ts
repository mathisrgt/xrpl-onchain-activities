import { Wallet } from "./wallet.type";

export interface GeneratedMemoOnchainContent {
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