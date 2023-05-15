import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfessionalComponent } from './pages/professional/professional.component';
import { ProfileComponent } from './pages/professional//profile/profile.component';
import { DetalleProfessionalComponent } from './pages/detalle-professional/detalle-professional.component';

import { PatientComponent } from './pages/patient/patient.component';
import { DetallesPatientComponent } from './pages/detalles-patient/detalles-patient.component';
import { PprofileComponent } from './pages/patient/pprofile/pprofile.component';

import { TutorComponent } from './pages/tutor/tutor.component';
import { DetalleTutorComponent } from './pages/detalle-tutor/detalle-tutor.component';
import { TProfileComponent } from './pages/tutor/tprofile/tprofile.component';

import { AdminComponent } from './pages/admin/admin.component';
import { DetalleAdminComponent } from './pages/detalle-admin/detalle-admin.component';
import { AProfileComponent } from './pages/admin/aprofile/aprofile.component';

import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

import { ChatComponent } from './pages/chat/chat.component';
import { MyCalendarComponent } from './pages/calendar/my-calendar/my-calendar.component';


const routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'professional', component: ProfessionalComponent},
  {path: 'professional/:id', component: DetalleProfessionalComponent},
  {path: 'professional/profile/:id', component: ProfileComponent},

  {path: 'patient', component: PatientComponent},
  {path: 'patient/:id', component: DetallesPatientComponent},
  {path: 'patient/profile/:id', component: PprofileComponent},

  {path: 'tutor', component: TutorComponent},
  {path: 'tutor/:id', component: DetalleTutorComponent},
  {path: 'tutor/profile/:id', component: TProfileComponent},

  {path: 'admin', component: AdminComponent},
  {path: 'admin/:id', component: DetalleAdminComponent},
  {path: 'admin/profile/:id', component: AProfileComponent},

  {path: 'calendar', component: CalendarComponent},
  {path: 'mycalendar', component: MyCalendarComponent},

  {path: 'notification', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}

