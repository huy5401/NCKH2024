export type LogType = {
    id?: number,
    remote_address: string,
    remote_port: string,
    local_address: string,
    local_port: string,
    request: string,
    time: string,
    msg: string,
    message: string
}

export type FilterLogType = {
    filters?: string,
    time?: number,
    src_ip?: string
}