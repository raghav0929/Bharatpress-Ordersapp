import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.css'],
    standalone: false
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      orderDetails: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      orderDate: ['', Validators.required], // Add Order Date
      estimatedDays: [
        '',
        [Validators.required, Validators.min(1)], // Estimated Days (minimum value 1)
      ],
    });
  }

  ngOnInit(): void {}

  filePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
  
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
  resetForm(fileInput: HTMLInputElement) {
    this.orderForm.reset(); // Reset the form fields
    fileInput.value = '';   // Clear the file input
    this.selectedFile=null;
  }
  
  

  onSubmit() {
    if (this.orderForm.valid) {
      console.log('Form Data:', this.orderForm.value);
      // Here, we can send this data to the backend API using a service
    } else {
      console.log('Form is invalid');
    }
  }
}
