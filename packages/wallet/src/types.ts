import { KeyringControllerOptions } from '@metamask/keyring-controller';
import type { RemoteFeatureFlagController } from '@metamask/remote-feature-flag-controller';
import { StorageAdapter } from '@metamask/storage-service';
import type { Json } from '@metamask/utils';

import type {
  DefaultActions,
  DefaultEvents,
  RootMessenger,
} from './initialization/defaults';
import { GenericEncryptor } from './initialization/instances/keyring-controller';
import { InitializationConfiguration } from './initialization/types';

type RemoteFeatureFlagControllerOptions = ConstructorParameters<
  typeof RemoteFeatureFlagController
>[0];

export type WalletOptions = {
  messenger?: RootMessenger<DefaultActions, DefaultEvents>;
  state?: Record<string, Record<string, Json> | undefined>;
  initializationConfigurations?: InitializationConfiguration<
    unknown,
    unknown
  >[];
  instanceOptions: InstanceSpecificOptions;
};

export type InstanceSpecificOptions = {
  keyringController?: {
    encryptor?: GenericEncryptor;
    keyringBuilders?: KeyringControllerOptions['keyringBuilders'];
    keyringV2Builders?: KeyringControllerOptions['keyringV2Builders'];
  };
  // The wallet injects neutral defaults for `clientConfigApiService` (a
  // network-free service that returns no flags), `getMetaMetricsId` (`''`), and
  // `clientVersion` (`'0.0.0'`) when omitted, so a headless consumer can pass
  // `{}`. The remaining options merely tune behavior and fall through to the
  // controller's own defaults when omitted.
  remoteFeatureFlagController?: {
    clientConfigApiService?: RemoteFeatureFlagControllerOptions['clientConfigApiService'];
    getMetaMetricsId?: RemoteFeatureFlagControllerOptions['getMetaMetricsId'];
    clientVersion?: RemoteFeatureFlagControllerOptions['clientVersion'];
    prevClientVersion?: RemoteFeatureFlagControllerOptions['prevClientVersion'];
    fetchInterval?: RemoteFeatureFlagControllerOptions['fetchInterval'];
    disabled?: RemoteFeatureFlagControllerOptions['disabled'];
  };
  storageService: {
    storage: StorageAdapter;
  };
};
