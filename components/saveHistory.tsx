interface ResultData {
    status: number,
    date: string,
    guesses: never[],
    answer: {
      r: number;
      g: number;
      b: number;
    },
    difficulty: number
  }

/**
 * Records a logged in user's game result to their history.
 * @returns A new toastMsg string
 */
export const SaveHistory = async (result: ResultData) => {

    const csrfReq = await fetch(`/api/auth/csrf`, { method: 'GET' })
    const csrfToken = await csrfReq.json()

    const response = await fetch(`http://localhost:3000/api/record`,
        {
            method: 'POST',
            body: JSON.stringify(result),
            headers: {
                cookie: csrfToken.csrfToken || ""
            }
        }
    )
    const data = await response.json()

    console.log(`The data: ${data}`)
    return data
}