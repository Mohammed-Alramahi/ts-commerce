import axios from "axios";

export const quoteOfTheDay = async () => {
    const response = await axios.get("https://zenquotes.io/api/quotes/");
    const quote = response.data[0].q;
    const author = response.data[0].a;
    return `”${quote} -${author}”`;
}
