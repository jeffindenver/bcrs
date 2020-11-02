import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.interface';
import { UserDataService } from '../../shared/user-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient,
    private fb: FormBuilder, private router: Router,
    private userService: UserService, private userData: UserDataService) {

        //this.userId = this.route.snapshot.paramMap.get('userId');
        console.log('ID: ' + userData.id);
        this.userId = userData.id;

        this.userService.findUserById(this.userId).subscribe(res => {
          this.user = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.form.controls.firstName.setValue(this.user.firstName);
          this.form.controls.lastName.setValue(this.user.lastName);
          this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
          this.form.controls.address.setValue(this.user.address);
          this.form.controls.email.setValue(this.user.email);
        });
       }
       ngOnInit(): void {
        const numberPattern = '^[0-9]*$';

        this.form = this.fb.group({
          firstName: [null, Validators.compose([Validators.required])],

          lastName: [null, Validators.compose([Validators.required])],

          phoneNumber: [null, Validators.compose([Validators.required,
            Validators.pattern(numberPattern), Validators.minLength(10),
            Validators.maxLength(10)])],

          address: [null, Validators.compose([Validators.required])],

          email: [null, Validators.compose([Validators.required,
            Validators.email])]
        });
      }

      saveUser(): void {
          // The 'as' keyword tells TypeScript to ignore type inference and consider,
          // in this case, an empty object named 'newUser' as an object of type User
          const updatedUser = {} as User;

          updatedUser.firstName = this.form.controls.firstName.value;
          updatedUser.lastName = this.form.controls.lastName.value;
          updatedUser.phoneNumber = this.form.controls.phoneNumber.value;
          updatedUser.address = this.form.controls.address.value;
          updatedUser.email = this.form.controls.email.value;

          this.userService.updateUser(this.userId, updatedUser).subscribe(() => {
            this.router.navigate(['/users']);
          }, err => {
            console.log(err);
          });
        }

      cancel(): void {
        this.router.navigate(['/users']);
      }
    }