import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Space, Input, Button, Divider } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined  
} from '@ant-design/icons';

const { Panel } = Collapse;

const Footer = () => {
  // Footer sections for desktop view
  const footerSections = [
    {
      title: 'Help & Information',
      links: [
        { title: 'FAQs', url: '/faqs' },
        { title: 'Track Your Order', url: '/track-order' },
        { title: 'Shipping & Delivery', url: '/shipping' },
        { title: 'Returns Policy', url: '/returns' },
        { title: 'How to Use Cards', url: '/how-to-use' },
      ]
    },
    {
      title: 'About Us',
      links: [
        { title: 'Our Story', url: '/about' },
        { title: 'Careers', url: '/careers' },
        { title: 'Press', url: '/press' },
        { title: 'Corporate Responsibility', url: '/responsibility' },
        { title: 'Become a Reseller', url: '/reseller' },
      ]
    },
    {
      title: 'Customer Services',
      links: [
        { title: 'Contact Us', url: '/contact' },
        { title: 'Customer Support', url: '/support' },
        { title: 'Terms & Conditions', url: '/terms' },
        { title: 'Privacy Policy', url: '/privacy' },
        { title: 'Gift Cards', url: '/gift-cards' },
      ]
    },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300">
      {/* Newsletter subscription */}
      <div className="bg-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white">Sign up for our newsletter</h3>
              <p className="text-gray-400">Get updates about new deals and special offers</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row">
              <Input 
                placeholder="Your email address" 
                className="mr-0 sm:mr-2 mb-2 sm:mb-0" 
                prefix={<MailOutlined className="site-form-item-icon" />} 
              />
              <Button type="primary" className="bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-10">
        {/* Mobile view - collapsible panels */}
        <div className="md:hidden">
          <Collapse ghost expandIconPosition="end">
            {footerSections.map((section, index) => (
              <Panel header={<span className="text-white font-medium">{section.title}</span>} key={index}>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to={link.url} className="text-gray-400 hover:text-white">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Panel>
            ))}
          </Collapse>
        </div>

        {/* Desktop view - Grid layout */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">CallingCards</h3>
            <p className="text-gray-400 mb-4">
              Providing reliable and affordable calling card solutions since 2001. Connect with loved ones worldwide at the best rates.
            </p>
            <div className="flex items-center text-gray-400 mb-2">
              <PhoneOutlined className="mr-2" />
              <span>1-800-CALL-NOW</span>
            </div>
            <div className="flex items-center text-gray-400 mb-2">
              <MailOutlined className="mr-2" />
              <span>support@callingcards.com</span>
            </div>
            <div className="flex items-center text-gray-400">
              <EnvironmentOutlined className="mr-2" />
              <span>123 Communication St, Telecom City, TC 12345</span>
            </div>
          </div>

          {/* Footer link sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-bold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.url} className="text-gray-400 hover:text-white">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider className="border-gray-700 mt-8 mb-6" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} CallingCards.com. All rights reserved.
            </p>
          </div>
          <div>
            <Space size="large">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white text-xl">
                <FacebookOutlined />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white text-xl">
                <TwitterOutlined />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white text-xl">
                <InstagramOutlined />
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-white text-xl">
                <YoutubeOutlined />
              </a>
            </Space>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 text-sm mb-2 md:mb-0">
              We accept all major payment methods
            </p>
            <div className="flex space-x-3">
              <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="American Express" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="Apple Pay" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
