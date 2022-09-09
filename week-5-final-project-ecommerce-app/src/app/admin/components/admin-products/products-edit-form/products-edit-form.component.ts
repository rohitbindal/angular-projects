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
    const id = this.editProductForm.get('id')?.value;
    this.editProductForm.disable();
    this.loading.update = true;
    this._data
      .updateProduct({
        ...this.editProductForm.value,
        id: id,
        rating: this.productData?.rating.rate
          ? this.productData.rating
          : { rate: 0, count: 0 },
      })
      .subscribe({
        next: () => {
          if (this.productData)
            this._toast.showSuccessToast('Data Updated for ' + id);
          else {
            this._toast.showSuccessToast('Created Product ' + id);
            this.editProductForm.reset();
          }
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
    if (this.productData)
      this.editProductForm = new FormGroup({
        id: new FormControl(
          {
            value: this.productData.id,
            disabled: true,
          },
          [Validators.required]
        ),
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
        disabled: new FormControl(!!this.productData?.disabled, [
          Validators.required,
        ]),
      });
    else
      this.editProductForm = new FormGroup({
        id: new FormControl('', [Validators.required]),
        title: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        category: new FormControl('', [Validators.required]),
        price: new FormControl(null, [Validators.required]),
        image: new FormControl(null, [Validators.required]),
        stock: new FormControl(true, [Validators.required]),
        disabled: new FormControl(false, [Validators.required]),
      });
  }
}