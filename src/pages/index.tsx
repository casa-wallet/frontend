import AccountCard from '@/components/AccountCard'
import AccountPicker from '@/components/AccountPicker'
import PageHeader from '@/components/PageHeader'
import { COSMOS_MAINNET_CHAINS } from '@/data/COSMOSData'
import { EIP155_MAINNET_CHAINS, EIP155_TEST_CHAINS, EIP155_CASA_CHAINS } from '@/data/EIP155Data'
import { SOLANA_MAINNET_CHAINS, SOLANA_TEST_CHAINS } from '@/data/SolanaData'
import { POLKADOT_MAINNET_CHAINS, POLKADOT_TEST_CHAINS } from '@/data/PolkadotData'
import { MULTIVERSX_MAINNET_CHAINS, MULTIVERSX_TEST_CHAINS } from '@/data/MultiversxData'
import { TRON_MAINNET_CHAINS, TRON_TEST_CHAINS } from '@/data/TronData'
import { NEAR_TEST_CHAINS } from '@/data/NEARData'
import { TEZOS_MAINNET_CHAINS, TEZOS_TEST_CHAINS } from '@/data/TezosData'
import { KADENA_MAINNET_CHAINS, KADENA_TEST_CHAINS } from '@/data/KadenaData'
import SettingsStore from '@/store/SettingsStore'
import { Text } from '@nextui-org/react'
import { Fragment } from 'react'
import { useSnapshot } from 'valtio'
import useSmartAccounts from '@/hooks/useSmartAccounts'
import { useRouter } from 'next/router'

export default function HomePage() {
  const { getAvailableSmartAccounts } = useSmartAccounts()
  const { push } = useRouter()

  return (
    <Fragment>
      <PageHeader title="Accounts">
        <AccountPicker data-testid="account-picker" />
      </PageHeader>
      <Fragment>
        <Text h4 css={{ marginBottom: '$5' }}>
          Testnets
        </Text>
        {Object.entries(EIP155_CASA_CHAINS).map(([caip10, { name, logo, rgb, chainId }]) => {
          return (
            <div key={`${name}-smart`} style={{ marginBottom: 10 }}>
              {getAvailableSmartAccounts()
                .filter(account => {
                  return account.chain.id === chainId
                })
                .map(account => {
                  return (
                    <div
                      style={{ marginBottom: 10, cursor: 'pointer' }}
                      key={`${name}-${account.type.toLowerCase()}`}
                    >
                      <AccountCard
                        key={`${name}-${account.type.toLowerCase()}`}
                        name={`${account.type} - ${name}`}
                        logo={logo}
                        rgb={rgb}
                        address={account.address}
                        chainId={caip10.toString()}
                        data-testid={`chain-card-${caip10.toString()}-${account.type.toLowerCase()}`}
                      />
                    </div>
                  )
                })}
            </div>
          )
        })}
      </Fragment>
    </Fragment>
  )
}
