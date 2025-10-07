import { AxiosResponse } from 'axios'
import { get, post } from 'src/service/axiousClient'
import { getAuthorizationHeader } from 'src/utils/auth'
import { API_URL } from 'src/service'

const { api } = API_URL

const booksServices = {
  getBooks(): Promise<AxiosResponse> {
    return get(`${api}/books/`, {
      headers: getAuthorizationHeader(),
    })
  },
}

export default booksServices
