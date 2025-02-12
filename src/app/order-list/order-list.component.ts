import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Table } from 'primeng/table';
import { OrderService } from '../services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Order {
  id: number;
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
selectedOrders: any[] = [];

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


  deleteSelectedOrders() {
    if (this.selectedOrders.length === 0) {
      console.log("No orders selected.");
      return;
    }
  
    if (confirm("Are you sure you want to delete the selected orders?")) {
      const orderIds = this.selectedOrders.map(order => order.id);
  
      this.orderService.deleteMultipleOrders(orderIds).subscribe(
        () => {
          this.orderlist = this.orderlist.filter(order => !orderIds.includes(order.id));
          this.selectedOrders = []; // Clear the selection
          alert("Selected orders deleted successfully.");
        },
        (error) => {
          console.error("Error deleting orders:", error);
          alert("Failed to delete selected orders.");
        }
      );
    }
  }
  

  onRowClick(event: Event, order: any) {
  // Prevent checkbox clicks from opening edit modal
  const targetElement = event.target as HTMLElement;

  // Check if the clicked element is inside a checkbox
  if (targetElement.tagName === 'INPUT' && targetElement.getAttribute('type') === 'checkbox') {
    return;
  }

  this.openEditDialog(order); // Open edit modal only when clicking on the row
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
      this.selectedOrderId = order.id;  // Store the selected order's ID
    
      // Ensure all fields are populated correctly
      this.editOrderForm.patchValue({
        orderDetails: order.orderDetails || '',
        phoneNumber: order.phoneNumber || '',
        status: order.status || '',
        priority: order.priority || '',
        orderDate: order.orderDate || '',
        estimatedDays: order.estimatedDays || '',
        totalAmount: order.totalAmount || '',
        advance: order.advance || '',
        remainingBalance: order.remainingBalance || (order.totalAmount - order.advance),
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
