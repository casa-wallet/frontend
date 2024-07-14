import {
    PrivateKeyAccount,
    Hex,
    Address,
    PublicClient,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { EIP155Wallet } from '../EIP155Lib'
import { Chain } from '@/consts/smartAccounts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { getPublicClient } from '@/utils/ERC7579AccountUtils'
import axios from "axios";

import FactoryABI from "./abis/Factory.json"
import WalletABI from "./abis/Wallet.json"

type CasaSmartAccountLibOptions = {
    privateKey: string
    chain: Chain
}


const FactoryAddress = "0x622A397C755460E877B5c3185a507Fcee51FD9e1"


export class CasaSmartAccountLib implements EIP155Wallet {
    public type = "CASA"

    // Options
    public chain: Chain
    public sponsored: boolean = true

    // Signer
    protected signer: PrivateKeyAccount
    #signerPrivateKey: string

    private publicClient: PublicClient | undefined
    private address: Address = '0x'
    public isDeployed: boolean = false


    public constructor({
        privateKey,
        chain,
    }: CasaSmartAccountLibOptions) {
        this.chain = chain
        this.#signerPrivateKey = privateKey
        this.signer = privateKeyToAccount(privateKey as Hex)
    }

    async init() {
        this.publicClient = await getPublicClient(this.chain)

        const data = await this.publicClient.readContract({
            address: FactoryAddress,
            abi: FactoryABI,
            functionName: 'getWallet',
            args: [this.signer.address, 0]
        })

        this.isDeployed = (data as any)[0];
        this.address = (data as any)[1];
    }

    connect(_provider: JsonRpcProvider): any {
        return this
    }


    getMnemonic(): string {
        throw new Error('Method not implemented.')
    }
    getPrivateKey(): string {
        return this.#signerPrivateKey
    }
    getAddress(): Address {
        return this.address
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

    async sendTransaction({ to, value, data }: { to: Address; value: bigint; data: Hex }) {
        const { data: txHash } = await axios.get<string>("https://starfish-app-2zzir.ondigitalocean.app/call", {
            params: {
                chain_id: this.chain.id,
                for_: this.signer.address,
                to,
                value: (BigInt(value || 0n)).toString(),
                data
            }
        })

        return txHash
    }


    async sendBatchTransaction(
        args: {
            to: Address
            value: bigint
            data: Hex
        }[]
    ) {
        throw new Error('Method not implemented.')
    }

    getAccount() {
        throw new Error('Method not implemented.')

        return {
            address: this.getAddress(),
            getInitCode: () => <Hex>('0x')
        }
    }



}