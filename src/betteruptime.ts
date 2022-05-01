import { Status } from '../type'

const hearders = new Headers({
    "Authorization": `Bearer ${BETTER_UPTIME_TOKEN}`
})

export async function fetchHeartBeatList(): Promise<{ type: string; ip: string; status: boolean }[]> {
    const req = new Request(`https://betteruptime.com/api/v2/heartbeats`, { headers: hearders, method: "GET" })
    const res = await fetch(req)

    const body: Status = await res.json()

    let result: { type: string; ip: string; status: boolean }[] = []

    for (let s of body.data) {
        const type = s.attributes.name.split('|').pop()!.trim()
        const ip = s.attributes.name.split('|')[0].trim()

        const status = s.attributes.status === "up"

        result.push({ type: type, ip: ip, status: status })
    }
    return result

}

export async function formatAsHosts(input: { type: string; ip: string; status: boolean }[]): Promise<string> {
    const map: { [key: string]: string[] } = {
        "notion": ["www.notion.so", "msgstore.www.notion.so", "notion.so"],
        "s3": ["s3.us-west-2.amazonaws.com"]
    }

    let text = ""
    for (const i of input) {
        for (const domain of map[i.type]) {
            text += `${i.ip} ${domain}\n`
        }
    }
    return text
}


export async function run() {
    return await formatAsHosts(await fetchHeartBeatList())
}