import { Service } from '@angular/core';

@Service()

export class Products {
  urldefault = "https://media.istockphoto.com/id/2251833117/photo/negative-feedback-and-customer-dissatisfaction-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=VN6cx0cRGoRICP7oY0VjCCbRRnlDyOLShX9V0KIHuzk=";
  produk = [
    {
      name: "CHEESE BURGER",
      url: "",
      description: "Juicy beef burger with melted cheese, fresh lettuce, tomato, and a soft sesame bun.",
      hargabeli: 30000,
      hargajual: 45000,
      kategori: "Makanan",
      stok: 15
    },
    {
      name: "FRENCH FRIES",
      url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=850&h=500&fit=crop",
      description: "Crispy golden french fries, lightly salted and perfect as a side dish or snack.",
      hargabeli: 15000,
      hargajual: 25000,
      kategori: "Makanan",
      stok: 12
    },
    {
      name: "COCA COLA",
      url: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=850&h=500&fit=crop",
      description: "Refreshing chilled Coca-Cola with a classic sweet and fizzy cola flavor.",
      hargabeli: 9000,
      hargajual: 15000,
      kategori: "Minuman",
      stok: 20
    },
    {
      name: "FANTA",
      url: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=850&h=500&fit=crop",
      description: "Refreshing orange-flavored soda with a sweet and fruity taste, served chilled.",
      hargabeli: 9000,
      hargajual: 15000,
      kategori: "Minuman",
      stok: 15
    },
    {
      name: "SPRITE",
      url: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=850&h=500&fit=crop",
      description: "Refreshing lemon-lime soda with a crisp, fizzy taste that is perfect for a hot day.",
      hargabeli: 9000,
      hargajual: 15000,
      kategori: "Minuman",
      stok: 12
    },
    {
      name: "STAINLESS STEEL SPOON",
      url: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?w=850&h=500&fit=crop",
      description: "Durable stainless steel spoon suitable for everyday dining and restaurant use.",
      hargabeli: 8000,
      hargajual: 15000,
      kategori: "Peralatan Makan",
      stok: 7
    },
    {
      name: "STAINLESS STEEL FORK",
      url: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=850&h=500&fit=crop",
      description: "Classic stainless steel fork with a durable design for everyday meals.",
      hargabeli: 8000,
      hargajual: 15000,
      kategori: "Peralatan Makan",
      stok: 7
    },
    {
      name: "STAINLESS STEEL KNIFE",
      url: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=850&h=500&fit=crop",
      description: "Stainless steel dining knife with a simple and durable design.",
      hargabeli: 10000,
      hargajual: 18000,
      kategori: "Peralatan Makan",
      stok: 5
    },
    {
      name: "CUTLERY SET",
      url: "",
      description: "Complete cutlery set containing essential utensils for everyday dining.",
      hargabeli: 45000,
      hargajual: 70000,
      kategori: "Peralatan Makan",
      stok: 10
    }
  ];

  tambahproduk(p_name:string, p_url:string, p_description:string, p_hargabeli:number, p_hargajual:number, p_stok:number, p_kategori:string){
    this.produk.push({name:p_name, url:p_url, description:p_description, hargabeli:p_hargabeli, hargajual:p_hargajual, stok:p_stok, kategori:p_kategori});
    console.log("=== CEK SERVICE: Data Berhasil Di-push ===");
    console.table(this.produk);
  }
}
