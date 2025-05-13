import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Typography, 
  Table, 
  InputNumber, 
  Divider, 
  Input, 
  Space,
  Form,
  Empty,
  Breadcrumb,
  notification
} from 'antd';
import { 
  DeleteOutlined, 
  ShoppingOutlined, 
  RightOutlined, 
  LockOutlined,
  ShieldOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const CartPage = () => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Mexico Calling Card',
      price: 10.00,
      image: 'https://via.placeholder.com/80x80',
      quantity: 1
    },
    {
      id: 2,
      title: 'India Calling Card',
      price: 15.00,
      image: 'https://via.placeholder.com/80x80',
      quantity: 2
    },
    {
      id: 3,
      title: 'China Calling Card',
      price: 12.00,
      image: 'https://via.placeholder.com/80x80',
      quantity: 1
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const taxes = subtotal * 0.05; // 5% tax rate for example
  const shipping = 0; // Free shipping
  const total = subtotal + taxes - discount;

  // Handle quantity change
  const handleQuantityChange = (id, value) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  // Handle item removal
  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    notification.success({
      message: 'Item Removed',
      description: 'The item has been removed from your cart.',
    });
  };

  // Apply coupon code
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      setCouponApplied(true);
      setDiscount(subtotal * 0.1); // 10% discount
      notification.success({
        message: 'Coupon Applied',
        description: 'Discount successfully applied to your order.',
      });
    } else {
      notification.error({
        message: 'Invalid Coupon',
        description: 'The coupon code you entered is invalid or expired.',
      });
    }
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (_, record) => (
        <div className="flex items-center">
          <img 
            src={record.image} 
            alt={record.title} 
            className="w-16 h-16 mr-4 object-cover rounded"
          />
          <div>
            <Link to={`/products/${record.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
              {record.title}
            </Link>
            <div className="text-gray-500 text-sm mt-1">
              Item #{record.id}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span className="font-medium">${price.toFixed(2)}</span>,
      responsive: ['md'],
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <InputNumber
          min={1}
          max={10}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
          className="w-20"
        />
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (_, record) => (
        <span className="font-bold">
          ${(record.price * record.quantity).toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record.id)}
        />
      ),
    },
  ];

  // Mobile view item card
  const renderMobileCartItem = (item) => (
    <Card key={item.id} className="mb-4">
      <div className="flex">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-16 h-16 mr-4 object-cover rounded"
        />
        <div className="flex-grow">
          <Link to={`/products/${item.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
            {item.title}
          </Link>
          <div className="text-gray-500 text-sm mb-2">Item #{item.id}</div>
          <div className="flex justify-between items-center">
            <InputNumber
              min={1}
              max={10}
              value={item.quantity}
              onChange={(value) => handleQuantityChange(item.id, value)}
              className="w-20"
            />
            <div className="text-right">
              <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
              <div className="text-gray-500 text-sm">${item.price.toFixed(2)} each</div>
            </div>
          </div>
        </div>
      </div>
      <Button 
        type="text"
        danger
        icon={<DeleteOutlined />}
        className="mt-2"
        onClick={() => handleRemoveItem(item.id)}
      >
        Remove
      </Button>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Shopping Cart</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2} className="mb-8">Shopping Cart</Title>

      {cartItems.length === 0 ? (
        <Card className="text-center py-12">
          <Empty 
            description={
              <span className="text-gray-500">Your cart is empty</span>
            }
          >
            <Link to="/products">
              <Button type="primary" icon={<ShoppingOutlined />} size="large" className="mt-4 bg-blue-600 hover:bg-blue-700">
                Browse Products
              </Button>
            </Link>
          </Empty>
        </Card>
      ) : (
        <Row gutter={[24, 24]}>
          {/* Cart Items */}
          <Col xs={24} lg={16}>
            {/* Desktop view */}
            <div className="hidden md:block">
              <Table 
                columns={columns} 
                dataSource={cartItems} 
                rowKey="id"
                pagination={false}
                className="mb-6"
              />
            </div>

            {/* Mobile view */}
            <div className="md:hidden">
              {cartItems.map(item => renderMobileCartItem(item))}
            </div>

            {/* Continue Shopping */}
            <div className="flex justify-between items-center mt-6">
              <Link to="/products">
                <Button type="default" size="large">
                  <ShoppingOutlined /> Continue Shopping
                </Button>
              </Link>
              <Button type="default" size="large" onClick={() => setCartItems([])}>
                <DeleteOutlined /> Clear Cart
              </Button>
            </div>
          </Col>

          {/* Order Summary */}
          <Col xs={24} lg={8}>
            <Card 
              title={<Title level={4}>Order Summary</Title>} 
              className="sticky top-24"
            >
              <div className="flex justify-between py-2">
                <Text>Subtotal</Text>
                <Text>${subtotal.toFixed(2)}</Text>
              </div>
              {discount > 0 && (
                <div className="flex justify-between py-2 text-green-600">
                  <Text>Discount</Text>
                  <Text>-${discount.toFixed(2)}</Text>
                </div>
              )}
              <div className="flex justify-between py-2">
                <Text>Shipping</Text>
                <Text>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</Text>
              </div>
              <div className="flex justify-between py-2">
                <Text>Taxes</Text>
                <Text>${taxes.toFixed(2)}</Text>
              </div>
              
              <Divider />
              
              <div className="flex justify-between py-2">
                <Title level={5}>Total</Title>
                <Title level={5}>${total.toFixed(2)}</Title>
              </div>

              {/* Coupon Code */}
              <div className="mt-4 mb-6">
                <Form layout="vertical">
                  <Form.Item label="Coupon Code">
                    <Space.Compact style={{ width: '100%' }}>
                      <Input 
                        placeholder="Enter coupon code" 
                        value={couponCode} 
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={couponApplied}
                      />
                      <Button type="primary" onClick={handleApplyCoupon} disabled={couponApplied}>
                        Apply
                      </Button>
                    </Space.Compact>
                    {couponApplied && (
                      <div className="text-green-600 text-sm mt-1">
                        Coupon applied successfully!
                      </div>
                    )}
                  </Form.Item>
                </Form>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout">
                <Button 
                  type="primary" 
                  size="large" 
                  block
                  className="mb-4 bg-blue-600 hover:bg-blue-700"
                >
                  Proceed to Checkout <RightOutlined />
                </Button>
              </Link>

              {/* Trust Elements */}
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center mb-2">
                  <LockOutlined className="text-gray-600 mr-2" />
                  <Text className="text-gray-600 text-sm">Secure checkout</Text>
                </div>
                <div className="flex items-center">
                  <ShieldOutlined className="text-gray-600 mr-2" />
                  <Text className="text-gray-600 text-sm">100% Money-back guarantee</Text>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-4">
                <Text className="text-sm text-gray-500 block mb-2">We Accept:</Text>
                <div className="flex space-x-2">
                  <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
                  <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
                  <img src="https://via.placeholder.com/40x25" alt="American Express" className="h-6" />
                  <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      )}

      {/* Frequently Bought Together */}
      {cartItems.length > 0 && (
        <div className="mt-12">
          <Title level={3} className="mb-6">Frequently Bought Together</Title>
          <Row gutter={[16, 16]}>
            {[1, 2, 3, 4].map(id => (
              <Col key={id} xs={12} sm={6} md={6}>
                <Link to={`/products/${id + 10}`}>
                  <Card
                    hoverable
                    cover={<img alt={`Suggestion ${id}`} src="https://via.placeholder.com/200x200" />}
                    className="h-full"
                  >
                    <Card.Meta 
                      title={`Related Card ${id}`} 
                      description={
                        <div className="mt-2">
                          <div className="text-lg font-bold text-blue-600">
                            $9.99
                          </div>
                          <Button type="primary" size="small" className="mt-2 bg-blue-600 hover:bg-blue-700">
                            Add to Cart
                          </Button>
                        </div>
                      } 
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default CartPage;
