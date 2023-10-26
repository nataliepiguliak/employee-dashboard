import http from '@/http-common'

class DashboardService {
  get() {
    return http.get('/dashboard')
  }

  post(formData) {
    return http.post('/upload', formData)
  }
}

export default new DashboardService()
