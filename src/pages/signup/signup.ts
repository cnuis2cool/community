import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../app/services/auth.service';
import { TabsPage } from '../tabs/tabs';

@Component({
	selector: 'page-signup',
	templateUrl: './signup.html'
})
export class SignupPage {
	signupError: string;
	form: FormGroup;

	constructor(
		fb: FormBuilder,
    private navCtrl: NavController,
    private auth: AuthService
	) {
		this.form = fb.group({
			name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }

  signup() {
		let data = this.form.value;
		let credentials = {
      name: data.name,
			email: data.email,
			password: data.password
		};
		this.auth.signUp(credentials).then(
			() => this.navCtrl.setRoot(TabsPage),
			error => this.signupError = error.message
		);
  }
}
