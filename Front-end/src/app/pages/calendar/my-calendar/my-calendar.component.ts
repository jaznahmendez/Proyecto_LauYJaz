import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid'
import interaction from '@fullcalendar/interaction'
import { HttpClient } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss']
})
export class MyCalendarComponent {
  private accessToken : string | null;
  private calendarObj : any;
  private events: Array<any> = [];
  private calendarListObj: any;
  private professionalCalendarId = {};

  constructor(private authService: SocialAuthService, private httpClient: HttpClient, private tokenService: TokenService) {
    this.accessToken = '';
   }

  ngOnInit(): void {
    this.accessToken = this.tokenService.getToken();
    this.getGoogleCalendarList();
  }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }

  getGoogleCalendarList(): void {
    if (!this.accessToken) return;

    this.httpClient
      .get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .subscribe((res) => {
        console.log(res);
        this.calendarListObj = res;
        let items = this.calendarListObj.items;
        let id;
        for(let i = 0; i < items.length; i++){
          if(items[i].summary == 'EduHelp'){
            id = items[i].id;
          }
        }
        console.log(id);
        this.getGoogleCalendarData(id);
      });
  }

  getGoogleCalendarData(calendarId: string): void {
    if (!this.accessToken) return;

    this.httpClient
      .get('https://www.googleapis.com/calendar/v3/calendars/' + '7dea39d8e8b0a97465158db74d0fb3f94803912cd0b4806c577a5a171aa91778@group.calendar.google.com' + '/events', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .subscribe((res) => {
        console.log('events', res);
        this.calendarObj = res;
        for(let i = 0; i < this.calendarObj.items.length; i++){
            //console.log(this.calendarObj.items[i]);
            this.events.push({
              title: this.calendarObj.items[i].summary,
              start: this.calendarObj.items[i].start.date == undefined ? this.calendarObj.items[i].start.dateTime : this.calendarObj.items[i].start.date,
              end: this.calendarObj.items[i].end.date  == undefined ? this.calendarObj.items[i].end.dateTime : this.calendarObj.items[i].end.date
            });
        }
        console.log(this.events);
        this.calendarOptions.events = this.events;
      });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timegrid, interaction], //  
    events: [{}]
  };

  printEvent(arg: any){
    console.log(arg);
  }
}
