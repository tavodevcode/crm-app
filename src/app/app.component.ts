import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { Drawer, DrawerOptions, InstanceOptions, initFlowbite } from 'flowbite'
import { NavigationComponent } from './navigation/navigation.component'
import { UserFormComponent } from './components/user-form/user-form.component'
import { UserFormService } from './components/user-form/user-form.service'
import { User } from './interfaces/user'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, UserFormComponent],
  providers: [UserFormService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'crm-app'

  users: User[] = []
  user: User | undefined
  isEdit: boolean = false
  userFilter: User[] = []

  constructor(private userService: UserFormService) {}

  ngOnInit(): void {
    initFlowbite()

    this.getUsers()
  }

  getUsers = () => {
    this.userService.getUsers().subscribe((users) => {
      this.users = users
      this.userFilter = users
    })
  }

  handleAddUsers() {
    this.isEdit = false
    this.user = undefined

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

    const drawer = new Drawer($targetEl, options, instanceOptions)

    drawer.show()
  }

  handlEditUsers(user: User) {
    this.isEdit = true

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

    const drawer = new Drawer($targetEl, options, instanceOptions)

    drawer.show()

    this.user = user
  }

  handleDeleteUsers(id: number) {
    this.userService.deleteUsers(id).subscribe(() => {
      alert(`User with id ${id} has been deleted`)

      this.getUsers()
    })
  }

  handleSearch(value: Event) {
    const searchValue = (value.target as HTMLInputElement).value

    if (searchValue === '') {
      this.userFilter = this.users

      return
    }

    this.userFilter = this.users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.address.toLowerCase().includes(searchValue.toLowerCase())
    )
  }
}
