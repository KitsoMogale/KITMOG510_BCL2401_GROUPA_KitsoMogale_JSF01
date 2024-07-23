import Alpine from 'alpinejs'
import { getCategories } from './api';


document.addEventListener('alpine:init', () => {
Alpine.store('state', {
  products: [],
  originalProducts: [],
  loading: false,
  error: false,
  sorting: "default",
  searchTerm: "",
  filterItem: "All categories",

  setFilterItem(item) {
           this.filterItem = item;
  },

  setSorting(item){
    this.sorting = item.target.value;
  },

  setSearchTerm(item){
    this.searchTerm = item.target.value;
  },
  sortProducts() {
    if (this.sorting !== "default") {
      
        this.products= this.products.sort((a, b) =>
          this.sorting === "low" ? a.price - b.price : b.price - a.price
        )
    } else {
      const { originalProducts } = this;
      this.products= JSON.parse(JSON.stringify(originalProducts))
    }
  },

  searchProducts() {
    const  originalProducts  = this;
    if (this.searchTerm.trim() !== "") {
      const filteredProducts = originalProducts.filter((product) =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
        this.products= JSON.parse(JSON.stringify(filteredProducts));
     
    };
  },

  async fetchProducts() {
   
    if (this.filterItem != "All categories") {
       
      try {
        this.loading = true;
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${this.filterItem}`
        );
        if (!response.ok) {
          throw new Error(
            "Data fetching failed, please check your network connection"
          );
        }
        const data = await response.json();
        this.products = data,
        this.originalProducts = JSON.parse(JSON.stringify(data)),
        this.loading = false
      }
       catch (error) {
        this.error = error 
      } finally {
        this.sortProducts();
        this.searchProducts();
      }
    } else {
      try {
        this.loading= true;
        const response = await fetch(`https://fakestoreapi.com/products`);
        if (!response.ok) {
          throw new Error(
            "Data fetching failed :( , please check your network connection and reload."
          );
        }
        const data = await response.json();
       
          this.products= data,
         this.originalProducts= JSON.parse(JSON.stringify(data)),
          this.loading= false
        
      } catch (error) {
        this.error= error
      } finally {
        this.sortProducts();
        this.searchProducts();
      }
    }
  },

  async initializeCategories() {
    const { response } = await getCategories();
    
    return response
  }

})
});

Alpine.start()