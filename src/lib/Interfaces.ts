import { Dictionary } from "./Types";

/*
 * Secure enclave credential type for use
 * with WebAuthn based identity verification.
 */
export interface IPlatformAuthenticatorCredential {
  credentialType: string;
  platformAuthenticatorDataBase64: string;
  platformAuthenticatorClientDataBase64: string;
  platformAuthenticatorSignatureBase64: string;
}

/*
 * Google OAuth2 credential type for use
 * with one tap sign in with Google based identity verification.
 */
export interface IGoogleOAuth2Credential {
  credentialType: string;
  googleOAuth2CredentialClientID: string;
  googleOAuth2CredentialJWT: string;
}

/**
 * The network layer identity of a SHARE network
 * participant.
 */
export interface IIdentity {
  uniqueID?: string | undefined;
  // TODO(https://github.com/formless-eng/share/issues/1965):
  // Deprecate top level platform authenticator credentials.
  platformAuthenticatorDataBase64?: string | undefined;
  platformAuthenticatorClientDataBase64?: string | undefined;
  platformAuthenticatorSignatureBase64?: string | undefined;

  platformAuthenticatorCredential?:
    | IPlatformAuthenticatorCredential
    | undefined;
  googleOAuth2Credential?: IGoogleOAuth2Credential | undefined;
}

/**
 * An account which can receive currency, eg.
 * an externally owned account (EOA) with associated EVM
 * compatible wallet address.
 */
export interface IFinancialAccount {
  isManaged: boolean;
  evmBlockchainAddress?: string | undefined;
  evmBlockchainSignature?: string | undefined;
  evmBlockchainNetworkID?: number | undefined;
}

/**
 * The application layer identity of a SHARE
 * platform user.
 */
export interface IUser {
  networkIdentity: IIdentity;
  financialAccount?: IFinancialAccount;
}

/**
 * A serializable object which can be persisted to storage.
 */
export interface ISerializable {
  loadFromDisk(): void;
  saveToDisk(): void;
  toDictionary(): Dictionary;
  // eslint-disable-next-line no-unused-vars
  fromDictionary(dict: Dictionary): void;
}

/**
 * A serializable object which can be persisted to a Verifiable
 * Data Registry (VDR) using the appropriate key / value format.
 */
export interface IVDRSerializable {
  toVDRFormattedDictionary(): Dictionary;
  // eslint-disable-next-line no-unused-vars
  fromVDRFormattedDictionary(entry: Dictionary): void;
}

export interface IAsset {
  asset_title: string;
  blockchain: number;
  contract_address: string;
  creator_address: string;
  creator_name: string;
  play_count: number;
  deployment_metadata: {
    grant_ttl_seconds: number;
    price_per_access_usd: number;
    metadata: {
      absolute_expiration: number;
      preview: {
        image: string;
      };
    };
  };
}

export interface ISplitsData {
  total_slots: string;
  total_splits: number;
  community_allocation_percent: number;
  percent_per_slot: number;
  splits_data: {
    wallet_address: string;
    unique_id: string;
    display_name: string | null;
    percentage: number;
  }[];
}

export interface ISplit {
  display_name: string | null;
  percentage: number;
  unique_id: string | null;
  wallet_address: string;
}
