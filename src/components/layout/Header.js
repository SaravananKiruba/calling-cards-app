import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Dropdown, Badge, Button, Avatar } from 'antd';
import { 
  ShoppingCartOutlined, 
  UserOutlined, 
  MenuOutlined, 
  SearchOutlined, 
  GlobalOutlined,
  DownOutlined
} from '@ant-design/icons';

const { Search } = Input;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Language options for dropdown
  const languageItems = [
    { key: 'en', label: 'English' },
    { key: 'es', label: 'Español' },
    { key: 'fr', label: 'Français' }
  ];

  // User menu items
  const userItems = [
    { key: 'profile', label: 'Profile' },
    { key: 'orders', label: 'My Orders' },
    { key: 'logout', label: 'Logout' }
  ];

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      {/* Top navigation bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <div className="flex items-center mb-3 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              CallingCards
            </Link>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-1/3 mb-3 md:mb-0">
            <Search
              placeholder="Search products..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              className="w-full"
            />
          </div>

          {/* Icons and navigation for desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language selector */}
            <Dropdown
              menu={{ items: languageItems }}
              placement="bottomRight"
              arrow
            >
              <Button>
                <div className="flex items-center">
                  <GlobalOutlined className="mr-1" />
                  <span>EN</span>
                  <DownOutlined className="ml-1 text-xs" />
                </div>
              </Button>
            </Dropdown>

            {/* User dropdown */}
            <Dropdown
              menu={{ items: userItems }}
              placement="bottomRight"
              arrow
            >
              <div className="cursor-pointer flex items-center">
                <Avatar icon={<UserOutlined />} />
                <DownOutlined className="ml-1 text-xs" />
              </div>
            </Dropdown>

            {/* Cart icon */}
            <Link to="/cart" className="relative">
              <Badge count={3} size="small">
                <ShoppingCartOutlined className="text-2xl" />
              </Badge>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              size="large"
            />
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          {/* Desktop navigation links */}
          <ul className="hidden md:flex py-3">
            <li className="mr-6 hover:text-blue-200">
              <Link to="/">Home</Link>
            </li>
            <li className="mr-6 hover:text-blue-200">
              <Link to="/products">All Products</Link>
            </li>
            <li className="mr-6 hover:text-blue-200">
              <Link to="/products?category=international">International Cards</Link>
            </li>
            <li className="mr-6 hover:text-blue-200">
              <Link to="/products?category=domestic">Domestic Cards</Link>
            </li>
            <li className="hover:text-blue-200">
              <Link to="/products?category=deals">Special Deals</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <ul className="flex flex-col space-y-3 pb-3">
              <li>
                <Link to="/" className="block py-2 hover:text-blue-600">Home</Link>
              </li>
              <li>
                <Link to="/products" className="block py-2 hover:text-blue-600">All Products</Link>
              </li>
              <li>
                <Link to="/products?category=international" className="block py-2 hover:text-blue-600">International Cards</Link>
              </li>
              <li>
                <Link to="/products?category=domestic" className="block py-2 hover:text-blue-600">Domestic Cards</Link>
              </li>
              <li>
                <Link to="/products?category=deals" className="block py-2 hover:text-blue-600">Special Deals</Link>
              </li>
              <li className="pt-2 border-t border-gray-200">
                <Dropdown
                  menu={{ items: languageItems }}
                  placement="bottomLeft"
                >
                  <Button className="flex items-center">
                    <GlobalOutlined className="mr-1" />
                    <span>EN</span>
                    <DownOutlined className="ml-1 text-xs" />
                  </Button>
                </Dropdown>
              </li>
              <li>
                <Dropdown
                  menu={{ items: userItems }}
                  placement="bottomLeft"
                >
                  <Button className="flex items-center">
                    <UserOutlined className="mr-1" />
                    <span>My Account</span>
                    <DownOutlined className="ml-1 text-xs" />
                  </Button>
                </Dropdown>
              </li>
              <li>
                <Link to="/cart" className="flex items-center py-2 hover:text-blue-600">
                  <ShoppingCartOutlined className="mr-1" />
                  <span>Cart (3)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
