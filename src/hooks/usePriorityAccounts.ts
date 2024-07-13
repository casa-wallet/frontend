import { allowedChains } from '@/consts/smartAccounts'
import SettingsStore from '@/store/SettingsStore'
import {
  supportedAddressPriority
} from '@/utils/SmartAccountUtil'
import { SessionTypes } from '@walletconnect/types'
import { useSnapshot } from 'valtio'

interface IProps {
  namespaces?: SessionTypes.Namespaces
}

export default function usePriorityAccounts({ namespaces }: IProps) {
  const {
    casaSmartAccountAddress
  } = useSnapshot(SettingsStore.state)
  if (!namespaces) return []

  return supportedAddressPriority(namespaces, casaSmartAccountAddress, allowedChains)
}
