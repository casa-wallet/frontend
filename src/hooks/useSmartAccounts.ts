import SettingsStore from '@/store/SettingsStore'
import {
  createOrRestoreCasaSmartAccount,
  smartAccountWallets
} from '@/utils/SmartAccountUtil'

import { useSnapshot } from 'valtio'

export default function useSmartAccounts() {
  const {
    smartAccountEnabled,
    kernelSmartAccountEnabled,
    safeSmartAccountEnabled,
    biconomySmartAccountEnabled
  } = useSnapshot(SettingsStore.state)

  const initializeSmartAccounts = async (privateKey: string) => {
    const { casaSmartAccountAddress } = await createOrRestoreCasaSmartAccount(privateKey)
    SettingsStore.setCasaSmartAccountAddress(casaSmartAccountAddress)

  }

  const getAvailableSmartAccounts = () => {
    const accounts = []
    for (const [key, lib] of Object.entries(smartAccountWallets)) {
      accounts.push({
        address: key.split(':')[1],
        type: lib.type,
        chain: lib.chain
      })
    }

    return accounts
  }

  return {
    initializeSmartAccounts,
    getAvailableSmartAccounts
  }
}
