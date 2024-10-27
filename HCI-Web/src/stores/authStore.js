import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    async signUp(userData) {
      try {
        // Here you would typically make an API call to your backend
        // For now, we'll simulate a successful signup
        const newUser = {
          id: Date.now().toString(), // Simulated user ID
          ...userData,
        }
        this.user = newUser
        this.isAuthenticated = true
        // You might want to save the user token in localStorage here
        localStorage.setItem('user', JSON.stringify(newUser))
        return { success: true }
      } catch (error) {
        console.error('Signup failed:', error)
        return { success: false, error: 'Signup failed' }
      }
    },

    async signIn(credentials) {
      try {
        // Here you would typically make an API call to your backend
        // For now, we'll simulate a successful signin
        const user = {
          id: Date.now().toString(), // Simulated user ID
          email: `${credentials.username}@example.com`, // Simulated email
        }
        this.user = user
        this.isAuthenticated = true
        // You might want to save the user token in localStorage here
        localStorage.setItem('user', JSON.stringify(user))
        return { success: true }
      } catch (error) {
        console.error('Signin failed:', error)
        return { success: false, error: 'Invalid credentials' }
      }
    },

    signOut() {
      this.user = null
      this.isAuthenticated = false
      // Remove user data from localStorage
      localStorage.removeItem('user')
    },

    checkAuth() {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
      }
    },
  },
})