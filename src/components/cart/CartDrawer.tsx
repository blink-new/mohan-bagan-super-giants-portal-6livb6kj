import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Input } from '../ui/Input'
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, X } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { blink } from '../../blink/client'
import { useToast } from '../../hooks/useToast'

export function CartDrawer() {
  const { items, updateQuantity, removeFromCart, clearCart, total, itemCount, isOpen, setIsOpen } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [shippingAddress, setShippingAddress] = useState('')
  const { showToast } = useToast()

  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsCheckingOut(true)
    try {
      // Get current user
      const user = await blink.auth.me()
      
      // Create order
      const orderId = `order_${Date.now()}`
      await blink.db.orders.create({
        id: orderId,
        userId: user.id,
        totalAmount: total,
        status: 'pending',
        shippingAddress: shippingAddress || 'No address provided'
      })

      // Create order items
      for (const item of items) {
        await blink.db.orderItems.create({
          id: `item_${Date.now()}_${item.id}`,
          orderId,
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })
      }

      // Clear cart and close drawer
      clearCart()
      setIsOpen(false)
      
      showToast(`Order #${orderId} placed successfully! Total: ₹${total.toFixed(2)}`, 'success')
    } catch (error) {
      console.error('Checkout error:', error)
      showToast('Checkout failed. Please try again.', 'error')
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Cart ({itemCount} items)
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        {item.image_url ? (
                          <img 
                            src={item.image_url} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              target.nextElementSibling?.classList.remove('hidden')
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {item.name.substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-sm text-gray-600">₹{item.price}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-7 w-7 p-0"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-7 w-7 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Checkout Section */}
              <div className="border-t p-4 space-y-4 bg-white">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Shipping Address</label>
                  <textarea
                    placeholder="Enter your shipping address..."
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
                  />
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold mb-4">
                    <span>Total:</span>
                    <span className="text-primary">₹{total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={clearCart}
                      className="flex-1"
                      size="sm"
                    >
                      Clear Cart
                    </Button>
                    <Button 
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="flex-1"
                      size="sm"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {isCheckingOut ? 'Processing...' : 'Checkout'}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}