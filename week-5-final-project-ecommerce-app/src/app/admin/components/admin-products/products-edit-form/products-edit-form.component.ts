import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../shared/constants/product.model';
import { FirebaseDataService } from '../../../../shared/services/firebase/data.firebase.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-products-edit-form',
  templateUrl: './products-edit-form.component.html',
  styleUrls: ['./products-edit-form.component.css'],
})
export class ProductsEditFormComponent implements OnInit {
  @Input('product') productData!: Product;
  products: Product | null;
  /* Form to edit product */
  editProductForm!: FormGroup;
  loading = {
    update: false,
    del: false,
  };

  categories = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ];

  constructor(
    private _data: FirebaseDataService,
    private _toast: ToastService
  ) {
    this.products = this.productData;
  }

  onSubmit() {
    this.editProductForm.disable();
    this.loading.update = true;
    this._data
      .updateProduct({
        ...this.editProductForm.value,
        id: this.productData.id,
        rating: this.productData.rating,
      })
      .subscribe({
        next: () => {
          this._toast.showSuccessToast(
            'Data Updated for ' + this.productData.id
          );
          this.loading.update = false;
          this.editProductForm.enable();
        },
        error: (error) => {
          this._toast.showErrorToast(error.message);
          this.loading.update = false;
          this.editProductForm.enable();
        },
      });
  }

  ngOnInit(): void {
    this.updateUI();
  }

  onDelete() {
    const confirmation = confirm(
      'Product deletion is irreversible, are you sure?'
    );
    if (confirmation) {
      this.loading.del = true;
      this._data.deleteProduct(this.productData.id).subscribe({
        next: () => {
          this._toast.showSuccessToast(this.productData.id + ' deleted.');
          this.loading.del = false;
        },
        error: (e) => {
          this._toast.showErrorToast(e.message);
          this.loading.del = false;
        },
      });
    }
  }

  private updateUI() {
    this.editProductForm = new FormGroup({
      id: new FormControl(this.productData.id),
      title: new FormControl(this.productData.title, [Validators.required]),
      description: new FormControl(this.productData.description, [
        Validators.required,
      ]),
      category: new FormControl(this.productData.category, [
        Validators.required,
      ]),
      price: new FormControl(this.productData.price, [Validators.required]),
      image: new FormControl(this.productData.image, [Validators.required]),
      stock: new FormControl(this.productData.stock, [Validators.required]),
    });
  }
}
