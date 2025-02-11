import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.css'],
    standalone: false
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  selectedFile: File | null = null;
  filePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private orderService: OrderService,private messageService: MessageService) {
    this.orderForm = this.fb.group({
      orderDetails: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      orderDate: ['', Validators.required],
      estimatedDays: ['', [Validators.required, Validators.min(1)]],
      totalAmount: ['', [Validators.required, Validators.min(0)]],
      advance: ['', [Validators.required, Validators.min(0)]],
      remainingBalance: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.orderForm.get('totalAmount')?.valueChanges.subscribe(() => this.calculateRemainingBalance());
    this.orderForm.get('advance')?.valueChanges.subscribe(() => this.calculateRemainingBalance());
  }

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
    this.selectedFile = null;

    this.messageService.add({ 
      severity: "success", 
      summary: "GeeksforGeeks", 
      detail: "Success Service Message", 
    });
  }

  calculateRemainingBalance(): void {
    const totalAmount = this.orderForm.get('totalAmount')?.value || 0;
    const advance = this.orderForm.get('advance')?.value || 0;
    const remaining = totalAmount - advance;
    this.orderForm.get('remainingBalance')?.setValue(remaining >= 0 ? remaining : 0);
  }

  onSubmit() {
    if (this.orderForm.valid && this.selectedFile) {
      const orderJson = {
        orderDetails: this.orderForm.get('orderDetails')!.value,
        phoneNumber: this.orderForm.get('phoneNumber')!.value,
        status: this.orderForm.get('status')!.value,
        priority: this.orderForm.get('priority')!.value,
        orderDate: this.orderForm.get('orderDate')!.value,
        estimatedDays: this.orderForm.get('estimatedDays')!.value,
        totalAmount: this.orderForm.get('totalAmount')!.value,
        advance: this.orderForm.get('advance')!.value,
        remainingBalance: this.orderForm.get('remainingBalance')!.value,
      };

      this.orderService.submitOrder(orderJson, this.selectedFile).subscribe(
        response => {
          console.log('Success!', response);
        },
        error => {
          console.error('Error!', error);
        }
      ); 
    } else {
      console.log('Form is invalid');
    }
  }
}
