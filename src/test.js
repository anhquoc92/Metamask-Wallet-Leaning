const networks = {
    bsc_testnet: {
      name: "Binance Smart Chain Testnet",
      chain: "BSC",
      rpc: [
        "https://data-seed-prebsc-1-s1.binance.org:8545",
        "https://data-seed-prebsc-2-s1.binance.org:8545",
        "https://data-seed-prebsc-1-s2.binance.org:8545",
        "https://data-seed-prebsc-2-s2.binance.org:8545",
        "https://data-seed-prebsc-1-s3.binance.org:8545",
        "https://data-seed-prebsc-2-s3.binance.org:8545",
      ],
      faucets: ["https://testnet.binance.org/faucet-smart"],
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "tBNB",
        decimals: 18,
      },
      infoURL: "https://testnet.binance.org/",
      shortName: "bnbt",
      chainId: 97,
      networkId: 97,
      explorers: [
        {
          name: "bscscan-testnet",
          url: "https://testnet.bscscan.com",
          standard: "EIP3091",
        },
      ],
    },
    goerli_test_network: {
      name: "Görli",
      title: "Ethereum Testnet Görli",
      chain: "ETH",
      rpc: ["https://goerli.infura.io/v3/"],
      nativeCurrency: {
        name: "Görli Ether",
        symbol: "ETH",
        decimals: 18,
      },
      infoURL: "https://goerli.net/#about",
      shortName: "gor",
      chainId: 5,
      networkId: 5,
      ens: {
        registry: "0x112234455c3a32fd11230c42e7bccd4a84e02010",
      },
      explorers: [
        {
          name: "etherscan-goerli",
          url: "https://goerli.etherscan.io",
          standard: "EIP3091",
        },
      ],
    },
  };