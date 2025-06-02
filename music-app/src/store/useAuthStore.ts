// stores/authStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type User = {
  id: string
  username: string
}

type AuthState = {
  token: string | null
  user: User | null
  rememberMe: boolean
  login: (token: string, user: User, rememberMe: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      rememberMe: false,

      login: (token, user, rememberMe) => {
        set({ token, user, rememberMe })

        // Simpan flag ke localStorage agar bisa dipakai saat rehydrate
        localStorage.setItem('remember-me', JSON.stringify(rememberMe))
      },

      logout: () => {
        set({ token: null, user: null, rememberMe: false })
        localStorage.removeItem('remember-me')
      },
    }),
    {
      name: 'auth-storage',

      // Gunakan localStorage atau sessionStorage secara dinamis
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' && JSON.parse(localStorage.getItem('remember-me') || 'false')
          ? localStorage
          : sessionStorage
      ),

      // Simpan hanya field yang diperlukan
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        rememberMe: state.rememberMe,
      }),
    }
  )
)
