import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ApiServiceUser } from '../../services/userservice';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'content',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content implements OnInit {
  signupForm!: FormGroup;
  showSuccess = false;
  showError = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceUser,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.showSuccess = false;
    this.showError = false;

    if (this.signupForm.valid) {
      this.apiService.submitSignUpForm(this.signupForm.value).subscribe({
        next: (response) => {
          this.signupForm.reset();
          this.showSuccess = true;
          this.cdr.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          // Handle Bad Request (400) or other HTTP errors
          this.showError = true;
          if (error.status === 400) {
            // Fallback to error.message if the backend response didn't include a custom text message
            this.errorMsg =
              error.error?.message || 'Invalid data submitted. Please check your form.';
          } else {
            this.errorMsg = 'An unexpected error occurred. Please try again.';
          }
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
