export function Delay(delay: number) {
    return new Promise(res => setTimeout(res, delay))
}