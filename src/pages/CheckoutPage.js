import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Steps, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Input, 
  Select, 
  Checkbox, 
  Radio, 
  Divider, 
  Typography, 
  Space,
  Collapse,
  Alert,
  Tag,
  Breadcrumb
} from 'antd';
import { 
  UserOutlined, 
  HomeOutlined, 
  CreditCardOutlined, 
  CheckCircleOutlined,
  LockOutlined,
  ShieldOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;
const { Step } = Steps;

const CheckoutPage = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [shippingMethod, setShippingMethod] = useState('email');
  
  // Sample cart items
  const cartItems = [
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
  ];

  // Calculate order totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const taxes = subtotal * 0.05; // 5% tax
  const discount = 0;
  const total = subtotal + taxes - discount;

  // Handle form submission for each step
  const handleNext = () => {
    form
      .validateFields()
      .then(() => {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log('Form validation failed:', error);
      });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Order placed with values:', values);
        setOrderComplete(true);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log('Form validation failed:', error);
      });
  };

  // Render Order Summary
  const renderOrderSummary = () => (
    <Card className="mb-6">
      <Title level={5} className="mb-4">Order Summary</Title>
      {cartItems.map(item => (
        <div key={item.id} className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src={item.image} alt={item.title} className="w-10 h-10 mr-3 object-cover rounded" />
            <div>
              <Text>{item.title}</Text>
              <div className="text-gray-500 text-sm">Qty: {item.quantity}</div>
            </div>
          </div>
          <Text className="font-medium">${(item.price * item.quantity).toFixed(2)}</Text>
        </div>
      ))}
      
      <Divider className="my-3" />
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Text>Subtotal</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <Text>Discount</Text>
            <Text>-${discount.toFixed(2)}</Text>
          </div>
        )}
        <div className="flex justify-between">
          <Text>Taxes</Text>
          <Text>${taxes.toFixed(2)}</Text>
        </div>
        <Divider className="my-3" />
        <div className="flex justify-between">
          <Text strong>Total</Text>
          <Text strong className="text-lg">${total.toFixed(2)}</Text>
        </div>
      </div>
    </Card>
  );

  // Step 1: Customer Information
  const renderCustomerInfoStep = () => (
    <Card>
      <Title level={4} className="mb-6">Customer Information</Title>
      <Form
        form={form}
        layout="vertical"
        name="customer_info"
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          phone: ''
        }}
      >
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter your email address' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email address" />
        </Form.Item>
        
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input placeholder="First name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input placeholder="Last name" />
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input placeholder="Phone number" />
        </Form.Item>
        
        <Form.Item name="createAccount" valuePropName="checked">
          <Checkbox>Create an account for faster checkout next time</Checkbox>
        </Form.Item>
        
        <Form.Item name="newsletter" valuePropName="checked">
          <Checkbox>Receive special offers and updates via email</Checkbox>
        </Form.Item>
        
        <div className="flex justify-between">
          <Link to="/cart">
            <Button size="large">
              Return to Cart
            </Button>
          </Link>
          <Button type="primary" size="large" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
            Continue
          </Button>
        </div>
      </Form>
    </Card>
  );

  // Step 2: Billing & Delivery
  const renderBillingStep = () => (
    <Card>
      <Title level={4} className="mb-6">Billing & Delivery</Title>
      <Form
        form={form}
        layout="vertical"
        name="billing_delivery"
        initialValues={{
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'US',
          shippingMethod: 'email'
        }}
      >
        <Title level={5} className="mb-3">Billing Address</Title>
        <Form.Item
          name="address"
          label="Street Address"
          rules={[{ required: true, message: 'Please enter your street address' }]}
        >
          <Input prefix={<HomeOutlined />} placeholder="Street address" />
        </Form.Item>
        
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: 'Please enter your city' }]}
            >
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="state"
              label="State/Province"
              rules={[{ required: true, message: 'Please enter your state/province' }]}
            >
              <Input placeholder="State/Province" />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="postalCode"
              label="Postal Code"
              rules={[{ required: true, message: 'Please enter your postal code' }]}
            >
              <Input placeholder="Postal Code" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true, message: 'Please select your country' }]}
            >
              <Select placeholder="Select country">
                <Option value="US">United States</Option>
                <Option value="CA">Canada</Option>
                <Option value="MX">Mexico</Option>
                <Option value="UK">United Kingdom</Option>
                <Option value="AU">Australia</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        
        <Divider />
        
        <Title level={5} className="mb-3">Delivery Method</Title>
        <Form.Item
          name="shippingMethod"
          rules={[{ required: true, message: 'Please select a delivery method' }]}
        >
          <Radio.Group onChange={(e) => setShippingMethod(e.target.value)} value={shippingMethod}>
            <Space direction="vertical">
              <Radio value="email" className="p-3 border rounded-md w-full">
                <div>
                  <Text strong>Email Delivery</Text> <Tag color="green">FREE</Tag>
                  <div className="text-sm text-gray-500">
                    Receive your PIN and instructions via email immediately after purchase
                  </div>
                </div>
              </Radio>
              <Radio value="sms" className="p-3 border rounded-md w-full">
                <div>
                  <Text strong>SMS Delivery</Text> <Tag color="blue">FREE</Tag>
                  <div className="text-sm text-gray-500">
                    Receive your PIN and instructions via text message
                  </div>
                </div>
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <div className="flex justify-between mt-6">
          <Button size="large" onClick={handlePrevious}>
            Back
          </Button>
          <Button type="primary" size="large" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
            Continue
          </Button>
        </div>
      </Form>
    </Card>
  );

  // Step 3: Payment
  const renderPaymentStep = () => (
    <Card>
      <Title level={4} className="mb-6">Payment Method</Title>
      <Form
        form={form}
        layout="vertical"
        name="payment"
        initialValues={{
          paymentMethod: 'creditCard'
        }}
      >
        <Form.Item
          name="paymentMethod"
          rules={[{ required: true, message: 'Please select a payment method' }]}
        >
          <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
            <Space direction="vertical" className="w-full">
              <Radio value="creditCard" className="p-3 border rounded-md w-full">
                <div className="flex items-center">
                  <CreditCardOutlined className="text-lg mr-2" />
                  <Text strong>Credit/Debit Card</Text>
                  <div className="ml-auto flex space-x-2">
                    <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
                    <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
                    <img src="https://via.placeholder.com/40x25" alt="Amex" className="h-6" />
                  </div>
                </div>
              </Radio>
              <Radio value="paypal" className="p-3 border rounded-md w-full">
                <div className="flex items-center">
                  <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6 mr-2" />
                  <Text strong>PayPal</Text>
                </div>
              </Radio>
              <Radio value="apple" className="p-3 border rounded-md w-full">
                <div className="flex items-center">
                  <img src="https://via.placeholder.com/40x25" alt="Apple Pay" className="h-6 mr-2" />
                  <Text strong>Apple Pay</Text>
                </div>
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        {paymentMethod === 'creditCard' && (
          <div className="bg-gray-50 p-4 rounded-md">
            <Form.Item
              name="cardholderName"
              label="Cardholder Name"
              rules={[{ required: true, message: 'Please enter the cardholder name' }]}
            >
              <Input placeholder="Name on card" />
            </Form.Item>
            
            <Form.Item
              name="cardNumber"
              label="Card Number"
              rules={[{ required: true, message: 'Please enter your card number' }]}
            >
              <Input placeholder="•••• •••• •••• ••••" />
            </Form.Item>
            
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="expiryDate"
                  label="Expiry Date"
                  rules={[{ required: true, message: 'Please enter the expiry date' }]}
                >
                  <Input placeholder="MM/YY" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="cvv"
                  label="CVV"
                  rules={[{ required: true, message: 'Please enter the CVV' }]}
                >
                  <Input placeholder="•••" />
                </Form.Item>
              </Col>
            </Row>
            
            <div className="flex items-center text-green-700 text-sm">
              <LockOutlined className="mr-1" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        )}

        <div className="mt-6">
          <Alert
            message="Order Confirmation"
            description="By clicking 'Place Order', you confirm that you have read and agree to our Terms of Service and Privacy Policy."
            type="info"
            showIcon
            className="mb-4"
          />
          
          <div className="flex justify-between">
            <Button size="large" onClick={handlePrevious}>
              Back
            </Button>
            <Button 
              type="primary" 
              size="large" 
              onClick={handlePlaceOrder}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Place Order
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );

  // Order Completion
  const renderOrderComplete = () => (
    <Card className="text-center py-10">
      <CheckCircleOutlined className="text-green-500 text-6xl mb-4" />
      <Title level={3} className="mb-2">Thank You for Your Order!</Title>
      <Title level={5} className="mb-6 font-normal text-gray-600">Order #12345</Title>
      
      <Paragraph className="mb-6 max-w-md mx-auto">
        Your order has been successfully placed. You will receive a confirmation email shortly with your PIN and instructions.
      </Paragraph>
      
      <Alert
        message="Important Information"
        description={
          <div>
            <p>Your PIN will be delivered to your email at: <strong>customer@example.com</strong></p>
            <p className="mt-2">If you don't receive your PIN within 5 minutes, please check your spam folder or contact our customer support.</p>
          </div>
        }
        type="info"
        showIcon
        className="mb-6 text-left max-w-lg mx-auto"
      />
      
      <div className="flex justify-center space-x-4 mb-6">
        <Button size="large" type="primary" className="bg-blue-600 hover:bg-blue-700">
          View Order Details
        </Button>
        <Link to="/">
          <Button size="large">
            Continue Shopping
          </Button>
        </Link>
      </div>
      
      <Divider className="my-8" />
      
      <Title level={4} className="mb-4">You Might Also Like</Title>
      <Row gutter={[16, 16]} className="max-w-4xl mx-auto">
        {[1, 2, 3, 4].map(id => (
          <Col key={id} xs={12} sm={6}>
            <Link to={`/products/${id + 10}`}>
              <Card
                hoverable
                cover={<img alt={`Suggestion ${id}`} src="https://via.placeholder.com/200x200" />}
                className="h-full"
              >
                <Card.Meta 
                  title={`Related Card ${id}`} 
                  description={
                    <div className="text-lg font-bold text-blue-600 mt-2">
                      $9.99
                    </div>
                  } 
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Card>
  );

  // Render the current step
  const renderCurrentStep = () => {
    if (orderComplete) {
      return renderOrderComplete();
    }

    switch (currentStep) {
      case 0:
        return renderCustomerInfoStep();
      case 1:
        return renderBillingStep();
      case 2:
        return renderPaymentStep();
      default:
        return renderCustomerInfoStep();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/cart">Cart</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Checkout</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2} className="mb-8">Checkout</Title>

      {!orderComplete && (
        <div className="mb-8">
          <Steps
            current={currentStep}
            responsive
            items={[
              {
                title: 'Information',
                icon: <UserOutlined />,
              },
              {
                title: 'Billing & Delivery',
                icon: <HomeOutlined />,
              },
              {
                title: 'Payment',
                icon: <CreditCardOutlined />,
              },
            ]}
          />
        </div>
      )}

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          {renderCurrentStep()}
        </Col>

        <Col xs={24} lg={8}>
          {!orderComplete && (
            <>
              {renderOrderSummary()}
              
              <Card>
                <div className="flex items-center mb-3">
                  <LockOutlined className="text-blue-600 text-lg mr-2" />
                  <Text strong>Secure Checkout</Text>
                </div>
                <Paragraph className="text-gray-600 text-sm mb-3">
                  Your personal and payment information is securely transmitted using 256-bit encryption.
                </Paragraph>
                
                <div className="flex items-center mb-3">
                  <ShieldOutlined className="text-blue-600 text-lg mr-2" />
                  <Text strong>100% Satisfaction Guarantee</Text>
                </div>
                <Paragraph className="text-gray-600 text-sm">
                  If you're not satisfied with your purchase, contact us within 30 days for a full refund.
                </Paragraph>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutPage;
