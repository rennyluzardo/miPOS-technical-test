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
    ACCESS_TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNhOTIyN2EzZTM0OTFiY2JhNmI5YjJlN2FmM2Y2ODJiYTdiYmNlNmU4ZjAyMDA2ZDI4NWVjNTQwMzEzYWQzZmFmOTk4MGY3ZmQyZDVhNzQ0In0.eyJhdWQiOiIxIiwianRpIjoiY2E5MjI3YTNlMzQ5MWJjYmE2YjliMmU3YWYzZjY4MmJhN2JiY2U2ZThmMDIwMDZkMjg1ZWM1NDAzMTNhZDNmYWY5OTgwZjdmZDJkNWE3NDQiLCJpYXQiOjE1NzIzODEzODEsIm5iZiI6MTU3MjM4MTM4MSwiZXhwIjoxNjA0MDAzNzgxLCJzdWIiOiI0Iiwic2NvcGVzIjpbImVtcGxveWVlIl19.KSk8QcQF6alP2O-Pc7CZz9JDpVY-lntGZQ2kzUnDGeKw_kghfxDjqpresBpu5zTtXuMs4_pXnnu5eIwgdWLpaAf74dmPZiU5I9XWDtBTr7t-7OtfKg2LmowtOUR74PlGuSuPolRuwpph5u6fIAb7fbjIJDWIT3gv03CKwo1-kgm7S8xHHT0539pWzUyEgofExaoqV5tKyYro-6bUtBzN96atE3fy8cI5J8bTxyddWHvHMlsz5I-dV6AmziQJXoXe-nNyf5dr8ttptcksiwPISza32MnZCNK-iWK0ELkCmABP8BDoCjo106u7Y1zAaq6emvYfX64kZhQTDgLE3DYRoUZDAVQ0-8jFzcVDBBj1D6yQg-NU-FKU0EJH7Fs6sdE4JlRyFHfjX7iDtKfGyA6RakP87uK06bFaAohoHi1QDklyycXG_aYj_-nichhYyBI8jFYEMr9kH5gDl_bxX6j_7u9kD3PPDGzlPDq0LEJdYoGydm3PjFJfVXJHoqJRSKV9tOUUlf1EnoAXyPc2ZvJB9yteRw_daA8zeo84K7aBTqaLNN54wIRK-AVdgbXoT0W2wC3fHA4lpVKcASnHfRmWwV7xO2TN1ipCI-GhxWWE4VsXlVkJeX4UFtFdzwjcRoN_c-uzyFn4warxUEa3h4aGhPMwRPsoMcCaDA2bfYgZS3U',
}


const configs = Object.assign({}, environments, common)

export default configs
