import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Table } from 'primeng/table';
import { OrderService } from '../services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Order {
  orderDetails: string;
  phoneNumber: string;
  status: string;
  priority: string;
  orderDate: string;
  estimatedDays: number;
  totalAmount: number;
  advance: number;
  remainingBalance: number;
  orderPhoto: string;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  standalone:false
})
export class OrderListComponent implements AfterViewInit {

  orderlist: Order[] = [];
  isModalOpen = false; // Track modal state
  modalImage: string | null = null; // Track the image to display in the modal
  editDialogVisible = false; // Track dialog visibility
  selectedOrder: any = null; // Currently selected order for editing
 // Dropdown options
 statusOptions = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Completed', value: 'Completed' },
];
priorityOptions = [
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
];
editOrderForm: FormGroup;
selectedOrderId: number | null = null;

constructor(private fb: FormBuilder, private orderService: OrderService) {
  this.editOrderForm = this.fb.group({
    orderDetails: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10-digit phone validation
    status: ['', Validators.required],   // ✅ Ensure this is included
    priority: ['', Validators.required], // ✅ Ensure this is included
    orderDate: ['', Validators.required],
    estimatedDays: [0, Validators.required],
    totalAmount: [0, Validators.required],
    advance: [0, Validators.required],
    remainingBalance: [{ value: 0, disabled: true }], // Readonly
    orderPhoto: [''] // Readonly, since we are not updating it
  });
}

  @ViewChild('dt') dt: Table | undefined;  // Define ViewChild for p-table

  ngOnInit(): void {
    this.fetchOrders();
  }

  // This lifecycle hook is called after the component view is initialized
  ngAfterViewInit() {
    // Ensure the table reference is available
    if (this.dt) {
      console.log('Table is available:', this.dt);
    }
  }

  // Filter method to be used for custom filtering
  filterGlobal(event: any, field: string) {
    if (this.dt) {
      const filterValue = event.target.value.trim();
      this.dt.filter(filterValue, field, 'contains');
    }
  }

  fetchOrders(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orderlist = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  

  openModal(imageUrl: string, event: Event): void {
    event.stopPropagation();
    this.modalImage = imageUrl;
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.modalImage = null;
  }

    // Open the edit dialog when a row is clicked
    openEditDialog(order: any) {
      this.selectedOrderId = order['data'].id;  // Store the selected order's ID
    
      // Ensure all fields are populated correctly
      this.editOrderForm.patchValue({
        orderDetails: order['data'].orderDetails || '',
        phoneNumber: order['data'].phoneNumber || '',
        status: order['data'].status || '',
        priority: order['data'].priority || '',
        orderDate: order['data'].orderDate || '',
        estimatedDays: order['data'].estimatedDays || '',
        totalAmount: order['data'].totalAmount || '',
        advance: order['data'].advance || '',
        remainingBalance: order['data'].remainingBalance || (order['data'].totalAmount - order['data'].advance),
      });
    
      this.editDialogVisible = true;  // Open the edit dialog
    }

    calculateRemainingBalance() {
      const total = this.editOrderForm.get('totalAmount')!.value || 0;
      const advance = this.editOrderForm.get('advance')!.value || 0;
      this.editOrderForm.patchValue({ remainingBalance: total - advance });
    }
    
  
    // Save the edited order
    updateOrder() {
      if (this.editOrderForm.valid && this.selectedOrderId !== null) {
        const updatedOrder = {
          ...this.editOrderForm.value,
          id: this.selectedOrderId,
        };
    
        this.orderService.updateOrder(updatedOrder).subscribe(
          () => {
            console.log('Order updated successfully');
            this.editDialogVisible = false;
            this.fetchOrders(); // Refresh the order list
          },
          (error) => console.error('Error updating order:', error)
        );
      }
    }
    
}
