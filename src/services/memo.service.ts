// src/services/memo.service.ts
import chalk from 'chalk'
import { Client, Wallet, xrpToDrops, convertStringToHex } from 'xrpl'

import { GeneratedMemoOnchainContent, WatchResultMemoOnchainContent } from '../types/content.type';

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

export async function watch(username: string, studentClassicAddress: string, solutionClassicAddress: string): Promise<WatchResultMemoOnchainContent> {
    console.log(chalk.bgWhite("-- SERVICE - WATCH MEMO --"));

    const client = new Client("wss://s.devnet.rippletest.net:51233/");
    await client.connect();

    const transactions = await client.request({
        command: "account_tx",
        account: solutionClassicAddress,
        ledger_index_min: -1,
        ledger_index_max: -1,
        binary: false,
        limit: 5,
        forward: false,
    });

    const txs = transactions.result.transactions;

    if (txs && txs.length > 0) {
        const found = txs.find(tx => {
            return (
                tx.tx_json?.TransactionType === "Payment" &&
                tx.tx_json.Account === studentClassicAddress &&
                tx.tx_json.Destination === solutionClassicAddress
            );
        });

        await client.disconnect();

        if (found && found.hash) {
            console.log(chalk.green(`✅ Found incoming payment to solution wallet for student "${username}"`));    
            return { username: username, found: true, txHash: found.hash }
        } else {
            console.log(chalk.green(`❌ No incoming payment found to solution wallet for student "${username}"`));
        }
    }
    return { username: username, found: false }
}