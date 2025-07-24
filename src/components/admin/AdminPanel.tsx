import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Plus, Edit, Trash2, Package, ShoppingCart, Users, TrendingUp } from 'lucide-react'
import { blink } from '../../blink/client'
import { toast } from '../../hooks/use-toast'
import { AdminGuard } from '../ui/AdminGuard'
import { LoadingSpinner } from '../ui/LoadingSpinner'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock_quantity: number
}

interface Order {
  id: string
  user_id: string
  total_amount: number
  status: string
  shipping_address: string
  created_at: string
}

interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
}

export function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    stock_quantity: ''
  })

  const loadData = async () => {
    try {
      const [productsData, ordersData] = await Promise.all([
        blink.db.products.list(),
        blink.db.orders.list({ orderBy: { created_at: 'desc' } })
      ])
      setProducts(productsData)
      setOrders(ordersData)
    } catch (error) {
      console.error('Failed to load admin data:', error)
      toast({
        title: "Failed to load data",
        description: "Please refresh the page to try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAddProduct = async () => {
    if (!productForm.name || !productForm.price) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    setIsAddingProduct(true)
    try {
      const productId = `prod_${Date.now()}`
      await blink.db.products.create({
        id: productId,
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        image_url: productForm.image_url || 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
        category: productForm.category || 'general',
        stock_quantity: parseInt(productForm.stock_quantity) || 0
      })

      setProductForm({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category: '',
        stock_quantity: ''
      })

      await loadData()
      toast({
        title: "Product added successfully!",
        description: `${productForm.name} has been added to the store.`,
      })
    } catch (error) {
      console.error('Failed to add product:', error)
      toast({
        title: "Failed to add product",
        description: "Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsAddingProduct(false)
    }
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct) return

    try {
      await blink.db.products.update(editingProduct.id, {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        image_url: productForm.image_url,
        category: productForm.category,
        stock_quantity: parseInt(productForm.stock_quantity)
      })

      setEditingProduct(null)
      setProductForm({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category: '',
        stock_quantity: ''
      })

      await loadData()
      toast({
        title: "Product updated successfully!",
      })
    } catch (error) {
      console.error('Failed to update product:', error)
      toast({
        title: "Failed to update product",
        description: "Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await blink.db.products.delete(productId)
      await loadData()
      toast({
        title: "Product deleted successfully!",
      })
    } catch (error) {
      console.error('Failed to delete product:', error)
      toast({
        title: "Failed to delete product",
        description: "Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await blink.db.orders.update(orderId, { status })
      await loadData()
      toast({
        title: "Order status updated!",
      })
    } catch (error) {
      console.error('Failed to update order:', error)
      toast({
        title: "Failed to update order",
        description: "Please try again.",
        variant: "destructive"
      })
    }
  }

  const startEditProduct = (product: Product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      category: product.category,
      stock_quantity: product.stock_quantity.toString()
    })
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0)
  const totalProducts = products.length
  const totalOrders = orders.length
  const pendingOrders = orders.filter(order => order.status === 'pending').length

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 p-8 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your Mohan Bagan Super Giants store</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
              <span className="ml-3 text-gray-600">Loading dashboard data...</span>
            </div>
          ) : (
            <>
              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="card-hover glass">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">₹{totalRevenue.toFixed(2)}</div>
                    <p className="text-sm text-green-600 mt-1">+12% from last month</p>
                  </CardContent>
                </Card>
                
                <Card className="card-hover glass">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{totalProducts}</div>
                    <p className="text-sm text-blue-600 mt-1">Active inventory</p>
                  </CardContent>
                </Card>
                
                <Card className="card-hover glass">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <ShoppingCart className="h-5 w-5 text-purple-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{totalOrders}</div>
                    <p className="text-sm text-purple-600 mt-1">All time orders</p>
                  </CardContent>
                </Card>
                
                <Card className="card-hover glass">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Pending Orders</CardTitle>
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Users className="h-5 w-5 text-orange-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{pendingOrders}</div>
                    <p className="text-sm text-orange-600 mt-1">Needs attention</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="products" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                  <TabsTrigger value="products" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Products
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Orders
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="products" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
                      <p className="text-gray-600">Manage your store inventory and product catalog</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="btn-hover shadow-lg">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Product
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name" className="text-sm font-medium">Product Name *</Label>
                            <Input
                              id="name"
                              value={productForm.name}
                              onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Enter product name"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                            <Textarea
                              id="description"
                              value={productForm.description}
                              onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Enter product description"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="price" className="text-sm font-medium">Price *</Label>
                            <Input
                              id="price"
                              type="number"
                              value={productForm.price}
                              onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                              placeholder="Enter price"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="image_url" className="text-sm font-medium">Image URL</Label>
                            <Input
                              id="image_url"
                              value={productForm.image_url}
                              onChange={(e) => setProductForm(prev => ({ ...prev, image_url: e.target.value }))}
                              placeholder="Enter image URL"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                            <Select value={productForm.category} onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="jerseys">Jerseys</SelectItem>
                                <SelectItem value="accessories">Accessories</SelectItem>
                                <SelectItem value="training">Training</SelectItem>
                                <SelectItem value="general">General</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="stock" className="text-sm font-medium">Stock Quantity</Label>
                            <Input
                              id="stock"
                              type="number"
                              value={productForm.stock_quantity}
                              onChange={(e) => setProductForm(prev => ({ ...prev, stock_quantity: e.target.value }))}
                              placeholder="Enter stock quantity"
                              className="mt-1"
                            />
                          </div>
                          <Button 
                            onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                            disabled={isAddingProduct}
                            className="w-full btn-hover"
                            loading={isAddingProduct}
                          >
                            {editingProduct ? 'Update Product' : 'Add Product'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Card className="shadow-lg">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="font-semibold">Image</TableHead>
                            <TableHead className="font-semibold">Name</TableHead>
                            <TableHead className="font-semibold">Category</TableHead>
                            <TableHead className="font-semibold">Price</TableHead>
                            <TableHead className="font-semibold">Stock</TableHead>
                            <TableHead className="font-semibold">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product.id} className="hover:bg-gray-50 transition-colors">
                              <TableCell>
                                <img 
                                  src={product.image_url} 
                                  alt={product.name} 
                                  className="w-12 h-12 object-cover rounded-lg shadow-sm" 
                                />
                              </TableCell>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="capitalize">
                                  {product.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-semibold">₹{product.price}</TableCell>
                              <TableCell>
                                <Badge variant={product.stock_quantity > 10 ? "success" : product.stock_quantity > 0 ? "warning" : "error"}>
                                  {product.stock_quantity}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" onClick={() => startEditProduct(product)} className="hover:bg-blue-50">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="danger" onClick={() => handleDeleteProduct(product.id)} className="hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="orders" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
                    <p className="text-gray-600">Track and manage customer orders</p>
                  </div>
                  
                  <Card className="shadow-lg">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="font-semibold">Order ID</TableHead>
                            <TableHead className="font-semibold">User ID</TableHead>
                            <TableHead className="font-semibold">Total</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold">Date</TableHead>
                            <TableHead className="font-semibold">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
                              <TableCell className="font-mono text-sm">{order.id.slice(0, 8)}...</TableCell>
                              <TableCell className="font-mono text-sm">{order.user_id.slice(0, 8)}...</TableCell>
                              <TableCell className="font-semibold">₹{order.total_amount.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge variant={
                                  order.status === 'completed' ? 'success' :
                                  order.status === 'pending' ? 'warning' :
                                  order.status === 'cancelled' ? 'error' : 'info'
                                }>
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Select value={order.status} onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}>
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </AdminGuard>
  )
}