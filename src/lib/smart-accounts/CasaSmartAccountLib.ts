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

type CasaSmartAccountLibOptions = {
    privateKey: string
    chain: Chain
}


const FactoryAddress = "0xE09B140b20D20eF7Ce86B595fE1cc32acD7d5f99"

const FactoryABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "createWallet",
        "outputs": [
            {
                "internalType": "address",
                "name": "wallet",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getWallet",
        "outputs": [
            {
                "internalType": "bool",
                "name": "exists",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "wallet",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "implementation",
        "outputs": [
            {
                "internalType": "contract Wallet",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]


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