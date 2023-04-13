export function formatNumberToNumOfDigits(num: number, numberOfDigits: number = 2) {
    return num.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
}