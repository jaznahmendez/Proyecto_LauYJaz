import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { HomeComponent } from 'src/app/pages/home/home.component'
import { TutorService } from 'src/app/shared/services/tutor.service';
import { ProfessionalService } from 'src/app/shared/services/professional.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { RegisterService } from 'src/app/shared/services/register.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent{
  
  logged: boolean = false;
  userId: string = ''
  newUser: boolean = true

  constructor(
    private registerService: RegisterService,
    private tutorService: TutorService, private profService: ProfessionalService, private patientService: PatientService,
    private tokenService: TokenService, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private socialAuthService: SocialAuthService)
  {
    this.tokenService.authStatus.subscribe((status: boolean) => {
      //console.log(status)
      this.logged = status;
    })

    this.socialAuthService.authState.subscribe((user: SocialUser) => {})

    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      
      if(user){
        this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.tokenService.setToken(accessToken));
        console.log(user);
        console.log(user.idToken);
        //this.tokenService.setToken(user.idToken);
        this.loginService.setUserEmail(user.email);
        this.loginService.login(user.idToken, this.loginService.getUserType()).subscribe(response => {
          //this.router.navigate([this.loginService.userType , 'profile', this.userId])
          
            this.loginService.setUserId(response._id)

            let id = this.loginService.getUserId()
            let type = this.loginService.getUserType();
            if(type == 'tutor')
            {
              let tutor = { login: true }
              this.tutorService.updateTutor(tutor, id);
            }
            else if(type == 'professional'){
              let prof = { login: true }
              this.profService.updateProfessional(prof, id);
            }
            else if(type == 'patient'){
              let patient = { login: true }
              this.patientService.updatePatient(patient, id);
            }
      
            this.router.navigate([type , 'profile', id])
           
        })
      }
    });
  }

  logOut() {
    let temp = { login: false }
    console.log(this.loginService.getUserId())
    this.tutorService.updateTutor(temp, this.loginService.getUserId());
    this.tokenService.deleteToken();
    this.router.navigate(['/']);
  }

  goProfile(){
    let id = this.loginService.getUserId();
    let type = this.loginService.getUserType();
    this.router.navigate([type , 'profile', id]);
  }

  displayNotifications(){
    this.router.navigate(['chat']);
  }
}