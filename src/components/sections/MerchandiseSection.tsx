import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { blink } from '../../blink/client'
import { toast } from '../../hooks/use-toast'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock_quantity: number
}

export function MerchandiseSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { addToCart } = useCart()

  const loadProducts = async () => {
    try {
      const data = await blink.db.products.list()
      setProducts(data)
    } catch (error) {
      console.error('Failed to load products:', error)
      toast({
        title: "Failed to load products",
        description: "Please refresh the page to try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url
    })
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Official Merchandise</h2>
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Official Merchandise</h2>
          <p className="text-lg text-gray-600">Show your support with authentic Mohan Bagan gear</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === 'all' ? 'All Items' : category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="secondary" className="rounded-full p-2">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  {product.stock_quantity < 10 && (
                    <Badge className="absolute top-4 left-4 bg-red-500">
                      Only {product.stock_quantity} left
                    </Badge>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                    </div>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock_quantity === 0}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}