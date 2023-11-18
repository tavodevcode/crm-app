import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { CreateUser, User } from '../../interfaces/user'
import { API_KEY, AUTHORIZATION } from '../../utils/constants'

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  private baseUrl = 'https://gzvxjonltulcijxrfnln.supabase.co/rest/v1/users'

  constructor(private http: HttpClient) {}

  createUser(user: CreateUser) {
    console.log({ user }) // eslint-disable-line no-console
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${AUTHORIZATION}`
      }
    })
  }
}
