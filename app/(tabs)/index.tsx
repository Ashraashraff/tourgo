import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions
} from 'react-native';
import { 
  User, 
  Bell, 
  Car, 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  Home, 
  ArrowLeft, 
  Star, 
  Shield, 
  Clock, 
  Calendar, 
  Filter 
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// ----------------- TYPES -----------------
interface TabBarMenuProps {
  activeTab: 'home' | 'search' | 'cars' | 'profile';
  setActiveTab: (tab: 'home' | 'search' | 'cars' | 'profile') => void;
}

interface LoginScreenProps {
  onLogin: () => void;
}

interface HomeScreenProps {
  onViewCars: (category?: string) => void;
}
    
interface Car {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  features: string[];
  owner: {
    name: string;
    rating: number;
    verified: boolean;
  };
}

interface CarListingScreenProps {
  onCarSelect: (car: Car) => void;
  selectedCategory: string;
}

interface CarDetailScreenProps {
  car: Car;
  onBack: () => void;
}

// ----------------- CAR DATA -----------------
const allCars: Car[] = [
  { 
    id: 1, 
    name: 'Mountain Bike Pro', 
    price: 'LKR 1,500 / DAY', 
    image: '🚴', 
    category: 'Bicycle',
    rating: 4.8,
    reviews: 124,
    features: ['21 Speed', 'Mountain', 'Helmet Included'],
    owner: {
      name: 'John Sports',
      rating: 4.9,
      verified: true
    }
  },
  { 
    id: 2, 
    name: 'City Bicycle', 
    price: 'LKR 1,200 / DAY', 
    image: '🚲', 
    category: 'Bicycle',
    rating: 4.5,
    reviews: 89,
    features: ['7 Speed', 'City', 'Basket Included'],
    owner: {
      name: 'City Rides',
      rating: 4.7,
      verified: true
    }
  },
  { 
    id: 3, 
    name: 'Honda CB 150', 
    price: 'LKR 3,500 / DAY', 
    image: '🏍️', 
    category: 'Moto',
    rating: 4.9,
    reviews: 203,
    features: ['150cc', 'Sports', '2 Helmets'],
    owner: {
      name: 'Bike Masters',
      rating: 4.9,
      verified: true
    }
  },
  { 
    id: 4, 
    name: 'Yamaha FZ-S', 
    price: 'LKR 4,200 / DAY', 
    image: '🏍️', 
    category: 'Moto',
    rating: 4.7,
    reviews: 156,
    features: ['153cc', 'Street', '2 Helmets'],
    owner: {
      name: 'Yamaha Pro',
      rating: 4.8,
      verified: true
    }
  },
  { 
    id: 5, 
    name: 'Classic TukTuk', 
    price: 'LKR 5,500 / DAY', 
    image: '🛺', 
    category: 'TukTuk',
    rating: 4.6,
    reviews: 278,
    features: ['3 Seater', 'Classic', 'Tour Guide'],
    owner: {
      name: 'TukTuk King',
      rating: 4.8,
      verified: true
    }
  },
  { 
    id: 6, 
    name: 'Modern TukTuk', 
    price: 'LKR 6,000 / DAY', 
    image: '🛺', 
    category: 'TukTuk',
    rating: 4.8,
    reviews: 167,
    features: ['4 Seater', 'Modern', 'AC Available'],
    owner: {
      name: 'Modern Rides',
      rating: 4.9,
      verified: true
    }
  },
  { 
    id: 7, 
    name: 'Toyota KDH Van', 
    price: 'LKR 12,500 / DAY', 
    image: '🚐', 
    category: 'Van',
    rating: 4.7,
    reviews: 189,
    features: ['8 Seater', 'AC', 'Spacious'],
    owner: {
      name: 'Van Services',
      rating: 4.8,
      verified: true
    }
  },
  { 
    id: 8, 
    name: 'Nissan Caravan', 
    price: 'LKR 11,000 / DAY', 
    image: '🚐', 
    category: 'Van',
    rating: 4.5,
    reviews: 134,
    features: ['7 Seater', 'AC', 'Comfort'],
    owner: {
      name: 'Nissan Rentals',
      rating: 4.7,
      verified: true
    }
  },
  { 
    id: 9, 
    name: 'Toyota Premio 2012', 
    price: 'LKR 7,900 / DAY', 
    image: '🚗', 
    category: 'Car/Sedan',
    rating: 4.8,
    reviews: 245,
    features: ['5 Seater', 'AC', 'Fuel Efficient'],
    owner: {
      name: 'Premio Rentals',
      rating: 4.9,
      verified: true
    }
  },
  { 
    id: 10, 
    name: 'Toyota Axio WXB 2017', 
    price: 'LKR 7,800 / DAY', 
    image: '🚙', 
    category: 'Car/Sedan',
    rating: 4.9,
    reviews: 312,
    features: ['5 Seater', 'AC', 'Hybrid'],
    owner: {
      name: 'Axio Specialists',
      rating: 4.9,
      verified: true
    }
  },
  { 
    id: 11, 
    name: 'Honda Civic 2015', 
    price: 'LKR 8,500 / DAY', 
    image: '🚗', 
    category: 'Car/Sedan',
    rating: 4.7,
    reviews: 198,
    features: ['5 Seater', 'AC', 'Sporty'],
    owner: {
      name: 'Civic Rentals',
      rating: 4.8,
      verified: true
    }
  },
  { 
    id: 12, 
    name: 'Toyota Prado', 
    price: 'LKR 15,000 / DAY', 
    image: '🚙', 
    category: 'Suv',
    rating: 4.9,
    reviews: 167,
    features: ['7 Seater', '4WD', 'Luxury'],
    owner: {
      name: 'SUV Experts',
      rating: 4.9,
      verified: true
    }
  },
  { 
    id: 13, 
    name: 'Mitsubishi Montero', 
    price: 'LKR 14,500 / DAY', 
    image: '🚙', 
    category: 'Suv',
    rating: 4.8,
    reviews: 145,
    features: ['7 Seater', '4WD', 'Spacious'],
    owner: {
      name: 'Montero Rentals',
      rating: 4.8,
      verified: true
    }
  },
];

// ----------------- STYLES -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0B66FF',
  },
  splashContainer: {
    flex: 1,
    backgroundColor: '#0B66FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashTitle: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  splashSubtitle: {
    color: '#fff',
    letterSpacing: 2,
    fontSize: 14,
    marginBottom: 4,
  },
  splashText: {
    color: '#dbeafe',
    fontSize: 12,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#0B66FF',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoTitle: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  logoSubtitle: {
    color: '#fff',
    fontSize: 12,
    letterSpacing: 2,
    opacity: 0.9,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingLeft: 40,
    fontSize: 14,
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  primaryButtonText: {
    color: '#0B66FF',
    fontWeight: '600',
    fontSize: 14,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  socialButtonText: {
    color: '#374151',
    fontWeight: '500',
    fontSize: 12,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabIconContainer: {
    padding: 8,
    borderRadius: 20,
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    marginTop: 2,
  },
  header: {
    backgroundColor: '#0B66FF',
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    color: '#374151',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  categoryItem: {
    width: (width - 64) / 3,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  carImage: {
    width: 60,
    height: 60,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priceText: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: 14,
  },
  featureTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 4,
    marginBottom: 4,
  },
  featureText: {
    color: '#374151',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  dateTimeItem: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterButton: {
    width: 48,
    backgroundColor: '#0B66FF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#0B66FF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
});

// ----------------- COMPONENTS -----------------
const TabBarMenu: React.FC<TabBarMenuProps> = ({ activeTab, setActiveTab }) => {
  const navigationItems = [
    { icon: Home, label: "Home", key: "home" },
    { icon: Search, label: "Search", key: "search" },
    { icon: Car, label: "Cars", key: "cars" },
    { icon: User, label: "Profile", key: "profile" },
  ];

  return (
    <View style={styles.tabBar}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={styles.tabItem}
            onPress={() => setActiveTab(item.key as any)}
          >
            <View style={[styles.tabIconContainer, isActive && { backgroundColor: '#dbeafe' }]}>
              <Icon size={22} color={isActive ? "#0B66FF" : "#9AA0A6"} />
            </View>
            <Text style={[styles.tabText, { color: isActive ? "#0B66FF" : "#9AA0A6", fontWeight: isActive ? '600' : '400' }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const SplashScreen = () => (
  <View style={styles.splashContainer}>
    <StatusBar backgroundColor="#0B66FF" barStyle="light-content" />
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.splashTitle}>TourGo</Text>
      <Text style={styles.splashSubtitle}>FIND THE PERFECT RIDE IN SRI LANKA</Text>
      <Text style={styles.splashText}>Find the perfect ride. Anytime. Anywhere.</Text>
    </View>
  </View>
);

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0B66FF" barStyle="light-content" />
      <ScrollView 
        style={styles.loginContainer}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <View style={styles.logoContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={styles.logoTitle}>TourGo</Text>
            <Text style={{ fontSize: 24, marginLeft: 8 }}>✈️</Text>
          </View>
          <Text style={styles.logoSubtitle}>FIND THE PERFECT RIDE IN SRI LANKA</Text>
        </View>

        <View style={{ gap: 16 }}>
          {isSignUp && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <View>
                <User size={18} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  placeholder="Enter your Name"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                />
              </View>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View>
              <Mail size={18} color="#9ca3af" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter your Email"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View>
              <View style={styles.inputIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </View>
              <TextInput
                placeholder="Enter your Password"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
              />
            </View>
          </View>

          {!isSignUp && (
            <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
              <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          {isSignUp && (
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              onPress={() => setAgreeTerms(!agreeTerms)}
            >
              <View style={{ 
                width: 16, 
                height: 16, 
                borderRadius: 4, 
                borderWidth: 1, 
                borderColor: '#fff',
                backgroundColor: agreeTerms ? '#fff' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {agreeTerms && <Text style={{ color: '#0B66FF', fontSize: 12 }}>✓</Text>}
              </View>
              <Text style={{ color: '#fff', fontSize: 12 }}>I agree to the terms & policy</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.primaryButton} onPress={onLogin}>
            <Text style={styles.primaryButtonText}>{isSignUp ? 'Sign up' : 'Sign in'}</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
            <Text style={{ color: '#fff', fontSize: 12, paddingHorizontal: 12 }}>Or continue with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
          </View>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
              <Text style={{ color: '#fff', fontSize: 12 }}>
                {isSignUp ? (
                  <>Have an account? <Text style={{ fontWeight: '600', textDecorationLine: 'underline' }}>Sign In</Text></>
                ) : (
                  <>Don't have an account? <Text style={{ fontWeight: '600', textDecorationLine: 'underline' }}>Sign Up</Text></>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ onViewCars }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = [
    { name: 'Bicycle', icon: '🚴', color: '#E8F5E8' },
    { name: 'Moto', icon: '🏍️', color: '#FFE8E8' },
    { name: 'TukTuk', icon: '🛺', color: '#E8F0FF' },
    { name: 'Van', icon: '🚐', color: '#FFF0E8' },
    { name: 'Car/Sedan', icon: '🚗', color: '#F0E8FF' },
    { name: 'Suv', icon: '🚙', color: '#E8FFF0' }
  ];

  const featuredCars = allCars.slice(0, 3);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0B66FF" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <View>
            <Text style={styles.headerTitle}>Find Your Perfect</Text>
            <Text style={styles.headerTitle}>Ride in Sri Lanka</Text>
          </View>
          <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={18} color="#9AA0A6" />
          <TextInput
            placeholder="Search for vehicles, brands..."
            placeholderTextColor="#9AA0A6"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Date & Filter Section */}
        <View style={{ padding: 16, marginTop: -8 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ flex: 1 }}>
                <View style={styles.dateTimeItem}>
                  <Calendar size={16} color="#0B66FF" />
                  <View>
                    <Text style={{ color: '#6b7280', fontSize: 12 }}>Pickup Date</Text>
                    <Text style={{ color: '#111827', fontWeight: '600', fontSize: 14 }}>24 Nov 2025</Text>
                  </View>
                </View>
              </View>
              
              <View style={{ flex: 1 }}>
                <View style={styles.dateTimeItem}>
                  <Clock size={16} color="#0B66FF" />
                  <View>
                    <Text style={{ color: '#6b7280', fontSize: 12 }}>Time</Text>
                    <Text style={{ color: '#111827', fontWeight: '600', fontSize: 14 }}>2:06 PM</Text>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity style={styles.filterButton}>
                <Filter size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Location Card */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <View style={styles.locationCard}>
            <View style={styles.locationIcon}>
              <MapPin size={16} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ fontWeight: '600', fontSize: 14, color: '#111827' }}>Current Location</Text>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Colombo 03, Sri Lanka</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#dbeafe', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
              <Text style={{ color: '#0B66FF', fontWeight: '600', fontSize: 12 }}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={{ marginBottom: 24 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={{ color: '#0B66FF', fontWeight: '600', fontSize: 12 }}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.name}
                style={styles.categoryItem}
                onPress={() => onViewCars(category.name)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Text style={{ fontSize: 20 }}>{category.icon}</Text>
                </View>
                <Text style={{ fontWeight: '600', color: '#111827', fontSize: 12 }}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Vehicles */}
        <View style={{ marginBottom: 24 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Vehicles</Text>
            <TouchableOpacity>
              <Text style={{ color: '#0B66FF', fontWeight: '600', fontSize: 12 }}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 12, paddingHorizontal: 16 }}>
            {featuredCars.map((car) => (
              <TouchableOpacity key={car.id} style={styles.card} onPress={() => onViewCars(car.category)}>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={styles.carImage}>
                    <Text style={{ fontSize: 24 }}>{car.image}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: '#111827', fontSize: 14 }}>{car.name}</Text>
                    <View style={styles.ratingContainer}>
                      <Star size={14} color="#FFB800" fill="#FFB800" />
                      <Text style={{ color: '#374151', fontWeight: '600', fontSize: 12 }}>{car.rating}</Text>
                      <Text style={{ color: '#6b7280', fontSize: 12 }}>({car.reviews})</Text>
                    </View>
                    <Text style={styles.priceText}>{car.price}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={{ 
                    backgroundColor: '#0B66FF', 
                    paddingVertical: 8,       
                    borderRadius: 8, 
                    alignItems: 'center', 
                    marginTop: 8 
                  }}
                  onPress={() => onViewCars(car.category)}
                >
                  <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>View Details</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const CarListingScreen: React.FC<CarListingScreenProps> = ({ onCarSelect, selectedCategory }) => {
  const filteredCars = selectedCategory === 'All' 
    ? allCars 
    : allCars.filter(car => car.category === selectedCategory);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0B66FF" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity style={{ width: 32, height: 32, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
              <ArrowLeft size={18} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{selectedCategory} Vehicles</Text>
          </View>
          <TouchableOpacity style={{ width: 32, height: 32, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date & Filter Section */}
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.dateTimeItem}>
              <Calendar size={16} color="#0B66FF" />
              <View>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Pickup Date</Text>
                <Text style={{ color: '#111827', fontWeight: '600', fontSize: 14 }}>24 Nov 2025</Text>
              </View>
            </View>
          </View>
          
          <View style={{ flex: 1 }}>
            <View style={styles.dateTimeItem}>
              <Clock size={16} color="#0B66FF" />
              <View>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Time</Text>
                <Text style={{ color: '#111827', fontWeight: '600', fontSize: 14 }}>2:06 PM</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Car List */}
      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={{ width: 64, height: 64, backgroundColor: '#f3f4f6', borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Car size={24} color="#9AA0A6" />
            </View>
            <Text style={{ color: '#6b7280', fontSize: 14, textAlign: 'center' }}>No vehicles found in this category</Text>
          </View>
        }
        renderItem={({ item: car }) => (
          <TouchableOpacity style={styles.card} onPress={() => onCarSelect(car)}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={[styles.carImage, { width: 80, height: 80 }]}>
                <Text style={{ fontSize: 32 }}>{car.image}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'bold', color: '#111827', fontSize: 14 }}>{car.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#FFB800" fill="#FFB800" />
                    <Text style={{ color: '#374151', fontWeight: '600', fontSize: 12 }}>{car.rating}</Text>
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  {car.owner.verified && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Shield size={12} color="#0B66FF" />
                      <Text style={{ color: '#0B66FF', fontSize: 12, fontWeight: '500' }}>Verified</Text>
                    </View>
                  )}
                  <Text style={{ color: '#6b7280', fontSize: 12 }}>by {car.owner.name}</Text>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                  {car.features.slice(0, 2).map((feature, index) => (
                    <View key={index} style={styles.featureTag}>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <Text style={styles.priceText}>{car.price}</Text>
                  <TouchableOpacity 
                    style={{ backgroundColor: '#0B66FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 }}
                    onPress={() => onCarSelect(car)}
                  >
                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const CarDetailScreen: React.FC<CarDetailScreenProps> = ({ car, onBack }) => {
  const [selectedOption, setSelectedOption] = useState<'withDriver' | 'withoutDriver'>('withoutDriver');
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0B66FF" barStyle="light-content" />
      
      {/* Header */}
      <View style={[styles.header, { flexDirection: 'row', alignItems: 'center', gap: 12 }]}>
        <TouchableOpacity onPress={onBack} style={{ width: 32, height: 32, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
          <ArrowLeft size={18} color="#fff" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { flex: 1 }]}>Vehicle Details</Text>
        <TouchableOpacity style={{ width: 32, height: 32, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
          <Bell size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Car Image */}
        <View style={{ width: '100%', height: 192, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 64 }}>{car.image}</Text>
        </View>

        {/* Date & Time Section */}
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ flex: 1 }}>
              <View style={styles.dateTimeItem}>
                <Calendar size={16} color="#0B66FF" />
                <View>
                  <Text style={{ color: '#6b7280', fontSize: 12 }}>Pickup Date</Text>
                  <Text style={{ color: '#111827', fontWeight: '600', fontSize: 14 }}>24 Nov 2025</Text>
                </View>
              </View>
            </View>
            
            <View style={{ flex: 1 }}>
              <View style={styles.dateTimeItem}>
                <Clock size={16} color="#0B66FF" />
                <View>
                  <Text style={{ color: '#6b7280', fontSize: 12 }}>Time</Text>
                  <Text style={{ color: '#111827', fontWeight: '600', fontSize: 14 }}>2:06 PM</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Car Info */}
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111827' }}>{car.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#FFB800" fill="#FFB800" />
                  <Text style={{ color: '#374151', fontWeight: '600', fontSize: 14 }}>{car.rating}</Text>
                </View>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>({car.reviews})</Text>
                {car.owner.verified && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#dbeafe', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                    <Shield size={12} color="#0B66FF" />
                    <Text style={{ color: '#0B66FF', fontSize: 12, fontWeight: '500' }}>Verified</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#22c55e' }}>{car.price}</Text>
              <Text style={{ color: '#6b7280', fontSize: 12 }}>per day</Text>
            </View>
          </View>

          {/* Owner Info */}
          <View style={{ backgroundColor: '#f9fafb', borderRadius: 12, padding: 12, marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={styles.locationIcon}>
                <User size={16} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600', color: '#111827', fontSize: 14 }}>{car.owner.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Star size={12} color="#FFB800" fill="#FFB800" />
                  <Text style={{ color: '#6b7280', fontSize: 12 }}>{car.owner.rating} Owner Rating</Text>
                </View>
              </View>
              <TouchableOpacity style={{ backgroundColor: '#0B66FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 }}>
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>Contact</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Rental Options */}
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: 'bold', color: '#111827', fontSize: 16, marginBottom: 8 }}>Rental Options</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  { 
                    borderColor: selectedOption === 'withoutDriver' ? '#0B66FF' : '#e5e7eb',
                    backgroundColor: selectedOption === 'withoutDriver' ? '#dbeafe' : '#fff'
                  }
                ]}
                onPress={() => setSelectedOption('withoutDriver')}
              >
                <Text style={{ fontWeight: '600', color: '#111827', fontSize: 14 }}>Without Driver</Text>
                <Text style={styles.priceText}>{car.price}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  { 
                    borderColor: selectedOption === 'withDriver' ? '#0B66FF' : '#e5e7eb',
                    backgroundColor: selectedOption === 'withDriver' ? '#dbeafe' : '#fff'
                  }
                ]}
                onPress={() => setSelectedOption('withDriver')}
              >
                <Text style={{ fontWeight: '600', color: '#111827', fontSize: 14 }}>With Driver</Text>
                <Text style={styles.priceText}>
                  LKR {parseInt(car.price.split(' ')[1].replace(',', '')) + 2000} / DAY
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Features */}
          <View style={{ backgroundColor: '#f9fafb', borderRadius: 12, padding: 12, marginBottom: 12 }}>
            <Text style={{ fontWeight: 'bold', color: '#111827', fontSize: 16, marginBottom: 8 }}>Features</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {car.features.map((feature, index) => (
                <View key={index} style={{ width: '50%', flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <View style={{ width: 6, height: 6, backgroundColor: '#0B66FF', borderRadius: 3 }} />
                  <Text style={{ color: '#374151', fontSize: 14 }}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Specifications */}
          <View style={{ backgroundColor: '#f9fafb', borderRadius: 12, padding: 12, marginBottom: 16 }}>
            <Text style={{ fontWeight: 'bold', color: '#111827', fontSize: 16, marginBottom: 8 }}>Specifications</Text>
            <View style={{ gap: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#6b7280', fontSize: 14 }}>Category</Text>
                <Text style={{ fontWeight: '600', fontSize: 14 }}>{car.category}</Text>
              </View>
              {(car.category.includes('Car') || car.category === 'Suv' || car.category === 'Van') && (
                <>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#6b7280', fontSize: 14 }}>Seats</Text>
                    <Text style={{ fontWeight: '600', fontSize: 14 }}>5</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#6b7280', fontSize: 14 }}>Fuel</Text>
                    <Text style={{ fontWeight: '600', fontSize: 14 }}>Petrol</Text>
                  </View>
                </>
              )}
              {car.category === 'Moto' && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#6b7280', fontSize: 14 }}>Engine</Text>
                  <Text style={{ fontWeight: '600', fontSize: 14 }}>150 cc</Text>
                </View>
              )}
              {car.category === 'Bicycle' && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#6b7280', fontSize: 14 }}>Type</Text>
                  <Text style={{ fontWeight: '600', fontSize: 14 }}>Mountain/City</Text>
                </View>
              )}
              {car.category === 'TukTuk' && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#6b7280', fontSize: 14 }}>Seats</Text>
                  <Text style={{ fontWeight: '600', fontSize: 14 }}>3</Text>
                </View>
              )}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#6b7280', fontSize: 14 }}>Availability</Text>
                <Text style={{ color: '#22c55e', fontWeight: '600', fontSize: 14 }}>Available</Text>
              </View>
            </View>
          </View>

          {/* Book Now Button */}
          <TouchableOpacity 
            style={{ 
              backgroundColor: '#0B66FF', 
              paddingVertical: 16, 
              borderRadius: 12, 
              alignItems: 'center',
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const ProfileScreen = () => (
  <View style={styles.container}>
    <StatusBar backgroundColor="#0B66FF" barStyle="light-content" />
    
    {/* Header */}
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={{ width: 32, height: 32, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
          <Bell size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>

    <ScrollView 
      showsVerticalScrollIndicator={false} 
      style={{ flex: 1 }} 
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* Profile Header */}
      <View style={[styles.card, { alignItems: 'center' }]}>
        <View style={{ marginBottom: 12 }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#EAF2FF', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }}>
            <User size={32} color="#0B66FF" />
          </View>
        </View>
        
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 4 }}>A. Ashra Ashraff</Text>
        <Text style={{ color: '#6b7280', fontSize: 12, marginBottom: 12 }}>Premium Member</Text>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#111827', fontWeight: 'bold', fontSize: 16 }}>12</Text>
            <Text style={{ color: '#6b7280', fontSize: 12 }}>Bookings</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#111827', fontWeight: 'bold', fontSize: 16 }}>4.8</Text>
            <Text style={{ color: '#6b7280', fontSize: 12 }}>Rating</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#111827', fontWeight: 'bold', fontSize: 16 }}>2</Text>
            <Text style={{ color: '#6b7280', fontSize: 12 }}>Years</Text>
          </View>
        </View>
      </View>

      {/* Contact Info */}
      <View style={styles.card}>
        <Text style={{ fontWeight: 'bold', color: '#111827', fontSize: 16, marginBottom: 12 }}>Contact Information</Text>
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4 }}>
            <View style={[styles.locationIcon, { width: 32, height: 32 }]}>
              <Phone size={14} color="#fff" />
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text style={{ color: '#6b7280', fontSize: 12 }}>Phone</Text>
              <Text style={{ color: '#111827', fontWeight: '600', fontSize: 14 }}>+94 77 123 4567</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4 }}>
            <View style={[styles.locationIcon, { width: 32, height: 32 }]}>
              <Mail size={14} color="#fff" />
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text style={{ color: '#6b7280', fontSize: 12 }}>Email</Text>
              <Text style={{ color: '#111827', fontWeight: '600', fontSize: 14 }}>ashra@example.com</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4 }}>
            <View style={[styles.locationIcon, { width: 32, height: 32 }]}>
              <MapPin size={14} color="#fff" />
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text style={{ color: '#6b7280', fontSize: 12 }}>Address</Text>
              <Text style={{ color: '#111827', fontWeight: '600', fontSize: 14 }}>No. 12, Example Road</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.card}>
        <Text style={{ fontWeight: 'bold', color: '#111827', fontSize: 16, marginBottom: 8 }}>Settings</Text>
        <View style={{ gap: 4 }}>
          <TouchableOpacity style={{ padding: 8, borderRadius: 8 }}>
            <Text style={{ fontSize: 14 }}>Payment Methods</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 8, borderRadius: 8 }}>
            <Text style={{ fontSize: 14 }}>Booking History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 8, borderRadius: 8 }}>
            <Text style={{ fontSize: 14 }}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 8, borderRadius: 8 }}>
            <Text style={{ fontSize: 14 }}>Help & Support</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={{ 
          backgroundColor: '#FF4B4B', 
          marginHorizontal: 16, 
          marginTop: 16,
          paddingVertical: 12, 
          borderRadius: 12, 
          alignItems: 'center' 
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
);

// ----------------- MAIN APP -----------------
export default function App() {
  const [screen, setScreen] = useState<'splash' | 'login' | 'main' | 'carDetail'>('splash');
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'cars' | 'profile'>('home');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => setScreen('login'), 2000);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const handleLogin = () => setScreen('main');
  const handleCarSelect = (car: Car) => { setSelectedCar(car); setScreen('carDetail'); };
  const handleBackToMain = () => { setScreen('main'); setActiveTab('cars'); };
  const handleViewCars = (category?: string) => {
    setSelectedCategory(category || 'All');
    setActiveTab('cars');
  };

  if (screen === 'splash') return <SplashScreen />;
  if (screen === 'login') return <LoginScreen onLogin={handleLogin} />;
  if (screen === 'carDetail' && selectedCar) return <CarDetailScreen car={selectedCar} onBack={handleBackToMain} />;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0B66FF" barStyle="light-content" />
      
      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {activeTab === 'home' && <HomeScreen onViewCars={handleViewCars} />}
        {activeTab === 'search' && <CarListingScreen onCarSelect={handleCarSelect} selectedCategory="All" />}
        {activeTab === 'cars' && <CarListingScreen onCarSelect={handleCarSelect} selectedCategory={selectedCategory} />}
        {activeTab === 'profile' && <ProfileScreen />}
      </View>

      <TabBarMenu activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}