import { Injectable } from '@angular/core'
import { HttpClient, HttpEventType } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface userId{
  _id:string
}

@Injectable()
export class AuthenticationService {
  private token: string
  private stoken:string
  files: any;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {
    const base = this.http.post(`http://127.0.0.1:4000/register`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(`http://127.0.0.1:4000/login`, user)
    
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )
     
    return request
  }

  public profile(): Observable<any> {
    
    return this.http.get(`http://127.0.0.1:4000/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public upload(formData) {
    return this.http.post<any>('http://127.0.0.1:4000/upload', formData, {  
        reportProgress: true,  
        observe: 'events', 
        headers: { Authorization: ` ${this.getToken()}` } 
      });  
  }
  public getImage(){
    return this.http.get("http://127.0.0.1:4000/files")
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}