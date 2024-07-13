import {
    PrivateKeyAccount,
    Hex,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { EIP155Wallet } from '../EIP155Lib'
import { Chain } from '@/consts/smartAccounts'
import { JsonRpcProvider } from '@ethersproject/providers'

type CasaSmartAccountLibOptions = {
    privateKey: string
    chain: Chain
}


export class CasaSmartAccountLib implements EIP155Wallet {
    public type = "CASA"

    // Options
    public chain: Chain
    public sponsored: boolean = true

    // Signer
    protected signer: PrivateKeyAccount
    #signerPrivateKey: string

    public constructor({
        privateKey,
        chain,
    }: CasaSmartAccountLibOptions) {
        this.chain = chain
        this.#signerPrivateKey = privateKey
        this.signer = privateKeyToAccount(privateKey as Hex)
    }

    async init() { }

    connect(_provider: JsonRpcProvider): any {
        return this
    }


    getMnemonic(): string {
        throw new Error('Method not implemented.')
    }
    getPrivateKey(): string {
        return this.#signerPrivateKey
    }
    getAddress(): string {
        return "0x000000000000000000000000000000000000b00b"
    }

    async signMessage(message: string): Promise<string> {
        throw new Error('Method not implemented.')
    }

    async _signTypedData(
        domain: any,
        types: any,
        data: any,
        _primaryType?: string | undefined
    ): Promise<string> {
        throw new Error('Method not implemented.')
    }

    async signTransaction(transaction: any): Promise<string> {
        throw new Error('Method not implemented.')
    }



}