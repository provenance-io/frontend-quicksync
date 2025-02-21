module.exports = {
  default: {
    // App settings
    PUBLIC_URL: "/quicksync",
    SKIP_PREFLIGHT_CHECK: "true",
    // API Urls
    REACT_APP_BACKUPS_URL: "https://storage.googleapis.com/storage/v1/b/provenance-io-test-chain-backup/o/pio-testnet-1%2Fstate-sync-latest.tar.gz",
    REACT_APP_EXPLORER_URL: "https://explorer.test.provenance.io",
    REACT_APP_DOCS_URL: "https://docs.provenance.io/blockchain/running-a-node"
  },
  staging: {
    // App settings
    REACT_APP_ENV: "staging",
  },
  production: {
    // App settings
    REACT_APP_ENV: "production",
    // API Urls
    REACT_APP_BACKUPS_URL: "https://storage.googleapis.com/storage/v1/b/provenance-io-chain-backup/o/pio-mainnet-1%2Fstate-sync-latest.tar.gz",
    REACT_APP_EXPLORER_URL: "https://explorer.provenance.io",
    REACT_APP_DOCS_URL: "https://docs.provenance.io/blockchain/running-a-node"
  },
};
