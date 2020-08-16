import { Component, OnInit } from '@angular/core';
import { CartitemsService } from '../cartitems.service';
import { Item } from '../item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  items: Item[];
  isShowing: boolean = false;
  selectedItem: Item;
  editItem: boolean;

  constructor(private cartItemsService: CartitemsService) {}

  ngOnInit(): void {
    this.selectedItem = {
      id: 0,
      product: '',
      price: 0,
      quantity: 0,
    };

    this.cartItemsService
      .getAllItems()
      .subscribe(this.onSuccess.bind(this), this.onError.bind(this));
  }

  onSuccess(items: Item[]) {
    this.items = items;
  }

  onError(error: Error) {
    alert(error.message);
  }

  itemFormSubmitted(item) {
    this.cartItemsService.addItem(item).subscribe(() => {
      this.cartItemsService
        .getAllItems()
        .subscribe(this.onSuccess.bind(this), this.onError.bind(this));
    });
  }

  deleteItem(id) {
    this.cartItemsService.deleteItem(id).subscribe(() => {
      alert(`Item with id ${id} was deleted.`);
      this.cartItemsService.getAllItems().subscribe((data) => {
        this.items = data;
      });
    });
  }

  updateItem(e) {
    e.preventDefault();
    this.cartItemsService.updateItem(this.selectedItem).subscribe(() => {
      this.cartItemsService.getAllItems().subscribe((data) => {
        this.items = data;
      });
    });
  }

  itemClicked(item: Item) {
    this.editItem = true;
    this.selectedItem = item;
    console.log(this.selectedItem);
  }
}
