// Supabase Configuration and Helper Functions
// Replace these with your actual Supabase credentials

const SUPABASE_URL = 'https://ccqyrxlsgskbhunmhzdk.supabase.co'; // e.g., https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjcXlyeGxzZ3NrYmh1bm1oemRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MDc4MzYsImV4cCI6MjA3Nzk4MzgzNn0.soGwccL9-bqm0eLN9KyvxvQ2Faj5Mi-6W5UtGGuGd-s';

// Hardcoded Seller Credentials
const SELLER_EMAIL = 'tumblera.seller@gmail.com';
const SELLER_PASSWORD = 'tumblera';

// Import Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

// Sign up new user
export async function signUp(email, password, metadata = {}) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata // firstName, lastName, phone, etc.
            }
        });
        
        if (error) throw error;
        return { success: true, user: data.user };
    } catch (error) {
        console.error('Sign up error:', error);
        return { success: false, error: error.message };
    }
}

// Sign in user
export async function signIn(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        return { success: true, user: data.user, session: data.session };
    } catch (error) {
        console.error('Sign in error:', error);
        return { success: false, error: error.message };
    }
}

// Sign out
export async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Sign out error:', error);
        return { success: false, error: error.message };
    }
}

// Get current user
export async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
}

// Check if user is authenticated
export async function isAuthenticated() {
    const user = await getCurrentUser();
    return user !== null;
}

// Check if current user is the seller (hardcoded check)
export async function isSeller(userId = null) {
    try {
        const user = userId ? { id: userId } : await getCurrentUser();
        if (!user) return false;
        
        // Get user's email from Supabase auth
        const { data: { user: authUser }, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error getting user:', error);
            return false;
        }
        
        // Check if email matches seller email
        const isSellerAccount = authUser?.email === SELLER_EMAIL;
        console.log('Checking seller access for:', authUser?.email, '→', isSellerAccount);
        
        return isSellerAccount;
    } catch (error) {
        console.error('Check seller error:', error);
        return false;
    }
}

// ============================================
// ORDER FUNCTIONS
// ============================================

// Save order to database
export async function saveOrder(orderData) {
    try {
        // Allow guest checkout - user_id can be null
        const user = await getCurrentUser();
        
        console.log('Saving order to Supabase...', orderData);
        
        const { data, error } = await supabase
            .from('orders')
            .insert([{
                user_id: user?.id || null,  // Allow null for guest checkout
                customer_name: orderData.name,
                customer_email: orderData.email,
                customer_phone: orderData.phone,
                customer_address: orderData.address,
                items: orderData.items,  // This should be a JSON string
                total_amount: orderData.total,
                status: 'pending',
                created_at: new Date().toISOString()
            }])
            .select();
        
        if (error) {
            console.error('Supabase insert error:', error);
            throw error;
        }
        
        console.log('Order saved successfully:', data);
        return { success: true, order: data[0] };
    } catch (error) {
        console.error('Save order error:', error);
        return { success: false, error: error.message };
    }
}

// Get orders for current user
export async function getUserOrders() {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error('Not authenticated');
        
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return { success: true, orders: data };
    } catch (error) {
        console.error('Get user orders error:', error);
        return { success: false, error: error.message };
    }
}

// Get all orders (seller only - simplified for hardcoded seller)
export async function getAllOrders() {
    try {
        // Check if seller is logged in via localStorage (our hardcoded seller)
        const isSellerLoggedIn = localStorage.getItem('isSellerLoggedIn') === 'true';
        
        if (!isSellerLoggedIn) {
            console.log('❌ Not logged in as seller');
            throw new Error('Seller login required');
        }
        
        console.log('✅ Seller authenticated, fetching all orders...');
        
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('❌ Supabase query error:', error);
            throw error;
        }
        
        console.log(`✅ Found ${data.length} order(s):`, data);
        return { success: true, orders: data };
    } catch (error) {
        console.error('❌ Get all orders error:', error);
        return { success: false, error: error.message, orders: [] };
    }
}

