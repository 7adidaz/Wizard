// api.js
import axios from 'axios'
// const BASE_URL = 'http://localhost:3000'
const BASE_URL = 'https://wizard-bxze.onrender.com'

export async function summarizeYoutubeVideo(url) {
  try {
    const response = await axios.post(
      `${BASE_URL}/summarize/youtube-video`,
      {
        url: url,
        env: process.env.BASE_URL
      }
    )
    return response.data
  } catch (error) {
    console.error('Error calling the API:', error)
    return null
  }
}

export async function summarizeArticle(url) {
  try {
    const response = await axios.post(
      `${BASE_URL}/summarize/url`,
      {
        url: url,
      }
    )
    return response.data
  } catch (error) {
    console.error('Error calling the API:', error)
    return null
  }
}

export async function emailReplyapi(email, name) {
  try {
    const response = await axios.post(
      `${BASE_URL}/email/reply`, {
        email: email,
        name: name,
      })
    return response.data
  } catch (error) {
    console.error('Error calling the API:', error)
    return null
  }
}

export async function textsummarizeapi(text) {
  try {
    const response = await axios.post(
      `${BASE_URL}/summarize/text`,
      {
        text: text,
      }
    )
    return response.data
  } catch (error) {
    console.error('Error calling the API:', error)
    return null
  }
}

export async function explainText(keyword) {
  try {
    const response = await axios.post(
      `${BASE_URL}/explain`, {
        keyword: keyword,
      })
    return response.data
  } catch (error) {
    console.error('Error calling the API:', error)
    return null
  }
}
