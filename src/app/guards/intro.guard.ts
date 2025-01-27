import {CanActivate, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(private storage: Storage, private route : Router) {
  }

  async canActivate() {
    const intro = await this.storage.get('viLaIntro');
    if(intro){
      return true;
    }else{
      await this.route.navigateByUrl('/intro');
      return false;
    }
  }
}
