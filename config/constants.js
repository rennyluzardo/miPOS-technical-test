import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const env = publicRuntimeConfig.env || 'development'

const environments = {
    development: {
        API: 'https://dev.mipos.shop/api/v1/'
    },
    production: {
    }
}[env]

const common = {
    ACCESS_TOKEN: 'eyJOeXAiOiJKVlQiLCJhchiOiJSUzI1Ni|s|mpOaS|6|mFijhIZDhincZODAxZDkaGMlNGQOYszYmUzZDIhNjIjMTIIZDIOMzBIYj|IYTchTFkYszMTAxOTczMzBiOTMZszzZthZTY5NjZk|nO.eyJdeQiOilyMSlslmpOaSl6|mFijhIZDhinc20DAxZDkaGMlNGQOYszYmUzZDIhNjIjMTIIZDIOMzBIYjIIYTchTFkYszMTAxOTczMzBiOTM2szzZthZTY5NjZk|iwiaWFOIjoxNTY4NngMDY3LCJquYinE1Njg10DMwNjcs|mV4cC|6MTYwMDIwNTQZNywic3ViljoiNCIsInNjb3B|cy|6WyJ|bXBsb3||ZSdeQ.iLOFrzthDNIskalreMH|9yijSIVZOrCRquFXPeJ6EF3D4ZAQc26t|_pXLZlZR7GB3nM|hci-nZQGNSSeSdJhzjy5hVavmgKKK3QBUwyK9re4EJ_T8aHsHICVMHByOIswszg3diBtesQZXthc3PItstQL28x7107zasOastJ522eUrKPRTH2W3YyDwaZsrlsmkA-cqv2stT|LOlMer_YCOCYzN4zyn3hl8nD7OZRbNLqp68vutOstw7eYJ94m850Ksy2JerhmcmNZy4hOLMQQZOONe39fSMRysCAqRdTSyMbN7ZIWkgssstYnCaZVQbu6p008JbR1C5h2T7v76n3PRLQVwOhfoYU8fOTqSZOZsPBQc5dq-tTDc7B|M22_r3akYQv3PZWdb9Yr1wl50fer|XF8h91U|bSva7v3NDMUF2p09_h5VHKdLk6$KYnVLVVg20gf8mOEJh4kEzej336qb_mPanuBGunam2DfYD1naszqu9bxlsmhe_Ae-62IWf7sUnF3FNYOM-22Aszd552huy6bU1w53sR2wUSlc-afSc7S7xKEsbGTtWAN|th3LoRg9|ASixF6-mPAMOgZSOJSPEnh0waWFm31stcX|HH2mR_CUUf5DzOzp41fOsyZaIFFDVJyDCijVPperAiK7NM',
}


const configs = Object.assign({}, environments, common)

export default configs
