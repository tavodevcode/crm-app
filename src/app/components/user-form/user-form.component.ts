import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidateForms } from '../../models/validate-forms'
import { CreateUser, User } from '../../interfaces/user'
import { HttpClientModule } from '@angular/common/http'
import { UserFormService } from './user-form.service'

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-form.component.html',
  providers: [UserFormService],
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent extends ValidateForms implements OnInit {
  users: User[] = []
  private baseUrl = 'https://gzvxjonltulcijxrfnln.supabase.co/rest/v1/users'

  userForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
  })

  get firstName() {
    return this.userForm.get('firstName')
  }
  get lastName() {
    return this.userForm.get('lastName')
  }
  get email() {
    return this.userForm.get('email')
  }
  get phone() {
    return this.userForm.get('phone')
  }
  get address() {
    return this.userForm.get('address')
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserFormService
  ) {
    super()
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      console.log({ users }) // eslint-disable-line no-console
    })
  }

  handleCreateUser() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched()

      return
    }

    const user = this.userForm.value as CreateUser

    this.userService.createUser(user)
  }

  handleResetForm() {
    this.userForm.reset()
  }
}
