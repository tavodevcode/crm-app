import {
  Component,
  Input,
  OnChanges,
  OnInit
  // SimpleChanges
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidateForms } from '../../models/validate-forms'
import { CreateUser, User } from '../../interfaces/user'
import { HttpClientModule } from '@angular/common/http'
import { UserFormService } from './user-form.service'
import { Drawer } from 'flowbite'
import type { DrawerOptions, DrawerInterface } from 'flowbite'
import type { InstanceOptions } from 'flowbite'

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-form.component.html',
  providers: [UserFormService],
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent extends ValidateForms implements OnChanges, OnInit {
  @Input() getUsers!: () => void
  @Input() user: User | undefined
  @Input() isEdit: boolean = false

  users: User[] = []
  drawer!: DrawerInterface
  isLoading: boolean = false

  userForm = this.formBuilder.group({
    first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
  })

  get firstName() {
    return this.userForm.get('first_name')
  }
  get lastName() {
    return this.userForm.get('last_name')
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
    const $targetEl: HTMLElement = document.getElementById('drawer-right-example') as HTMLElement

    const options: DrawerOptions = {
      placement: 'right',
      backdrop: true,
      bodyScrolling: false,
      edge: false,
      edgeOffset: ''
    }

    const instanceOptions: InstanceOptions = {
      id: 'drawer-right-example',
      override: true
    }

    this.drawer = new Drawer($targetEl, options, instanceOptions)

    this.drawer.init()
  }

  ngOnChanges(): void {
    if (this.isEdit) {
      this.userForm.patchValue(this.user as User)
    } else {
      this.userForm.reset()
    }
  }

  async handleCreateUser() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched()

      return
    }

    const user = this.userForm.value as CreateUser

    this.isLoading = true

    this.userService.createUser(user).subscribe((): void => {
      this.isLoading = false

      this.userForm.reset()

      // this.drawer.hide()

      this.getUsers()
    })
  }

  async handleUpdateUser() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched()

      return
    }

    const user = this.userForm.value as CreateUser

    this.isLoading = true

    this.userService.updateUser({ id: this.user!.id, ...user }).subscribe(() => {
      this.isLoading = false

      this.userForm.reset()

      // this.drawer.hide()

      this.getUsers()
    })
  }

  handleResetForm() {
    this.userForm.reset()
  }
}
