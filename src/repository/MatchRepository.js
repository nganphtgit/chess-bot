import Repository from '@/repository/Repository'

const resource = '/match-history'

export default {
  createMatch(data) {
    return Repository.post(`${resource}/create`, data)
  }
}
