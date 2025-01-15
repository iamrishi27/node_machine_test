import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories/categories.service';
import { ProductsService } from './services/products/products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AppComponent implements OnInit {
  title = 'Product Management';
  productName: string = '';
  selectedCategory: string = '';
  editingProductId: number | null = null;
  categories: any[] = [];
  products: any[] = [];
  currentPage: number = 1;
  totalPages: number = 10;
  totalProducts: number = 0;
  pageSize: number = 10;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories(): void {
    this.categoriesService.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  getProducts(page: number = 1, pageSize: number = 10): void {
    this.productsService
      .getAllProducts(page, pageSize)
      .subscribe((data: any) => {
        // console.log("data");
        this.products = data.products;
        this.totalPages = data.totalPages;
        this.totalProducts = data.totalProducts;

        
        this.products.forEach((product: any) => {
          const category = this.categories.find(
            (cat) => cat.CategoryName.toLowerCase() === product.ProductCategory.toLowerCase()
          );
          if (category) product.categoryId = category.CategoryId;
        });
      });
  }

 
  onSubmit(form: any): void {
    if (form.valid) {
      if (this.editingProductId !== null) {
        this.onUpdateProduct(form);
      } else {
        this.onAddProduct(form);

        //console.log(onsubmit);
      }
    }
  }

  onAddProduct(form: any): void {
    const payload = {
      ProductName: this.productName,
      ProductCategory: this.selectedCategory,
    };
    this.productsService.addProduct(payload).subscribe(
      (response: any) => {
        console.log('Product added successfully:', response);
        this.getProducts();
        this.resetForm(form);
        //  console.log("CategoryName") ;
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }

  onUpdateProduct(form: any): void {

    // const payload = {
    //   ProductName: this.productName,
    //   ProductCategory: this.selectedCategory

    const payload = {
      ProductName: this.productName,
      ProductCategory: this.selectedCategory,
    };
    this.productsService
      .updateProduct(this.editingProductId, payload)
      .subscribe(
        (response: any) => {
          console.log('Product updated successfully:', response);
          this.getProducts();
          this.resetForm(form);
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
  }

  deleteProduct(id: number): void {
    this.productsService.deleteProduct(id).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.getProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  editProduct(productId: number): void {
    const product = this.products.find((p) => p.ProductId === productId);
    if (product) {
      this.productName = product.ProductName;
      this.selectedCategory = product.ProductCategory;
      this.editingProductId = productId;
    }
  }

  resetForm(form: any): void {
    form.resetForm();
    this.productName = '';
    this.selectedCategory = '';
    this.editingProductId = null;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getProducts(page, this.pageSize);
    }
  }
}
