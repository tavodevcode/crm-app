import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { CreateUser, User } from '../../interfaces/user'
import { API_KEY, AUTHORIZATION } from '../../utils/constants'

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  //
  private baseUrl = 'https://gzvxjonltulcijxrfnln.supabase.co/rest/v1/users'

  constructor(private http: HttpClient) {}

  createUser(user: CreateUser) {
    return this.http.post(this.baseUrl, user, {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${AUTHORIZATION}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates'
      }
    })
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${AUTHORIZATION}`
      }
    })
  }

  updateUser(user: User) {
    return this.http.patch(`${this.baseUrl}?id=eq.${user.id}`, user, {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${AUTHORIZATION}`
      }
    })
  }

  deleteUsers(id: number) {
    return this.http.delete(`${this.baseUrl}?id=eq.${id}`, {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${AUTHORIZATION}`
      }
    })
  }
}
