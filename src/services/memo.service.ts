// src/services/memo.service.ts
import chalk from 'chalk'
import { Client, Wallet, xrpToDrops, convertStringToHex } from 'xrpl'

import { GeneratedMemoOnchainContent } from '../types/content.type';

export async function generate(username: string): Promise<GeneratedMemoOnchainContent> {
    console.log(chalk.bgWhite("-- SERVICE - GENERATE MEMO --"));

    const client = new Client("wss://s.devnet.rippletest.net:51233/");
    await client.connect();

    const { wallet: randomSenderWallet } = await client.fundWallet();
    console.log(chalk.gray(`Random sender: ${randomSenderWallet.classicAddress}`));
    const { wallet: studentWallet } = await client.fundWallet();
    console.log(chalk.green(`Student: ${studentWallet.classicAddress}`));
    const { wallet: solutionWallet } = await client.fundWallet();
    console.log(chalk.magenta(`Solution: ${solutionWallet.classicAddress}`));

    const memo = `Send a transaction to: ${solutionWallet.classicAddress}`;
    console.log(chalk.yellow(`\nMemo: ${memo}`));
    const memoHex = convertStringToHex(memo);

    const memoTx = await client.autofill({
        TransactionType: 'Payment',
        Account: randomSenderWallet.classicAddress,
        Amount: xrpToDrops('1'),
        Destination: studentWallet.classicAddress,
        Memos: [{ Memo: { MemoData: memoHex } }]
    });

    const memoTxResult = await client.submitAndWait(memoTx, { wallet: randomSenderWallet });

    if (memoTxResult.result.validated)
        console.log(`✅ Memo transaction successful! Transaction hash: ${memoTxResult.result.hash}`);
    else
        console.log(`❌ Memo transaction failed! Error: ${memoTxResult.result.meta}`);

    await client.disconnect();

    const generatedMemoOnchainContent: GeneratedMemoOnchainContent = {
        studentWallet: {
            username,
            classicAddress: studentWallet.classicAddress,
            prvKey: studentWallet.privateKey
        },
        metaData: {
            memoSent: {
                randomSenderAddress: randomSenderWallet.classicAddress,
                studentClassicAddress: studentWallet.classicAddress,
                txHash: memoTxResult.result.hash,
                memo: memo,
                memoHex: memoHex
            },
            solutionWallet: {
                classicAddress: solutionWallet.classicAddress,
                prvKey: solutionWallet.privateKey
            }
        }
    };
                
    return generatedMemoOnchainContent;
}