// Update order status (seller only - simplified for hardcoded seller)
export async function updateOrderStatus(orderId, status) {
    try {
        // Check if seller is logged in via localStorage
        const isSellerLoggedIn = localStorage.getItem('isSellerLoggedIn') === 'true';
        
        if (!isSellerLoggedIn) {
            throw new Error('Seller login required');
        }
        
        console.log(`Updating order ${orderId} to status: ${status}`);
        
        const { data, error } = await supabase
            .from('orders')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', orderId)
            .select();
        
        if (error) {
            console.error('Update error:', error);
            throw error;
        }
        
        console.log('✅ Order updated successfully:', data[0]);
        return { success: true, order: data[0] };
    } catch (error) {
        console.error('❌ Update order status error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// USER PROFILE FUNCTIONS
// ============================================

// Get user profile
export async function getUserProfile(userId) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        
        if (error) throw error;
        return { success: true, profile: data };
    } catch (error) {
        console.error('Get profile error:', error);
        return { success: false, error: error.message };
    }
}

// Update user profile
export async function updateUserProfile(userId, profileData) {
    try {
        const { data, error } = await supabase
            .from('users')
            .update(profileData)
            .eq('id', userId)
            .select();
        
        if (error) throw error;
        return { success: true, profile: data[0] };
    } catch (error) {
        console.error('Update profile error:', error);
        return { success: false, error: error.message };
    }
}

// Create user profile (called after signup)
export async function createUserProfile(userId, profileData) {
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([{
                id: userId,
                email: profileData.email,
                first_name: profileData.firstName,
                last_name: profileData.lastName,
                phone: profileData.phone,
                role: profileData.role || 'customer',
                created_at: new Date().toISOString()
            }])
            .select();
        
        if (error) throw error;
        return { success: true, profile: data[0] };
    } catch (error) {
        console.error('Create profile error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// STORAGE FUNCTIONS
// ============================================

// Upload design image
export async function uploadDesignImage(file) {
    try {
        const user = await getCurrentUser();
        const fileName = `${user?.id || 'guest'}_${Date.now()}_${file.name}`;
        
        const { data, error } = await supabase.storage
            .from('designs')
            .upload(fileName, file);
        
        if (error) throw error;
        
        // Get public URL
        const { data: urlData } = supabase.storage
            .from('designs')
            .getPublicUrl(fileName);
        
        return { success: true, url: urlData.publicUrl };
    } catch (error) {
        console.error('Upload image error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// AUTH STATE LISTENER
// ============================================

// Listen for auth state changes
export function onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Protect page (redirect if not authenticated)
export async function protectPage(redirectTo = '/login.html') {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = redirectTo;
        return false;
    }
    return true;
}

// Protect seller page
export async function protectSellerPage(redirectTo = 'login.html') {
    console.log('🔒 Protecting seller page...');
    
    const user = await getCurrentUser();
    console.log('Current user:', user);
    
    if (!user) {
        console.log('❌ No user found, redirecting to login');
        window.location.href = redirectTo + '?redirect=seller.html';
        return false;
    }
    
    console.log('✅ User authenticated, checking if seller account...');
    const isSellerUser = await isSeller(user.id);
    
    if (!isSellerUser) {
        console.log('❌ Not the seller account, access denied');
        alert('Access denied. This page is only accessible by the seller account.');
        window.location.href = 'index.html';
        return false;
    }
    
    console.log('✅ Seller account verified, access granted!');
    return true;
}

// Update cart count in navbar
export function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('tumblerCart') || '[]');
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Update navbar for authenticated user
export async function updateNavbar() {
    const user = await getCurrentUser();
    const authLinks = document.getElementById('auth-links');
    
    if (authLinks) {
        if (user) {
            authLinks.innerHTML = `
                <a href="profile.html" class="text-gray-700 hover:text-blue-600 px-2 sm:px-3 py-2 font-medium text-sm sm:text-base">
                    <i class="fas fa-user"></i><span class="hidden sm:inline ml-1"> Profile</span>
                </a>
                <button id="logout-btn" class="text-gray-700 hover:text-blue-600 px-2 sm:px-3 py-2 font-medium text-sm sm:text-base">
                    <i class="fas fa-sign-out-alt"></i><span class="hidden sm:inline ml-1"> Logout</span>
                </button>
            `;
            
            // Add logout functionality
            document.getElementById('logout-btn').addEventListener('click', async () => {
                const result = await signOut();
                if (result.success) {
                    window.location.href = '/index.html';
                }
            });
        } else {
            authLinks.innerHTML = `
                <a href="login.html" class="text-gray-700 hover:text-blue-600 px-2 sm:px-3 py-2 font-medium text-sm sm:text-base">
                    <i class="fas fa-sign-in-alt"></i><span class="hidden sm:inline ml-1"> Login</span>
                </a>
                <a href="signup.html" class="text-gray-700 hover:text-blue-600 px-2 sm:px-3 py-2 font-medium text-sm sm:text-base">
                    <i class="fas fa-user-plus"></i><span class="hidden sm:inline ml-1"> Sign Up</span>
                </a>
            `;
        }
    }
}
