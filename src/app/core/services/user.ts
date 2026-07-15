import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly _http = inject(HttpClient);


      getusers():Observable<any>{
	return this._http.get(environment.baseurl+"/users" ,  {
      headers: {
        token: localStorage.getItem('token') || '',
      }} )
  }
      sendmessage(content:string , receiverId:string , roomId:string):Observable<any>{
	return this._http.post(environment.baseurl+"/messages", 
    { "content" : content
    , "receiverId" : receiverId
    , "roomId" : roomId },  {
      headers: {
        token: localStorage.getItem('token') || '',
      }})
  }




  
      getmessages(roomid:string):Observable<any>{
	return this._http.get(environment.baseurl+`/messages/${roomid}`,  {
      headers: {
        token: localStorage.getItem('token') || '',
      }})
  }





}
