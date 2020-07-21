import HttpService from './HttpService'

export const msgService = {
    query,
}

async function query(stationId = '') {
    const msgs = await HttpService.get(`/msg?aboutStationId=${stationId}`)
    return msgs.data
}