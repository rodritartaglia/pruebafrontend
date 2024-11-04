
export default {
    async getData() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/public/characters?apikey=${import.meta.env.VITE_API_KEY}`)
            const data = await response.json()
            return data.data.results
        }
        catch(error) {
            console.log(error)
        }
    },

    async getCharacter(id: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/public/characters/${id}?apikey=${import.meta.env.VITE_API_KEY}`)
            const data = await response.json()
            return data.data.results[0]
        }
        catch(error) {
            console.log(error)
        }
    }
}