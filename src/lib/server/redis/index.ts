import Redis from 'ioredis'


import { REDIS_PORT, REDIS_HOST } from '$env/static/private'

export const redis = new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT)
})
